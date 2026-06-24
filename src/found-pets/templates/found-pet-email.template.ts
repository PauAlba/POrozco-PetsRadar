import { FoundPetDto } from 'src/core/interfaces/FoundPet.interface';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { generateMapboxImage } from 'src/core/utils/utils';

export const generateFoundPetEmailTemplate = (
  pet: FoundPetDto,
  nearbyLostPets: LostPet[],
): string => {
  const nearbyPoints = nearbyLostPets.map((p) => ({
    lat: (p.location as any).coordinates[1] as number,
    lon: (p.location as any).coordinates[0] as number,
  }));

  const mapImageUrl = generateMapboxImage(pet.lat, pet.lon, nearbyPoints);

  const mapLegend =
    nearbyLostPets.length > 0
      ? `<p style="font-size: 12px; color: #7A7A7A; margin-top: 8px; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
               <span style="color: #88C3A4; font-weight: bold;">&#9679;</span> Mascota encontrada &nbsp;&nbsp;
               <span style="color: #F8AD9D; font-weight: bold;">&#9679;</span> ${nearbyLostPets.length} mascota(s) perdida(s) en un radio de 500m
           </p>`
      : '';

  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F4F8F6; padding: 30px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.04); border: 1px solid #DBECE1;">
                    
                    <!-- Header Banner -->
                    <tr>
                        <td align="center" style="background-color: #88C3A4; padding: 30px 20px;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold; letter-spacing: 1px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">¡MASCOTA RESCATADA!</h1>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 35px 30px;">
                            <h2 style="color: #4A4A4A; margin-top: 0; font-size: 22px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Se encontró un: <span style="color: #68B0AB;">${pet.species}</span></h2>
                            
                            <!-- Mascot Details Box -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F2F9F5; border-radius: 12px; border-left: 5px solid #88C3A4; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 4px 0; font-size: 15px; color: #4A4A4A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><strong>Raza:</strong> ${pet.breed || 'Desconocida'}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 4px 0; font-size: 15px; color: #4A4A4A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><strong>Color:</strong> ${pet.color}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 4px 0; font-size: 15px; color: #4A4A4A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><strong>Tamaño:</strong> ${pet.size}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #5C5C5C; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                <strong>Descripción del hallazgo:</strong> ${pet.description}
                            </p>

                            <hr style="border: 0; border-top: 1px solid #DBECE1; margin: 25px 0;">

                            <p style="color: #4A4A4A; font-size: 15px; font-weight: bold; margin: 0 0 15px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                Ubicación del rescate: <span style="font-weight: normal; color: #5C5C5C;">${pet.address}</span>
                            </p>

                            <!-- Map Image & Legend -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                                <tr>
                                    <td>
                                        <img src="${mapImageUrl}" alt="Mapa de ubicación" style="width: 100%; border-radius: 12px; border: 1px solid #DBECE1; display: block; height: auto;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ${mapLegend}
                                    </td>
                                </tr>
                            </table>

                            <!-- Finder Contact Call-To-Action -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="text-align: center;">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #7A7A7A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Datos de quien lo resguardó:</p>
                                        <a href="mailto:${pet.finderEmail}" style="background-color: #88C3A4; color: #ffffff; padding: 16px 36px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                            Contactar a ${pet.finderName}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #F2F9F5; color: #7A7A7A; padding: 25px 20px; font-size: 12px; line-height: 1.5; border-top: 1px solid #DBECE1;">
                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><strong>Pet Radar</strong> - Universidad La Salle Bajío</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    `;
};
