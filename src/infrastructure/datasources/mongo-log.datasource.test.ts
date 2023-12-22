import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('Prueba en MongoLogDatasource', () => {
  const logDatasource = new MongoLogDatasource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'Test message',
    origin: 'mongo-log.datasource.test.ts',
  });
  
  beforeAll(async () => {
    //* Conectamos a la base de datos 
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => { 
    //* Eliminar todos los registros de la colección logs 
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    //* Desconectamos de la base de datos
    mongoose.connection.close();
  });

  test('should create a log', async () => {
    
    //* Espiando la función console.log() 
    const logSpy = jest.spyOn(console, 'log');

    await logDatasource.saveLog(log);
    //* Probamos que la función console.log() se haya llamado 
    expect(logSpy).toHaveBeenCalled();
    //* Probamos que la función console.log() se haya llamado con el mensaje esperado 
    expect(logSpy).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String));
  });

  test('should get logs', async () => {
    //* Creamos un registro de log 
    await logDatasource.saveLog(log);

    const logs = await logDatasource.getLogs(LogSeverityLevel.medium);
    //* Probamos que se haya obtenido un registro de log 
    expect(logs.length).toBe(1);
    //* Probamos que el registro de log obtenido tenga el nivel de severidad esperado 
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});