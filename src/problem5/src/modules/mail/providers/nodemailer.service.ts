import { createTransport, Transporter } from 'nodemailer';

import { env } from '../../../commons';

class NodeMailerService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: env.mailerEmail,
        pass: env.mailerPassword,
      },
    });
  }

  async sendMailTemplate(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.transporter.sendMail(
        {
          from: `No-reply <${env.appName}>`,
          to: email,
          subject: 'Send Mail Template Test',
          text: 'Demo send text',
          html: '<h1>Test</h1>',
        },
        (error) => {
          if (error) return reject(error);
          return resolve(true);
        },
      );
    });
  }
}

export default new NodeMailerService();
