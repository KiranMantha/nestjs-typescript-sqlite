import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response';
import { ErrorInterceptor } from './interceptors/error';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Questionnaire Module')
    .setDescription('Questionnaire API Application')
    .setVersion('v1')
    .addTag('questionnaire')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new ResponseInterceptor(), new ErrorInterceptor());
  app.enableCors();
  await app.listen(configService.get('app.port'), '0.0.0.0');
}
bootstrap();
