import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {IoModule} from './websocket/io.module'
import {UserHttpModule} from './core/router/users/users-http.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './core/router/auth/auth.module'
import { FireBaseModule } from './core/router/file/file.module'
import { ConfigModule } from '@nestjs/config'
import { url_mongo } from 'config/configuration'
@Module({
  imports: [
    IoModule, 
    UserHttpModule,
    AuthModule,
    FireBaseModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST_PG || "localhost",
      port: parseInt(process.env.PORT_PG) || 8888,
      username: process.env.USER_NAME_PG || "postgres",
      password: process.env.PASSWD_PG || "docker",
      database: process.env.DB_PG || "blog",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
      autoLoadEntities: true
  }),
    MongooseModule.forRoot(url_mongo)
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
