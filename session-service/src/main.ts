import {NestFactory} from '@nestjs/core';
import {SessionModule} from "./session/session.module";

async function bootstrap() {
  const app = await NestFactory.create(SessionModule);
  await app.listen(8081);
}
bootstrap();
