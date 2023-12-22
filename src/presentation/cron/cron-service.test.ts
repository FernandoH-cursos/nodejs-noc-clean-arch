import { CronService } from "./cron-service";

describe('CronService', () => {
  const mockTick = jest.fn();

  //* 'done' permite que el test espere a que se ejecute el callback
  test('should create a job', (done) => {
    //* Ejecutando cron job cada segundo 
    const job = CronService.createJob("* * * * * *", mockTick);

    setTimeout(() => {
      //* Probando que el metodo mockTick haya sido llamado 2 veces 
      expect(mockTick).toHaveBeenCalledTimes(2);

      //* Deteniendo el cron job 
      job.stop()
      done();
    },2000);
  });
});