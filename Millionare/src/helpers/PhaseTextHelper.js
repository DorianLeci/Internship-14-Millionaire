import { GamePhase } from "../enums/GamePhase.js";

export class PhaseTextHelper {
  static getStartScrenResultText(phase) {
    switch (phase) {
      case GamePhase.WON:
        return "Win";
      case GamePhase.LOST:
        return "Defeat";
      case GamePhase.QUIT:
        return "Took reward";
      default:
        return "Game ended";
    }
  }

  static getEndScreenTitleText(phase) {
    switch (phase) {
      case GamePhase.WON:
        return "You won!";
      case GamePhase.LOST:
        return "You lost";
      case GamePhase.QUIT:
        return "You decided to quit";
      default:
        return "Game ended";
    }
  }
}
