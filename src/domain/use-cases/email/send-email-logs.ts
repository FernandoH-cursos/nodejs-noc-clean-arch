import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase{
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase{
  //* Inyectando funciones de email y dependencia de repositorio Log 
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) { }

  async execute(to: string | string[]) {
    try {
      //* Envia email con archivos adjuntos
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) throw new Error("Email log not sent");


      //* Guardando log de email enviado
      const log = new LogEntity({
        message: "Log email sent",
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      //* Guardando log de error 
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }
}