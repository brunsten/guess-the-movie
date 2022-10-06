import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'gtm-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent {
  constructor(
    public playerService: PlayerService,
    public gameService: GameService
  ) {}
}
