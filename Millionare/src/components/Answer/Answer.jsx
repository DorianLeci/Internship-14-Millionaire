import classNames from "classnames";
import "./Answer.css";

export function Answer({
  answer,
  onClick,
  isSelected,
  isAnswered,
  isCorrect,
  isRemoved,
}) {
  const btnClassName = classNames("answer__button", {
    selected: isSelected,
    correct: isCorrect,
    wrong: isAnswered && isSelected && !isCorrect,
    hoverable: !isSelected,
    answered: isAnswered,
    removed: isRemoved,
  });

  const ansTextClass = classNames("answer__text", {
    removed: isRemoved,
  });

  return (
    <button className={btnClassName} onClick={onClick}>
      <span className="answer__letter">{answer.letter}:</span>
      <span className={ansTextClass}>{answer.text}</span>
    </button>
  );
}
