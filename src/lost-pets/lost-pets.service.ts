import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetDto } from 'src/core/interfaces/LostPet.interface';
import { generateMapboxImage } from 'src/core/utils/utils';
import { generateLostPetEmailTemplate } from './templates/lost-pet-email.template';
import { logger } from 'src/config/logger';
import Redis from 'ioredis';
import { envs } from 'src/config/envs';
import { CacheService } from 'src/cache/cache.service';
// Ajusta la ruta

const CACHE_KEY_ALL_LOST_PETS = 'lostPets:all';
@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,
    private readonly emailService: EmailService,
    private readonly cacheService: CacheService,
  ) {}

  private readonly redis = new Redis({
    host: envs.REDIS_HOST,
    port: envs.REDIS_PORT,
    password: envs.REDIS_PASSWORD || undefined,
    connectTimeout: 5000,
    maxRetriesPerRequest: 3,
  });

  async getLostPets(): Promise<LostPet[]> {
    try {
      logger.info('Consultando incidentes');
      let data: LostPet[] | null = null;
      try {
        data = await this.cacheService.get<LostPet[]>(CACHE_KEY_ALL_LOST_PETS);
      } catch (e) {
        logger.error(`Error al obtener de caché Redis: ${e}`);
      }
      if (data && data.length > 0) {
        logger.info('Incidentes en cache');
        return data;
      }

      const lostPets = await this.lostPetRepository.find();
      logger.info('[IncidentService] Guardando incidentes en cache');
      const lostPetsString = JSON.stringify(lostPets);
      try {
        await this.redis.set(CACHE_KEY_ALL_LOST_PETS, lostPetsString);
      } catch (e) {
        logger.error(`Error al guardar en caché Redis local: ${e}`);
      }
      return lostPets;
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async getPetsByRadius(
    lat: number,
    lon: number,
    radiusInMeters: number,
  ): Promise<LostPet[]> {
    try {
      logger.info(
        `Buscando mascotas perdidas en ${lat}, ${lon}, en un radio de ${radiusInMeters} metros`,
      );
      const lostPets = await this.lostPetRepository
        .createQueryBuilder('lost_pet')
        .where(
          `
                    ST_DWithin(
                        lost_pet.location::geography,
                        ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
                        :radius
                    )`,
          { lon, lat, radius: radiusInMeters },
        )
        .andWhere('lost_pet.is_active = true')
        .getMany();
      logger.info(
        `Se encontraron ${lostPets.length} mascotas perdidas activas en un radio de ${radiusInMeters} metros`,
      );
      return lostPets;
    } catch (error) {
      logger.error(`No se buscaron mascotas perdidas por radio :: ${error}`);
      return [];
    }
  }

  async createLostPet(dto: LostPetDto): Promise<boolean> {
    const newPet = this.lostPetRepository.create({
      ...dto,
      location: {
        type: 'Point',
        coordinates: [dto.lon, dto.lat],
      },
    });
    logger.info('creando registro de mascota perdida');
    await this.lostPetRepository.save(newPet);
    try {
      await this.cacheService.delete(CACHE_KEY_ALL_LOST_PETS);
    } catch (e) {
      logger.error(`Error al borrar caché de Redis (lost pets): ${e}`);
    }
    const mapImageUrl = generateMapboxImage(dto.lat, dto.lon);
    const template = generateLostPetEmailTemplate(dto, mapImageUrl);

    try {
      await this.emailService.sendEmail({
        to: dto.ownerEmail,
        subject: `Reporte de extravío: ${dto.name}`,
        html: template,
      });
      return true;
    } catch (error) {
      console.error('Error enviando el correo:', error);
      return false;
    }
  }
}
