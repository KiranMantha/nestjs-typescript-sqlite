import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptors/response';
import { ErrorInterceptor } from './interceptors/error';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new ResponseInterceptor(), new ErrorInterceptor());
  await app.listen(configService.get('app.port'));
}
bootstrap();
