import { LevelList } from "../../components/LevelList/LevelList.jsx";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.jsx";
import { gameManager } from "../../GameLogic/GameManager.js";
import { useState, useEffect } from "react";
import { GamePhase } from "../../enums/GamePhase.js";
import classNames from "classnames";
import "./GameScreen.css";
import { LocalStorage } from "../../helpers/LocalStorage.js";
import { JokerContainer } from "../../components/JokerContainer/JokerContainer.jsx";
import { QuitButton } from "../../components/QuitButton/QuitButton.jsx";

export function GameScreen({ onGameEnd }) {
  const [phase, setPhase] = useState(gameManager.state.phase);
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);

  useEffect(() => {
    const observer = {
      update: (newState) => {
        setPhase(newState.phase);

        if (newState.phase === GamePhase.PLAYING) {
          LocalStorage.saveGame({
            savedState: {
              currentIndex: newState.getCurrentRewardIndex(),
              questions: newState.questions,
              jokerState: newState.jokerState.isJokerUsed,
            },
            lastGameResult: null,
          });
        } else if (
          newState.phase === GamePhase.WON ||
          newState.phase === GamePhase.LOST ||
          newState.phase === GamePhase.QUIT
        ) {
          const reward = newState.score;

          onGameEnd({ phase: newState.phase, reward });
        }
      },
    };

    gameManager.addObserver(observer);

    return () => {
      gameManager.removeObserver(observer);
    };
  }, []);

  const handleAnswer = (isCorrect) => {
    gameManager.answerQuestion(isCorrect);
  };

  const screenClass = classNames("game-screen", {
    finishing: phase === GamePhase.FINISHING,
  });

  return (
    <div className={screenClass}>
      {phase === GamePhase.PLAYING && (
        <div className="leftSide-wrapper">
          <div className="additional-buttons-wrapper">
            <JokerContainer currentQuestionAnswered={currentQuestionAnswered} />
            <div className="quit-button-wrapper">
              <h2 className="quit-title">Quit</h2>
              <QuitButton currentQuestionAnswered={currentQuestionAnswered} />
            </div>
          </div>
          <div className="question">
            <QuestionCard
              handleAnswer={handleAnswer}
              onAnsweredChange={setCurrentQuestionAnswered}
            ></QuestionCard>
          </div>
        </div>
      )}

      <LevelList />
    </div>
  );
}
