import { ApiPlayer } from '@hang-ular-man/api-interfaces';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { from, Observable, of, switchMap, throwError } from 'rxjs';
import { Socket } from 'socket.io';
@Injectable()
export class PlayerService {
  players: ApiPlayer[] = [];
  register(token: string, socket: Socket): ApiPlayer {
    console.log('register')

    let player = this._findPlayer(token);
    if (!player) {
      player = {
        name: undefined,
        socket,
        token,
      };
      this.players.push(player);
    }
    return player;
  }

  getPlayer(token: string): Observable<ApiPlayer> {
    console.log('getPlayer')
    const player = this._findPlayer(token);
    if (!player) {
      return throwError(() => new Error('Unregistered token'));
    }
    if (!player.name) {
      return from(
        axios.get('https://names.drycodes.com/1', {
          params: {
            nameOptions: 'starwarsCharacters',
          },
        })
      ).pipe(
        switchMap((response) => {
          player.name = response.data[0];
          return of(player);
        })
      );
    }
    return of(player);
  }

  private _findPlayer(token: string) {
    return this.players.find((player) => player.token === token);
  }
}
