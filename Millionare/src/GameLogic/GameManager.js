import { GamePhase } from "../enums/GamePhase.js";
import { GameState } from "./GameState.js";
import { JokerType } from "../enums/JokerType.js";

class GameManager {
  constructor() {
    this.state = null;
    this.observers = [];
  }

  startNewGame() {
    this.state = GameState.createOrLoad();
  }

  continueGame(savedState) {
    this.state = GameState.createOrLoad(savedState);
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

  useJoker(type) {
    if (!this.state.jokerState.isAvailible(type)) return;

    switch (type) {
      case JokerType.FIFTY_FIFTY:
        this.state.useFiftyFiftyJoker();
        break;

      case JokerType.SKIP_QUESTION:
        this.state.useSkipJoker();
        break;

      case JokerType.SWAP_QUESTION:
        this.state.useSwapJoker();
        break;

      default:
        break;
    }
    this.notify();
  }

  isGameOver() {
    return this.state.isGameOver;
  }

  quitGame() {
    this.state.quitGame();
    this.notify();
  }
}

export const gameManager = new GameManager();
