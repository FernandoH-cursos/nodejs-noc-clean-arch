import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//* La diferencia de un DataSource y un Repository es que el Repository es el 
//* que accede a los datos y el DataSource solo es la definicion abstracta 
export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
