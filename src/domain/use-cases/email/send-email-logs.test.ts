import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("SendEmailLogs UseCase", () => {
  //* Mock que simula la dependencia de EmailService 
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  }
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );
  
  beforeEach(() => {
    //* Limpiando mocks
    jest.clearAllMocks();
  });
  
  test("should call sendEmail and saveLog", async () => {
    const result = await sendEmailLogs.execute("moisesprado@gmail.com");

    //* Probando que se envie el email y se guarde el log correctamente 
    expect(result).toBe(true);
    //* Probando se ejecute la funcion de sendEmailWithFileSystemLogs al menos una vez 
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    //* Probando que saveLog se ejecute al menos una vez con un argumento de tipo LogEntity 
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      message: "Log email sent",
      level: "low",
      origin: "send-email-logs.ts",
    });
  });

  test("should log in case of error", async () => {
    //* Sobreescribiendo mock de sendEmailWithFileSystemLogs para que retorne false 
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await sendEmailLogs.execute("moisesprado@gmail.com");

    //* Probando que se envie el email y se guarde el log correctamente
    expect(result).toBe(false);
    //* Probando se ejecute la funcion de sendEmailWithFileSystemLogs al menos una vez
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    //* Probando que saveLog se ejecute al menos una vez con un argumento de tipo LogEntity
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      message: "Error: Email log not sent",
      level: "high",
      origin: "send-email-logs.ts",
    });
  });
});