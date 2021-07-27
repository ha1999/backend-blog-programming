import { Controller, Get, Render } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Controller()
export class AppController {
  constructor() {}
  @Get()
  @Render('index')
  root() {
    return { message: 'Hi. My name is Ha!' };
  }

  // @Cron('45 * * * * *')
  // handleCron() {
  //   console.log('Called when the current second is 45');
  // }
}
