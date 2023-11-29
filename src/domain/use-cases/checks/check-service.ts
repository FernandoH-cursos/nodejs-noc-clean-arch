import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

//? Este caso de uso revisa si un endpoint de API o servicio es correcto
export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error(`Error on check service ${url}`);

      const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
      
      //* Gurdando entidad de log anterior en su respectivo archivo
      this.logRepository.saveLog(log);
      //* Mostrando mensaje de que el servicio es correcto 
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity(errorMessage, LogSeverityLevel.high);
      //* Gurdando entidad de log anterior en su respectivo archivo
      this.logRepository.saveLog(log);

      //* Mostrando mensaje de que el servicio es erroneo 
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}