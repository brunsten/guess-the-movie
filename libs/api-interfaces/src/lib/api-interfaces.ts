import { GameState } from './api-enums';
import { Socket } from 'socket.io';
export interface GameBaseResponse {
  error?: string;
}
export interface GameData {
  word: string;
  hints: Array<string>;
  attempts: [];
  state: GameState;
}

export interface GameGuessResponse extends GameBaseResponse {
  isCorrect: boolean;
  attempts: number;
}

export interface GameEndMessage {
  winner: Player;
  attempts: number;
  correctWord: string;
}

export interface GameStartMessage {
  wordLength: number;
}

export interface GameStartResponse extends GameBaseResponse {
  started: boolean;
}
export interface PlayersUpdateMessage {
  players: Player[];
}
export interface Player {
  name: string;
  token?: string;
}

export interface ApiPlayer {
  name: string;
  socket: Socket;
  token: string;
}
