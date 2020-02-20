import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export function getTypeORMConfig(): TypeOrmModuleOptions {

  const baseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
  }

  const noRepConfig: TypeOrmModuleOptions = {
    ...baseConfig,
    host: process.env['DATABASE_LINK'] || 'db',
    port: parseInt(process.env['DATABASE_PORT'] || '5432'),
    username: process.env['DATABASE_USERNAME'] || "postgres",
    password: process.env['DATABASE_PASSWORD'] || "postgres",
    database: process.env['DATABASE_NAME'] || "chiangkhan",
  }

  return noRepConfig;

}