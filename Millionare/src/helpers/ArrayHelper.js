export class ArrayHelper {
  static shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  static shuffleAndMapAnswers(answers) {
    const letters = ["A", "B", "C", "D"];

    return ArrayHelper.shuffleArray(answers).map((a, i) => ({
      ...a,
      letter: letters[i],
    }));
  }
}
