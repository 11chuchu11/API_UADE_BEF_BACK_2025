import { Transporter } from 'nodemailer';

export interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IEmailStrategy {
  transporter: Transporter;
  init(): Promise<void>;
  sendEmail(data: EmailData): Promise<number>;
}
