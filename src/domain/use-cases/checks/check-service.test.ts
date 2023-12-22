import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';
describe('CheckService UseCase', () => {
  //* Creando mocks de logRepository, successCallback y errorCallback 
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  //* Creando instancia de CheckService con los mocks anteriores 
  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback,
  );

  beforeEach(() => {
    //* Limpiando mocks
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch return true", async () => {

    const wasOk = await checkService.execute("https://google.com");

    expect(wasOk).toBe(true);
    //* Probando que el metodo successCallback haya sido llamado 
    expect(successCallback).toHaveBeenCalled();
    //* Proband que el metodo errorCallback no haya sido llamado 
    expect(errorCallback).not.toHaveBeenCalled();
    //* Probando que el metodo saveLog haya sido llamado con una instancia de LogEntity
    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test("should call errorCallback when fetch return false", async () => {

    const wasOk = await checkService.execute("http://localhost:3000");

    expect(wasOk).toBe(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});