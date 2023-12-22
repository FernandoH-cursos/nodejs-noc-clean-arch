import path from "path";
import fs from 'fs';
import { FileSystemDatasource } from "./file.system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("FileSystemDatasource", () => {
  //* Path de la carpeta de /logs 
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => { 
    //* Borrando carpeta de /logs si existe 
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exists", () => {
    //* Creando carpeta de /logs si no existe y archivos de logs segun su nivel de severidad 
    new FileSystemDatasource();
    //* Listando archivos de /logs en un arreglo 
    const files = fs.readdirSync(logPath);
    
    //* Probando que se hayan creado los archivos de logs segun su nivel de severidad 
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test('should save a log in logs-all.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'file.system.datasource.test.ts'
    })
    //* Guardando LogEntity 'low' en FileSystem 
    logDatasource.saveLog(log);
    //* Leyendo archivo de logs-all.log 
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    //* Probando que el archivo de logs-all.log contenga el LogEntity guardado 
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-medium", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.medium,
      origin: "file.system.datasource.test.ts",
    });
    //* Guardando LogEntity 'medium' en FileSystem
    logDatasource.saveLog(log);
    //* Leyendo archivo de logs-all.log
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    //* Probando que el archivo de logs-all.log contenga el LogEntity guardado
    expect(allLogs).toContain(JSON.stringify(log));
    //* Probando que el archivo de logs-medium.log contenga el LogEntity guardado
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-high", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.high,
      origin: "file.system.datasource.test.ts",
    });
    //* Guardando LogEntity 'high' en FileSystem
    logDatasource.saveLog(log);
    //* Leyendo archivo de logs-all.log
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    //* Probando que el archivo de logs-all.log contenga el LogEntity guardado
    expect(allLogs).toContain(JSON.stringify(log));
    //* Probando que el archivo de logs-high.log contenga el LogEntity guardado
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test('should return all logs', async() => {
    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      message: "log-low",
      level: LogSeverityLevel.low,
      origin: "low",
    });
    const logMedium = new LogEntity({
      message: "log-medium",
      level: LogSeverityLevel.medium,
      origin: "medium",
    });

    const logHigh = new LogEntity({
      message: "log-high",
      level: LogSeverityLevel.high,
      origin: "high",
    });

    //* Guardando LogEntity por cada nivel de severidad en FileSystem 
    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    //* Leyendo todos los logs de FileSystem segun su nivel de severidad 
    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

    //* Probandos que los logs leidos sean los mismos que los guardados 
    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });

  test('should not throw an error if path exists', () => {
    new FileSystemDatasource();
    new FileSystemDatasource();

    //* Pronando que no se haya lanzado un error al crear FileSystemDatasource dos veces 
    expect(true).toBeTruthy();
  });

  test('should throw an error if severity level is not defined', async() => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

    try {
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${error}`;
      //* Probandos que el error lanzado sea el esperado 
      expect(errorString).toContain(`${customSeverityLevel} not implemented`);
    }
  });
});