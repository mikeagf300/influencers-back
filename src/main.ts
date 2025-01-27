import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(process.env.PORT ?? 3000);
  console.log(`El servidor está corriendo en el puerto ${port}`);
}
bootstrap();
