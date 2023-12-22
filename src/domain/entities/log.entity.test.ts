import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('LogEntity', () => {
  const dataObj = {
    message: 'Hola Mundo',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts',
  }

  test('should create a LogEntity instance', () => {

    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    //* Probando que la fecha de creacion sea una instancia de Date 
    expect(log.createdAt).toBeInstanceOf(Date);
  });


  test('should create a LogEntity instance from json', () => {
    const json = `{
      "level":"low",
      "message":"Service http://google.com working",
      "createdAt":"2023-12-11T18:13:15.115Z",
      "origin":"check-service.ts"
    }`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service http://google.com working');
    expect(log.level).toBe('low');
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance fron object", () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});