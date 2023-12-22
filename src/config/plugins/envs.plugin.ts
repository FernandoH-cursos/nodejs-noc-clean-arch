import "dotenv/config";
import * as env from "env-var";

//* Validando variables de entorno 
export const envs = {
  //* Validando PORT para que sea requerido y se devuelva como un number
  PORT: env.get("PORT").required().asPortNumber(),
  //* Validando MAILER_SERVICE para que sea requerido y se devuelva como un string
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  //* Validando MAILER_EMAIL para que sea requerido y se devuelva como un string formato email
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  //* Validando MAILER_SECRET_KEY para que sea requerido y se devuelva como un string
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  //* Validando PROD para que sea requerido y se devuelva como un booleano
  PROD: env.get("PROD").required().asBool(),

  //? MongoDB 
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),
};