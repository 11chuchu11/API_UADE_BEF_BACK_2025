import { Transporter, createTransport } from 'nodemailer';

import { ACCOUNT_PASSWORD, ACCOUNT_USERNAME } from '../../../config';
import { EmailData, IEmailStrategy } from '../../interfaces/EmailStrategy';

export class GmailStrategy implements IEmailStrategy {
  transporter!: Transporter;

  async init() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: ACCOUNT_USERNAME,
        pass: ACCOUNT_PASSWORD,
      },
    });
  }

  async sendEmail(data: EmailData): Promise<number> {
    const info = await this.transporter.sendMail({
      from: 'API Doctor <no-reply@apidoctor.com>',
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    return info.messageId;
  }
}
