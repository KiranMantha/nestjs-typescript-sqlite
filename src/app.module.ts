import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database-connection.service';
import { QuestionsModule } from './modules/questions/questions.module';
import { appConfig } from './config/app';
import { databaseConfig } from './config/database';
import { jwtConfig } from './config/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConnectionService
    }),
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
