import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {IoModule} from '../io/io.module'
import {CatModule} from './core/cats/cat.module'
@Module({
  imports: [IoModule, CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
