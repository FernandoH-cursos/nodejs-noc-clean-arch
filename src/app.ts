import 'dotenv/config';
import { MongoDatabase } from './data/mongo';
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';



(async () => {
  main();
})();


async function main() {
  //* Conectando a BD de mongo con instancia de mongoose 
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });




  //* Corriendo servidor 
  Server.start();
}







