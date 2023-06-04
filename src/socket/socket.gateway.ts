import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(1024, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
@Injectable()
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() private server: Server = null;
  constructor() {
    console.log(Number(process.env.SOCKET_PORT));
  }
  async afterInit(server: Server): Promise<void> {
    console.log('Socket running at: ', 5001);
  }
  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]): void {
    console.log(`Client connected: ${client.id}`);
  }
  @SubscribeMessage('join-room')
  async joinRoom(client: Socket, payload: any): Promise<string> {
    //todo check access token if room is private room
    console.log(`Client ${client.id} join room : ${payload.room}`);
    await client.join(payload.room);
    return '';
  }

  @SubscribeMessage('send_message')
  async sendMessage(client: Socket, payload: any): Promise<any> {
    //todo check access token if room is private room
    console.log('payload', payload);
    return client.to(payload.id).emit('receive_message', payload.data);
  }
  @SubscribeMessage('leave-room')
  async leaveRoom(client: Socket, payload: { room: string }): Promise<string> {
    await client.leave(payload.room);
    return payload.room;
  }
  getServer(): Server {
    return this.server;
  }
  emitTo(payload: { id?: string; data: any; mEvent?: string }): any {
    const { id, data, mEvent } = payload;
    if (id) {
      console.log('===============================');
      console.log('EMIT EVENT TO: ', id);
      console.log('EVENT: ', mEvent);
      console.log('===============================');

      return this.server.sockets.to(id).emit(mEvent, data);
    }

    if (mEvent) {
      return this.server.sockets.emit(mEvent, data);
    }

    return this.server.sockets.emit(data);
  }
}
