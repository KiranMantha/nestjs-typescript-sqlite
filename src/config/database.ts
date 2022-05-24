import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  db: {
    name: process.env.DATABASE_NAME || 'default',
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    // username: process.env.POSTGRES_USER || 'postgres',
    // password: process.env.POSTGRES_PASSWORD || 'postgres',
    // database: process.env.POSTGRES_DB || 'audit-app',
    database: process.env.DATABASE_DB,
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ['dist/entities/*.js']
  }
}));
