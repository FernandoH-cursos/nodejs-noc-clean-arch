import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

//* Las clases abstractas no se puede instanciar, son como un contrato para
//* que se usen en otras clases y establezcan sus metodo y propiedades que
//* se definen abstractos al igual que su clase. 
export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}