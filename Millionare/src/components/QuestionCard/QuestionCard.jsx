import { gameManager } from "../../GameLogic/GameManager.js";
import { useState, useEffect } from "react";
import { Answer } from "../Answer/Answer.jsx";
import "./QuestionCard.css";
import { HoverLockButton } from "../HoverLockButton/HoverLockButton.jsx";

export function QuestionCard({ handleAnswer }) {
  const [question, setQuestion] = useState(
    gameManager.state.getCurrentQuestion(),
  );
  const [answerState, setAnswerState] = useState({
    isAnswered: false,
    selectedIndex: null,
    correctIndex: null,
  });

  useEffect(() => {
    const observer = {
      update: (newState) => {
        setQuestion(newState.getCurrentQuestion());
        setAnswerState({
          isAnswered: false,
          selectedIndex: null,
          correctIndex: null,
        });
      },
    };

    gameManager.addObserver(observer);

    return () => {
      gameManager.removeObserver(observer);
    };
  }, []);

  const onSelectAnswer = (index) => {
    if (answerState.isAnswered) return;

    setAnswerState((prev) => ({
      ...prev,
      selectedIndex: index,
    }));
  };

  const onAnswerConfirm = () => {
    if (answerState.isAnswered) return;

    setAnswerState((prev) => ({
      ...prev,
      isAnswered: true,
      correctIndex: question.answers.findIndex((ans) => ans.isCorrect),
    }));

    const answer = question.answers[answerState.selectedIndex];
    const isCorrect = answer.isCorrect;

    setTimeout(() => {
      handleAnswer(isCorrect);
    }, 2000);
  };

  return (
    <>
      <div className="question__card">
        <h2 className="question__text">{question.text}</h2>
        <div className="answer-container">
          {question.answers.map((a, i) => {
            return (
              <Answer
                key={i}
                answer={a}
                isSelected={i == answerState.selectedIndex}
                isAnswered={answerState.isAnswered}
                isCorrect={i == answerState.correctIndex}
                onClick={() => onSelectAnswer(i)}
              ></Answer>
            );
          })}
        </div>
        {answerState.selectedIndex !== null && (
          <HoverLockButton className="confirm-button" onClick={onAnswerConfirm}>
            Potvrdi
          </HoverLockButton>
        )}
      </div>
    </>
  );
}
