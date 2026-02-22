import { questions } from "../data/questions.js";
import { ArrayHelper } from "../helpers/ArrayHelper.js";
import { GamePhase } from "../enums/GamePhase.js";
import { JokerState } from "./JokerState.js";
import { JokerType } from "../enums/JokerType.js";

export class GameState {
  static rewards = [
    100, 200, 500, 1000, 5000, 10000, 25000, 50000, 100000, 500000,
  ];

  static safeLevelIndex = 4;
  static questionNum = 10;

  static createOrLoad(savedState) {
    const state = new GameState();
    if (savedState) state.load(savedState);
    else state.init();
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
    this.jokerState = new JokerState(savedState.jokerState);
    this.phase = GamePhase.PLAYING;
  }

  getRandomQuestions() {
    const randomQuestions = ArrayHelper.shuffleArray(questions)
      .slice(0, GameState.questionNum)
      .map((q) => ({
        ...q,
        answers: ArrayHelper.shuffleAndMapAnswers(q.answers),
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

  useSkipJoker() {
    this.currentIndex++;
    this.jokerState.use(JokerType.SKIP_QUESTION);
  }

  useSwapJoker() {
    const currQuestion = this.getCurrentQuestion();

    const remainingPool = questions.filter((q) => !this.questions.includes(q));
    const randomIndex = Math.floor(Math.random() * remainingPool.length);

    const poolQuestion = remainingPool[randomIndex];

    const newQuestion = {
      ...poolQuestion,
      answers: ArrayHelper.shuffleAndMapAnswers(poolQuestion.answers),
    };

    this.questions[this.currentIndex] = newQuestion;

    this.jokerState.use(JokerType.SWAP_QUESTION);
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
    const lastIndex = GameState.rewards.length - 1;
    return Math.min(this.currentIndex, lastIndex);
  }

  getProgressFillPercent() {
    return this.currentIndex === GameState.questionNum
      ? 100
      : ((this.currentIndex + 1) / (GameState.rewards.length + 1)) * 100;
  }

  setWinningPhase() {
    this.phase = GamePhase.WON;
    this.score = GameState.rewards.at(-1);
  }

  setLosingPhase() {
    this.phase = GamePhase.LOST;
  }

  isLastQuestion() {
    return this.currentIndex === this.questions.length - 1;
  }
}
