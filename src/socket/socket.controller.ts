import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestSocketDto } from './dto/test-socket.dto';
import { SocketGateway } from './socket.gateway';

@Controller('sockets')
@ApiTags('Socket')
export class SocketController {
  constructor(private readonly socketGateway: SocketGateway) {}
  async testEmitSocket(@Body() input: TestSocketDto): Promise<any> {
    this.socketGateway.emitTo({
      id: input.room,
      mEvent: input.mEvent,
      data: input.data,
    });
    return 'true';
  }
}
