import {
  GameData,
  GameEndMessage,
  GameGuessResponse,
  GameStartMessage,
  GameStartResponse,
  GameState,
  Player,
  PlayersUpdateMessage,
  SocketEvent,
  SocketMessage,
} from '@gtm/api-interfaces';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { map, Observable, tap } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';
import { PlayerService } from './player.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebSocketEventHandlerGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  gameRound?: GameData;
  constructor(
    private appService: AppService,
    private playerService: PlayerService
  ) {}

  handleConnection(client: Socket) {
    this.playerService.register(client.handshake.headers.authorization, client);
  }

  @SubscribeMessage(SocketMessage.authorize)
  authorizeHandler(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ): Observable<Player> {
    console.log('authorizeHandler');

    return this.playerService
      .getPlayer(client.handshake.headers.authorization)
      .pipe(
        map((player) => ({
          name: player.name,
        })),
        tap(() => this._emitPlayersUpdated())
      );
  }
  @SubscribeMessage(SocketMessage.startGame)
  startGameHandler(@MessageBody() data: any): GameStartResponse {
    console.log('startGameHandler');

    if (this.gameRound) {
      return; // Todo give back error i.e GameStartResponse
    }
    this.gameRound = this.appService.getGame();
    this._emitGameStart();

    return {
      started: true,
    };
  }

  @SubscribeMessage(SocketMessage.guess)
  guessHandler(@MessageBody() data: string): GameGuessResponse {
    console.log('guessHandler');

    if (!this.gameRound) {
      return {
        attempts: null,
        isCorrect: null,
        error: 'No game inprogress',
      };
    }
    // Todo: Squish data for prepending / appending spaces et c
    if (
      data === this.gameRound.word &&
      this.gameRound.state === GameState.inProgress
    ) {
      this._emitGameEnd();
      return {
        isCorrect: true,
        attempts: null,
      };
    }
  }

  private _emitGameStart() {
    console.log('_emitGameStart');

    const eventData: GameStartMessage = {
      wordLength: 5,
    };
    this.server.emit(SocketEvent.gameStarted, eventData);
  }
  private _emitGameEnd() {
    console.log('_emitGameEnd');

    const eventData: GameEndMessage = {
      attempts: 0,
      correctWord: 'juice',
      winner: {
        name: 'Betty',
        token: undefined,
      },
    };
    this.server.emit(SocketEvent.gameEnd, eventData);
  }

  private _emitPlayersUpdated() {
    console.log('_emitPlayersUpdated');
    const eventData: PlayersUpdateMessage = {
      players: this.playerService.players.map((player) => ({
        name: player.name,
      })),
    };
    console.log(eventData);
    this.server.emit(SocketEvent.playersUpdated, eventData);
  }
}
