import classNames from "classnames";
import "./Answer.css";

export function Answer({ answer, onClick, isSelected, isAnswered, isCorrect }) {
  const className = classNames("answer__button", {
    selected: isSelected,
    correct: isCorrect,
    wrong: isAnswered && isSelected && !isCorrect,
    hoverable: !isSelected,
    answered: isAnswered,
  });

  return (
    <button className={className} onClick={onClick}>
      {answer.text}
    </button>
  );
}
