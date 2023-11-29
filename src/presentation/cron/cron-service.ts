import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    //* Crea el Cron Job pasando como 1er argumento cada cuanto tiempo y cuando se ejecutará el cron
    //* Y como 2do argumento recibe la funcion que se ejecutará cada cierto tiempo especificado
    const job = new CronJob(cronTime, onTick);

    //* Ejecuta el Cron Job
    job.start();

    return job;
  }
}