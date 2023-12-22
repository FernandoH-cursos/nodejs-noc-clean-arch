import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

//? Implementación de Datasource de Logs usando FileSystem 
export class FileSystemDatasource implements LogDatasource {
  //* Rutas en donde se guardaran los logs
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  //? Crea los archivos de logs segun su nivel de severidad
  private createLogsFiles = () => {
    const logPaths = [this.allLogsPath, this.mediumLogsPath, this.highLogsPath];

    //* Crear carpeta de /logs  si no existe
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    //* Creando archivos de logs segun su nivel de severidad si no existen
    logPaths.forEach((path) => {
      if (fs.existsSync(path)) return;

      fs.writeFileSync(path, "");
    });
  };

  //? Guarda en FileSystem la entidad Log pasada como argumento segun su nivel de severidad
  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    //* Guarda la entidad Log pasada como argumento en la ruta de todos los logs
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      //* Guarda la entidad Log pasada como argumento en la ruta de los logs 'medium'
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
      return;
    } else {
      //* Guarda la entidad Log pasada como argumento en la ruta de los logs 'high'
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  //? Devuelve un arreglo de entidades Log leidos de un archivo de log segun su path
  private getLogFromFile = (path: string): LogEntity[] => {
    //* Leyendo a archivo de log segun su path de nivel de severidad
    const content = fs.readFileSync(path, "utf-8");
    //* Si no hay contenido de logs se devuelve un [] 
    if(content === '') return [];
    //* Convirtiendo contenido de logs en un arreglo de Entidades Log
    const logs = content.split("\n").map(LogEntity.fromJson);

    return logs;
  };

  //? Devuelve un arreglo de entidades Log leidos de
  //? un archivo de logs segun su nivel de severidad
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}