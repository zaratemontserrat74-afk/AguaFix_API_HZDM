import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.mailHost,
      port: envs.mailPort,

      secure: false,

      auth: {
        user: envs.mailUser,
        pass: envs.mailPassword,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    template: string,
  ) {
    return this.transporter.sendMail({
      from: envs.mailUser,
      to,
      subject,
      html: template,
    });
  }
}