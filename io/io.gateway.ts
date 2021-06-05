import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Socket, Server } from 'socket.io';
  import { Logger } from '@nestjs/common';
  @WebSocketGateway()
  export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');
  
    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
      return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }
  
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
      return data;
    }
    afterInit(server: Server) {
      this.logger.log('Init');
     }
    
     handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
     }
    
     handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
     }
  }
  