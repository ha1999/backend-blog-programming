import {
  Controller,
  Get,
  Req,
  Request
} from '@nestjs/common'
import { AppService } from './app.service'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  sayHello(@Req() req: Request) {
    return this.appService.getHello()
  }
}