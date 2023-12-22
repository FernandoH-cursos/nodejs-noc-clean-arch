import { envs } from "./envs.plugin";

describe('env.plugin.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "moisesfriki15@gmail.com",
      MAILER_SECRET_KEY: "pteddxasyyxntyxs",
      PROD: false,
      MONGO_URL: "mongodb://fernando:123456789@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "fernando",
      MONGO_PASS: "123456789",
    });
  });

  test('should return error if not found env', async() => { 
    //* Reseteando modulos importados en los tests 
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      //* Cargando nuevamente el modulo de envs.plugin.ts 
      await import('./envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      //* Si contiene el error del PORT, es porque el test paso correctamente 
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});