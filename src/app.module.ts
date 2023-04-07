import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './user/role.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    UserModule,
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
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
