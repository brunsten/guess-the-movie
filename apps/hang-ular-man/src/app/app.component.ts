import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'hang-ular-man-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient, private gameService: GameService) {}

  startGame() {
    this.gameService.sendStartGame();
  }
}
