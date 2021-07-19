import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import {IoModule} from './websocket/io.module'
import {UserHttpModule} from './core/router/users/users-http.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './core/router/auth/auth.module'
import { FireBaseModule } from './core/router/file/file.module'
import {BlogHttpModule} from './core/router/blog/blogs-http.module'
import {ActionHttpModule} from './core/router/action/action-http.module'
import { ConfigModule } from '@nestjs/config'
import { url_mongo} from 'config/configuration'
import { RoleActionHttpModule } from './core/router/role_action/role-action-http.module'
import { AuthMiddleware } from './core/middlewares/auth.middleware'
@Module({
  imports: [
    IoModule, 
    UserHttpModule,
    AuthModule,
    FireBaseModule,
    BlogHttpModule,
    ActionHttpModule,
    RoleActionHttpModule,
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
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('api/auth/(.*)')
      .forRoutes('*');
  }
}

