import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketEventHandlerGateway } from './websocket-event-handler.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WebSocketEventHandlerGateway],
})
export class AppModule {}
