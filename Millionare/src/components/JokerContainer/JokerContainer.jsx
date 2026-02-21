import { useState, useEffect } from "react";
import { JokerType } from "../../enums/JokerType.js";
import { gameManager } from "../../GameLogic/GameManager";
import "./JockerContainer.css";
import fiftyIcon from "../../assets/images/50-percent-icon.svg";

export function JokerContainer() {
  const [isJokerUsed, setIsJokerUsed] = useState(
    gameManager.state.jokerState.isJokerUsed,
  );

  useEffect(() => {
    const observer = {
      update: (newState) => {
        setIsJokerUsed({ ...newState.jokerState.isJokerUsed });
      },
    };

    gameManager.addObserver(observer);

    return () => {
      gameManager.removeObserver(observer);
    };
  }, []);

  const onJokerClick = (type) => {
    gameManager.useJoker(type);
  };

  console.log(isJokerUsed[JokerType.FIFTY_FIFTY]);
  return (
    <div className="joker-container">
      <button
        className="joker-button"
        onClick={() => onJokerClick(JokerType.FIFTY_FIFTY)}
        disabled={isJokerUsed[JokerType.FIFTY_FIFTY]}
      >
        <img
          className="fifty-icon"
          src={fiftyIcon}
          alt="FiftyFifty Joker"
        ></img>
      </button>
    </div>
  );
}
