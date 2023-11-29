export enum LogSeverityLevel{
  low = 'low',
  medium = 'medium',
  high = 'high',
} 


export class LogEntity {
  //* Nivel de severidad del log  
  public level: LogSeverityLevel;
  //* Mensaje de log 
  public message: string;
  //* Fecha de creacion del log 
  public createdAt: Date;

  constructor(message: string,level: LogSeverityLevel) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  //? Devuelve el log leido de su archivo como una entidad Log 
  static fromJson = (json: string): LogEntity => { 
    //* Convirtiendo JSON de log de archivo a objeto  
    const { level, message, createdAt } = JSON.parse(json);
    //* Entidad log con sus atributos
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);


    return log;
  }
}
