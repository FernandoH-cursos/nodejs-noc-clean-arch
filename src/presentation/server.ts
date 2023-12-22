import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file.system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PosgreLogDatasource } from "../infrastructure/datasources/posgre-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

//* Repositorios con su respectivo datasource(FileSystem, Mongo y PosgreSQL))
const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgreLogRepository = new LogRepositoryImpl(new PosgreLogDatasource());

const emailService = new EmailService();
 
const cronTime = "*/5 * * * * *";

export class Server {
  public static async start() {
    console.log("Server started...");

    //* Enviar email con archivos de logs adjuntos usando un caso de uso
    //* con inyeccion de dependencias
    /* new SendEmailLogs(
      emailService,
      logRepository
    ).execute(["moi.prado20@gmail.com","mprado@beemining.cl"]); */


    //* Cron que se ejecuta cada 5 segundos
    CronService.createJob(cronTime, () => {
      const url = "http://google.com";

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgreLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);


      /* new CheckService(
        logRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url); */
    });
  }
}
