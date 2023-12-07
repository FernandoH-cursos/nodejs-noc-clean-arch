import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file.system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
 const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    //* Enviar email con archivos de logs adjuntos usando un caso de uso
    //* con inyeccion de dependencias 
    /* new SendEmailLogs(
      emailService,
      fileSystemLogRepository
    ).execute(["moi.prado20@gmail.com","mprado@beemining.cl"]); */
   


    //* Cron que se ejecuta cada 5 segundos 
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://google.com";
    //   // const url = "http://localhost:3000";

    //   //* Revisando que exita un servicio o API usando Inyeccion de dependencias 
    //   //* para manejar el exito o el error de la revision. Ademas de llamar repositorios
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
