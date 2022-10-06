import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerService } from './player.service';
import { WebSocketEventHandlerGateway } from './websocket-event-handler.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WebSocketEventHandlerGateway, PlayerService],
})
export class AppModule {}
