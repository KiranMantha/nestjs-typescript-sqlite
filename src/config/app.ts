import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  name: process.env.QUESTIONNAIRE_HOST || 'Questionnaire app',
  port: Number(process.env.QUESTIONNAIRE_PORT) || 3030
}));
