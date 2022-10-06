import { Injectable } from '@angular/core';
import { Player } from '@hang-ular-man/api-interfaces';
import { ReplaySubject } from 'rxjs';
import uuid4 from 'uuid4';
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly tokenLocalKey = 'im-not-a-token';
  private playerSubject = new ReplaySubject<Player>();
  // "token" :)
  token = localStorage.getItem(this.tokenLocalKey) || '';
  player$ = this.playerSubject.asObservable();
  constructor() {
    if (!this.token) {
      this.token = uuid4();
      localStorage.setItem(this.tokenLocalKey, this.token);
    }
  }
  setPlayer(player: Player) {
    this.playerSubject.next(player);
  }
}
