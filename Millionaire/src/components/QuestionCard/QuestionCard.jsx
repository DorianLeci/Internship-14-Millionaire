import { gameManager } from "../../GameLogic/GameManager.js";
import { useState, useEffect } from "react";
import { Answer } from "../Answer/Answer.jsx";
import "./QuestionCard.css";
import { HoverLockButton } from "../HoverLockButton/HoverLockButton.jsx";
import { motion, AnimatePresence } from "framer-motion";

export function QuestionCard({ handleAnswer, onAnsweredChange }) {
  const [question, setQuestion] = useState(
    gameManager.state.getCurrentQuestion(),
  );

  const [currentIndex, setCurrentIndex] = useState(
    gameManager.state.getCurrentRewardIndex(),
  );

  const [answerState, setAnswerState] = useState({
    isAnswered: false,
    selectedIndex: null,
    correctIndex: null,
  });

  useEffect(() => {
    const observer = {
      update: (newState) => {
        setCurrentIndex(newState.getCurrentRewardIndex());
        setQuestion(newState.getCurrentQuestion());
        setAnswerState({
          isAnswered: false,
          selectedIndex: null,
          correctIndex: null,
        });

        onAnsweredChange(false);
      },
    };

    gameManager.addObserver(observer);

    return () => {
      gameManager.removeObserver(observer);
    };
  }, []);

  const onSelectAnswer = (index) => {
    if (answerState.isAnswered || question.answers[index].removed) return;

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

    onAnsweredChange(true);

    const answer = question.answers[answerState.selectedIndex];
    const isCorrect = answer.isCorrect;

    setTimeout(() => {
      handleAnswer(isCorrect);
    }, 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 30 }}
        exit={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.3, 0, 0.58, 1] }}
      >
        <div className="question__card">
          <h2 className="question__text">{question.text}</h2>
          <div className="answer-container">
            {question.answers.map((a, i) => {
              return (
                <Answer
                  key={i}
                  answer={a}
                  isRemoved={a.removed}
                  isSelected={i == answerState.selectedIndex}
                  isAnswered={answerState.isAnswered}
                  isCorrect={i == answerState.correctIndex}
                  onClick={() => onSelectAnswer(i)}
                ></Answer>
              );
            })}
          </div>
          {answerState.selectedIndex !== null && (
            <HoverLockButton
              className="confirm-button"
              onClick={onAnswerConfirm}
            >
              Confirm
            </HoverLockButton>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
