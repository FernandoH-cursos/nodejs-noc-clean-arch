import { EmailService, SendMailOptions, Attachment } from './email-service';
import nodemailer from "nodemailer";

describe('EmailService', () => {
  //* Mock para enviar email
  const mockSendMail = jest.fn();
  //* Mock a instancia 'createTransport' que contiene el mock'mockSendMail' que simula a la función `sendMail()` del paquete 'nodemailer'
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: "moi.prado@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    };

    //* Enviando mail 
    await emailService.sendEmail(options);

    //* Probando que se envie el mail con los argumentos correspondientes 
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "moi.prado@gmail.com",
    });
  });

  test("should send email with attachments", async () => {
    const email = "moi.prado@gmail.com";
    
    //* Enviando mail con archivos de logs
    await emailService.sendEmailWithFileSystemLogs(email);

    //* Probando que se envie el mail con los logs del FileSystem y con los argumentos correspondientes
    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        {
          filename: "logs-all.log",
          path: "./logs/logs-all.log",
        },
        {
          filename: "logs-high.log",
          path: "./logs/logs-high.log",
        },
        {
          filename: "logs-medium.log",
          path: "./logs/logs-medium.log",
        },
      ]),
    });
  });
});