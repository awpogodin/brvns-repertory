/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const port = configService.get<number>("port");
    await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    });
}

bootstrap();
