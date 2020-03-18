import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Sec33_chiangkhan_Backend example')
    .setDescription('The Sec33_chiangkhan_Backend API description')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
