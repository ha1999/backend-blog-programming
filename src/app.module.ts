import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {IoModule} from './websocket/io.module'
import {UserHttpModule} from './core/router/users/users-http.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './core/router/auth/auth.module'
import { FireBaseModule } from './core/router/file/file.module'
import {BlogHttpModule} from './core/router/blog/blogs-http.module'
import { ConfigModule } from '@nestjs/config'
import { url_mongo } from 'config/configuration'
@Module({
  imports: [
    IoModule, 
    UserHttpModule,
    AuthModule,
    FireBaseModule,
    BlogHttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL_PG,
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
