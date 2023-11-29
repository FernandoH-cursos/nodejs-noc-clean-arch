import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';


//? Implementación de Repository de Logs usando DataSource del Log
export class LogRepositoryImpl implements LogRepository {

  //* Al realizar esta inyeccion de dependencia, se puede cambiar el DataSource 
  //* de Log sin afectar el Repository, siendo el codigo tolerante al cambio.
  constructor(
    private logDataSource: LogDatasource
  ) { }
  
  
  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    return this.logDataSource.getLogs(severityLevel);
  }
}