export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  //* Nivel de severidad del log
  public level: LogSeverityLevel;
  //* Mensaje de log
  public message: string;
  //* Fecha de creacion del log
  public createdAt: Date;
  //* Es el nombre del archivo del log
  public origin: string;

  constructor({
    level,
    message,
    origin,
    createdAt = new Date(),
  }: LogEntityOptions) {
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  //? Devuelve el log leido en formato JSON como una entidad Log
  static fromJson = (json: string): LogEntity => {
    //* Validando si el json viene vacio
    json = json === "" ? "{}" : json;

    //* Convirtiendo JSON de log de archivo a objeto
    const { level, message, createdAt, origin } = JSON.parse(json);
    //* Entidad log con sus atributos
    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    });

    return log;
  };

  //? Devuelve el log  leido en formato objeto como una entidad Log
  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({ message, level, createdAt, origin });

    return log;
  };
}
