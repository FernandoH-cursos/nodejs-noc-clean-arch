# App NOC

Sistema de notificaciones para monitoria una API, crear nuestros propios 
procesos de monitorio y envia correos.

## Temas a tratar
- #### Introducción a la Arquitectura Limpia + Typescript.
- #### Casos de Uso (Use Cases).
- #### Introducción a la inyección de dependencias (DI - Dependency injection).
- #### Entidades (Entities).
- #### Repositorios (Repositories).
- #### Servicios (Services).
- #### CRON Task - Tareas cronometradas - Módulo [cron](https://www.npmjs.com/package/cron).
- #### Variables de entorno - [dotenv](https://www.npmjs.com/package/dotenv).
- #### Validación de variables de entorno - [env-var](https://www.npmjs.com/package/dotenv).
- #### NodeMailer - [nodemailer](https://www.npmjs.com/package/nodemailer).
- #### Mongoose ORM - [mongoose](https://www.npmjs.com/package/mongoose).
- #### Prisma ORM - [prisma](https://www.npmjs.com/package/prisma).
- #### Crear base de datos de _MongoDB_ y _PosgreSQL_ usando _Docker_ y variables de entorno, usando `.env` y `docker-compose.yml`.
- #### Pruebas unitarias con Jest + Typescript en una arquitectura limpia.
- #### Crear base de datos de _MongoDB_ y _PosgreSQL_ para entorno de testing usando _Docker_ y variables de entorno, usando `.env.test` y `docker-compose.test.yml`.


## Estructura de Arquitectura Limpia

### _app.ts_
- #### Inicio de la aplicación que invoca el `main()`. 

### _/config_
- #### En este directorio van configuraciones o objetos globales. 
- #### Van extensiones, es decir, dentro una carpeta _/plugins_ con configuraciones globales. 

### _/domain_
- #### _/domain_ son las reglas con las cuales van a regir nuestra app a un nivel alto o macro alejándose del Frontend, capas externas,etc.
- #### Van las definiciones de los _/datasouces_.
- #### Van los modelos y entidades en _/entities_.
- #### Van las definiciones de los repositorios en _/repository_ que es como queremos trabajar con nuestros _/datasouces_.
- #### Van los casos de uso en _/uses-cases_ que es lo llamamos para cumplir con una tarea en particular.

### _/infrastructure_
- #### En este directorio ya van las implementaciones de nuestros _Datasources_ y _Repositorios_ definidos en el _/domain_. 
- #### En _/datasources_ se implementan los _Datasources_ y en _/repositories_ nuestros _Repositorios_ que se comunican con lso _Datasources_

### _/presentation_
- #### En este directorio van cosas que estan bien cerca de nuestros usuarios los es _/cron_ donde se ejecutan nuestros logs cada cierto tiempo y _/email_ que envia nuestros logs por correo.
