import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

//? Implementación de Datasource de Logs usando MongoDB
export class MongoLogDatasource implements LogDatasource{
  async saveLog(log: LogEntity): Promise<void> {
    //* Creando registro de log 
    const newLog = await LogModel.create(log);
    console.log('Mongo Log created: ', newLog.id);

    //* Guardando registro de log en MongoDB
    await newLog.save();
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    //* Obteniendo logs filtrando por su severidad
    const logs = await LogModel.find({ level: severityLevel });

    //* Convirtiendo cada registro de mongo en una entidad Log 
    return logs.map((log) => LogEntity.fromObject(log));
  }
}