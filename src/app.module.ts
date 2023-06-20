import { Global, Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';

import { LoggerMiddleware } from './decorator/logger.middleware';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CatModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    // MongooseModule.forRoot('mongodb://127.0.0.1/mewcat'),
    //bring env with config module
    MongooseModule.forRoot(config().DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
