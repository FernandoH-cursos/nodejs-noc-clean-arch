import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts LogDatasource', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource,test.ts',
    message: 'test-message',
    level: LogSeverityLevel.low,
  });
  
  //* Mock para probar la clase abstracta en una clase
  class MockLogDatasource implements LogDatasource { 
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('should test the abstract class', async() => {
    const mockLogDatasource = new MockLogDatasource();

    //* Probamos que el objeto sea una instancia de la clase MockLogDatasource
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    //* Probamos que los metodos saveLog() y getLogs() existan en el objeto. 
    expect(typeof mockLogDatasource.saveLog).toBe('function');
    expect(typeof mockLogDatasource.getLogs).toBe('function');

    //* Probando que saveLog() y getLogs() hagan lo que esperamos 
    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});