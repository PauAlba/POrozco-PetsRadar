import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { envs } from 'src/config/envs';
import { EmailOptions } from './mail-options.interface';

@Injectable()
export class EmailService {
  private resend = new Resend(envs.RESEND_API_KEY);

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'PetRadar <onboarding@resend.dev>',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      if (error) {
        console.error('Error de Resend API:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Excepción al enviar correo:', error);
      return false;
    }
  }
}
