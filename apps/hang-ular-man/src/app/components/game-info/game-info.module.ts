import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameInfoComponent } from './game-info.component';

@NgModule({
  declarations: [GameInfoComponent],
  exports: [GameInfoComponent],
  imports: [CommonModule],
})
export class GameInfoModule {}
