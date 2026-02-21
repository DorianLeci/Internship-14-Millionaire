import { questions } from "../data/questions.js";
import { ArrayHelper } from "../helpers/ArrayHelper.js";
import { GamePhase } from "../enums/GamePhase.js";
import { JokerState } from "./JokerState.js";
import { JokerType } from "../enums/JokerType.js";

export class GameState {
  static rewards = [
    100, 200, 500, 1000, 5000, 10000, 25000, 50000, 100000, 500000, 1e6,
  ];
  static safeLevelIndex = 4;
  static questionNum = 10;

  static createNew() {
    const state = new GameState();
    state.init();
    return state;
  }

  init() {
    this.currentIndex = 0;
    this.score = GameState.rewards[this.currentIndex];
    this.phase = GamePhase.PLAYING;
    this.jokerState = new JokerState();
    this.getRandomQuestions();
  }

  load(savedState) {
    this.currentIndex = savedState.currentIndex;
    this.score = GameState.rewards[this.currentIndex];
    this.questions = savedState.questions;
    this.jokerState = new JokerState();
    this.phase = GamePhase.PLAYING;
  }

  getRandomQuestions() {
    const letters = ["A", "B", "C", "D"];

    const randomQuestions = ArrayHelper.shuffleArray(questions)
      .slice(0, GameState.questionNum)
      .map((q) => ({
        ...q,
        answers: ArrayHelper.shuffleArray(q.answers).map((a, i) => ({
          ...a,
          letter: letters[i],
        })),
      }));

    this.questions = randomQuestions;
  }

  useFiftyFiftyJoker() {
    const q = this.getCurrentQuestion();

    const wrongAnswers = q.answers.filter((a) => !a.isCorrect);
    const toRemove = ArrayHelper.shuffleArray(wrongAnswers).slice(0, 2);

    toRemove.forEach((a) => (a.removed = true));

    this.jokerState.use(JokerType.FIFTY_FIFTY);
  }

  nextQuestion(isCorrect) {
    if (!isCorrect) {
      this.setLosingPhase();
      this.score =
        this.currentIndex >= GameState.safeLevelIndex
          ? GameState.rewards[GameState.safeLevelIndex]
          : 0;

      return;
    }

    this.currentIndex++;

    if (this.currentIndex >= GameState.questionNum) {
      this.phase = GamePhase.FINISHING;
      return;
    }

    this.score = this.getReward();
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  getReward() {
    return GameState.rewards[this.currentIndex];
  }

  getCurrentRewardIndex() {
    return this.currentIndex;
  }

  static getProgressFillPercent(index) {
    return index === GameState.questionNum
      ? 100
      : ((index + 1) / (GameState.rewards.length + 1)) * 100;
  }

  setWinningPhase() {
    this.phase = GamePhase.WON;
    this.score = GameState.rewards.at(-1);
  }

  setLosingPhase() {
    this.phase = GamePhase.LOST;
  }
}
