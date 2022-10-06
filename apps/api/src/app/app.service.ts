import { GameData, GameState } from '@gtm/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  players
  getGame(): GameData {
    return {
      attempts: [],
      hints: [],
      state: GameState.inProgress,
      word: 'juicy',
    };
  }
  
}
