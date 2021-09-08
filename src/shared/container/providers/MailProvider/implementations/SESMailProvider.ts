import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, SendMailData } from '../IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async send({
    to,
    subject,
    templatePath,
    variables,
  }: SendMailData): Promise<void> {
    const templateFile = fs.readFileSync(templatePath).toString('utf-8');
    const templateParse = handlebars.compile(templateFile);
    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      from: 'Rentx <rentx@devn.com.br>',
      to,
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
