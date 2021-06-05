import { Module } from '@nestjs/common';
import { EventsGateway } from './io.gateway';

@Module({
  providers: [EventsGateway],
})
export class IoModule {}