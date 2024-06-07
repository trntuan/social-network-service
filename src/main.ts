import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import { ChatGateway } from './chat/chat.gateway';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);

  // const eventGateway = app.get(ChatGateway);
  // setInterval(() => {
  //   eventGateway.server.emit('events', { data: 'Hello world!' });
  // });

  // setInterval(() => {
  //   eventGateway.handleMessage({
  //     sender: 'me',
  //     receiver: 'you',
  //     content: 'hello world!',
  //   });
  // }, 1000);
}
bootstrap();
