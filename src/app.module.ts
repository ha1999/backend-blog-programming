import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { IoModule } from './websocket/io.module';
import { UserHttpModule } from './core/router/users/users-http.module';
import { AuthModule } from './core/router/auth/auth.module';
import { FireBaseModule } from './core/router/file/file.module';
import { BlogHttpModule } from './core/router/blog/blogs-http.module';
import { ActionHttpModule } from './core/router/action/action-http.module';
import { ConfigModule } from '@nestjs/config';
import { RoleActionHttpModule } from './core/router/role_action/role-action-http.module';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { TagsHttpModule } from './core/router/tags/tags-http.module';
@Module({
  imports: [
    IoModule,
    UserHttpModule,
    AuthModule,
    FireBaseModule,
    BlogHttpModule,
    ActionHttpModule,
    RoleActionHttpModule,
    TagsHttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).exclude('api/auth/(.*)').forRoutes('*');
  }
}
