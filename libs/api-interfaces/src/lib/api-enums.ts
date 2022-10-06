export enum SocketMessage {
  startGame = 'start-game',
  requestHint = 'request-hint',
  guess = 'guess',
  authorize = 'authorize',
}

export enum SocketEvent {
  gameStarted = 'game-started',
  gameEnd = 'game-end',
  welcome = 'welcome',
  playersUpdated = 'players-updated',
}

export enum GameState {
  inProgress = 'in-progress',
  ended = 'ended',
}
