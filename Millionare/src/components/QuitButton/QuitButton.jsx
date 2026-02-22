import { useState, useEffect } from "react";
import { ConfirmPopup } from "../ConfirmPopup/ConfirmPopup.jsx";
import { gameManager } from "../../GameLogic/GameManager.js";
import quitIcon from "../../assets/images/quit-icon.svg";
import "./QuitButton.css";

export function QuitButton({ currentQuestionAnswered }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(gameManager.state.score);

  useEffect(() => {
    const observer = {
      update: (newState) => {
        setCurrentScore(newState.score);
      },
    };
    gameManager.addObserver(observer);
    return () => gameManager.removeObserver(observer);
  }, []);

  const confirmQuit = () => {
    setTimeout(() => {
      gameManager.quitGame();
      setIsPopupOpen(false);
    }, 1500);
  };

  const cancelQuit = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="quit-button-container">
      <button
        className="quit-button"
        disabled={
          currentQuestionAnswered || gameManager.state.currentIndex === 0
        }
        onClick={openPopup}
      >
        <img className="icon" src={quitIcon} alt="Quit Icon" />
      </button>
      <ConfirmPopup
        onConfirm={confirmQuit}
        onCancel={cancelQuit}
        reward={currentScore}
        isVisible={isPopupOpen}
      />
    </div>
  );
}
