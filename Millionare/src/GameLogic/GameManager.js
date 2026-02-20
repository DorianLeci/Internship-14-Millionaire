import { GamePhase } from "../enums/GamePhase.js";
import { GameState } from "./GameState.js";

class GameManager {
  constructor() {
    this.state = GameState.createNew();
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this.state));
  }

  answerQuestion(isCorrect) {
    this.state.nextQuestion(isCorrect);
    this.notify();

    if (this.state.phase === GamePhase.FINISHING) {
      setTimeout(() => {
        this.state.setWinningPhase();
        this.notify();
      }, 4500);
    }
  }

  isGameOver() {
    return this.state.isGameOver;
  }
}

export const gameManager = new GameManager();
