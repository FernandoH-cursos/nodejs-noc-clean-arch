import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('LogRepositoryImpl', () => {
  //* Mock para probar la implementacion de LogRepository
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    //* Limpiar los mocks para que no afecten otras pruebas 
    jest.clearAllMocks();
  });

  test('saveLog should call the datasource with arguments', async() => {
    const log = {
      level: LogSeverityLevel.high,
      message: 'hola',
      origin: 'hola'
    } as LogEntity;

    await logRepository.saveLog(log);
    //* Probando que el metodo saveLog del mock haya sido llamado con el argumento log 
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource with arguments", async () => {
    const lowSeverity = LogSeverityLevel.low;

    await logRepository.getLogs(lowSeverity);
    //* Probando que el metodo getLogs del mock haya sido llamado con el argumento lowSeverity 
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);
  });
});