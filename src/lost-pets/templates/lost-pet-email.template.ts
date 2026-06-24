import { LostPetDto } from 'src/core/interfaces/LostPet.interface';

export const generateLostPetEmailTemplate = (
  pet: LostPetDto,
  mapImageUrl: string,
): string => {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FCF6F5; padding: 30px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.04); border: 1px solid #F5E1DD;">
                    
                    <!-- Header Banner -->
                    <tr>
                        <td align="center" style="background-color: #F8AD9D; padding: 30px 20px;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold; letter-spacing: 1px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">¡AYÚDANOS A ENCONTRARLO!</h1>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 35px 30px;">
                            <h2 style="color: #4A4A4A; margin-top: 0; font-size: 22px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Se busca a: <span style="color: #DE7A6F;">${pet.name}</span></h2>
                            
                            <!-- Mascot Details Box -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FFF8F6; border-radius: 12px; border-left: 5px solid #F8AD9D; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 4px 0; font-size: 15px; color: #4A4A4A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><strong>Especie:</strong> ${pet.species}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 4px 0; font-size: 15px; color: #4A4A4A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><strong>Raza:</strong> ${pet.breed}</td>
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
                                <strong>Descripción:</strong> ${pet.description}
                            </p>

                            <hr style="border: 0; border-top: 1px solid #F5E1DD; margin: 25px 0;">

                            <p style="color: #4A4A4A; font-size: 15px; font-weight: bold; margin: 0 0 15px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                Última ubicación conocida: <span style="font-weight: normal; color: #5C5C5C;">${pet.address}</span>
                            </p>

                            <!-- Map Image -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                                <tr>
                                    <td>
                                        <img src="${mapImageUrl}" alt="Mapa de ubicación" style="width: 100%; border-radius: 12px; border: 1px solid #F5E1DD; display: block; height: auto;">
                                    </td>
                                </tr>
                            </table>

                            <!-- Owner Contact Call-To-Action -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="text-align: center;">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #7A7A7A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Si tienes información, contacta al dueño inmediatamente:</p>
                                        <a href="tel:${pet.ownerPhone}" style="background-color: #F8AD9D; color: #ffffff; padding: 16px 36px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                            Llamar a ${pet.ownerName}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #FFF8F6; color: #7A7A7A; padding: 25px 20px; font-size: 12px; line-height: 1.5; border-top: 1px solid #F5E1DD;">
                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Este es un aviso automático generado por <strong>Pet Radar</strong>.</p>
                            <p style="margin: 5px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Universidad La Salle Bajío - Proyecto de Ingeniería</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    `;
};
