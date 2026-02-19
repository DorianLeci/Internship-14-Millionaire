import classNames from "classnames";
import "./Answer.css";

export function Answer({answer,onClick,isSelected,isAnswered}){

    const className= classNames("answer__button",{
        selected: isSelected,
        correct: isAnswered && isSelected && answer.isCorrect,
        wrong: isAnswered && isSelected && !answer.isCorrect
    });

    return (
        <button className={className} onClick={onClick}>
            {answer.text}
        </button>
        );
}