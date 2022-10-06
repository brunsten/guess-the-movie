import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { CommonModule } from '@angular/common';
import { GameInfoModule } from './components/game-info/game-info.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, GameInfoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
