import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendMailOptions{
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment{
  filename: string;
  path: string;
}

export class EmailService {
  //? Configuracion para enviar correo 
  private transporter = nodemailer.createTransport({
    //* Servicio a usar para mails 
    service: envs.MAILER_SERVICE,
    //* Autorizacion usando correo donde se envia el mail y su secret key
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });


  //? Envia el correo 
  async sendEmail({ to, subject, htmlBody,attachments=[] }: SendMailOptions) {
    //* Al enviar el email se pasa el correo(o varios correos) a quien va, el sujeto,
    //* el html del body y opcionalmente un archivo adjunto.
    const mailOptions = {
      to,
      subject,
      html: htmlBody,
      attachments,
    };

    try {
      //* Envia el mail
      const sentInformation = await this.transporter.sendMail(mailOptions);
      // console.log(sentInformation);


      return true;
    } catch (error) {
      
      return false;
    }
  }

  //? Envia el email con archivos adjuntados 
  async sendEmailWithFileSystemLogs(to: string | string[]) { 
    const subject = 'Logs del servidor';
    const htmlBody = /*html*/`
      <h1>Logs de sistema - NOC</h1>
      <p>Lorem ipsum velit not veniam ullamco ex eu laborum</p>
      <p>Ver log adjuntos</p>
    `;

    //* Archivos a adjuntar en el mail a enviar 
    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
    ];

    //* Enviando mail con attachments(archivos adjuntos) 
    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
