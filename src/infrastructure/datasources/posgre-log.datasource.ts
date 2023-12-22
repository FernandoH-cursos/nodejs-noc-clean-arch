import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();

//* Llamando enum de severidad del log de prisma para usarlo en el datasource 
const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PosgreLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const { level, message, origin, createdAt } = log;

    //* Creando log con prisma 
    const newLog = await prismaClient.logModel.create({
      data: {
        level: severityEnum[level],
        message,
        origin,
        createdAt,
      },
    });
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    //* Obteniendo los logs con prisma filtrando por su severidad
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: severityEnum[severityLevel],
      },
    });

    //* Convirtiendo cada registro de postgreSQL en una entidad Log
    return logs.map((log) => LogEntity.fromObject(log));
  }
}