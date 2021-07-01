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
@Module({
  imports: [
    IoModule, 
    UserHttpModule,
    AuthModule,
    FireBaseModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({autoLoadEntities: true}),
    MongooseModule.forRoot('mongodb://localhost:27017/blog')
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
