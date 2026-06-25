import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';
import { EmailOptions } from './mail-options.interface';
@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true,
    auth: {
      user: 'resend',
      pass: envs.RESEND_API_KEY,
    },
  });

  async sendEmail(options: EmailOptions): Promise<Boolean> {
    try {
      await this.transporter.sendMail({
        from: 'PetRadar <onboarding@resend.dev>',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
