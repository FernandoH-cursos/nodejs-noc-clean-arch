import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

//? Este caso de uso revisa si un endpoint de API o servicio es correcto
export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) { }
  

  private callLogs(log: LogEntity) {
    //* Recorriendo cada repositorio de logs y guardando el log en cada uno(En FileSystem, Mongo y PosgreSQL) 
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error(`Error on check service ${url}`);

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      });

      //* Gurdando entidad de log anterior en su respectiva BD
      this.callLogs(log);

      
      //* Mostrando mensaje de que el servicio es correcto
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: "check-service.ts",
      });
      //* Gurdando entidad de log anterior en su respectivo archivo
      this.callLogs(log);

      //* Mostrando mensaje de que el servicio es erroneo
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
