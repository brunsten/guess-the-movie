import { Injectable } from '@angular/core';
import {
  GameEndMessage,
  GameGuessResponse,
  GameStartMessage,
  GameStartResponse,
  Player,
  SocketEvent,
  SocketMessage,
} from '@gtm/api-interfaces';
import { ReplaySubject, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { PlayerService } from './player.service';

// Should be in envs
const GAME_URL = 'ws://localhost:3333';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private socket$ = new ReplaySubject<Socket>(1);
  private playersSubject = new Subject<Player[]>();
  players$ = this.playersSubject.asObservable();
  constructor(private playerService: PlayerService) {
    const socket = io(GAME_URL, {
      autoConnect: true,
      extraHeaders: {
        authorization: this.playerService.token,
      },
    });

    socket.on('connect', () => {
      console.log('connect bro');
      socket.emit(SocketMessage.authorize, (data: Player) => {
        console.log('hey bro');
        this.playerService.setPlayer(data);
      });
      socket.on(SocketEvent.gameStarted, (data: GameStartMessage) => {
        console.log();
      });

      socket.on(SocketEvent.gameEnd, (data: GameEndMessage) => {
        console.log();
      });

      socket.on(SocketEvent.playersUpdated, (data: Player[]) => {
        this.playersSubject.next(data);
      });

      this.socket$.next(socket);
    });
  }

  sendGuess(guess: string) {
    this.socket$.subscribe((socket) => {
      socket.emit(SocketMessage.guess, 55, (response: GameGuessResponse) => {
        console.log(response);
      });
    });
  }

  sendStartGame() {
    this.socket$.subscribe((socket) => {
      socket.emit(
        SocketMessage.startGame,
        55,
        (response: GameStartResponse) => {
          console.log(response);
        }
      );
    });
  }
}
