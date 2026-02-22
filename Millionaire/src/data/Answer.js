export class Answer {
  constructor(text, isCorrect) {
    this.text = text;
    this.isCorrect = isCorrect;
    this.removed = false;
    this.letter = undefined;
  }
}
