import { useState, useEffect } from "react";
import { JokerType } from "../../enums/JokerType.js";
import { gameManager } from "../../GameLogic/GameManager";
import "./JockerContainer.css";
import fiftyIcon from "../../assets/images/50-percent-icon.svg";
import skipIcon from "../../assets/images/skip-icon.svg";
import swapIcon from "../../assets/images/swap-icon.svg";

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
      <h2 className="joker-title">Jokers</h2>
      <div class="joker-buttons">
        <button
          className="joker-button"
          onClick={() => onJokerClick(JokerType.FIFTY_FIFTY)}
          disabled={isJokerUsed[JokerType.FIFTY_FIFTY]}
        >
          <img
            className="icon fifty-icon"
            src={fiftyIcon}
            alt="FiftyFifty Joker"
          ></img>
        </button>

        <button
          className="joker-button"
          onClick={() => onJokerClick(JokerType.SKIP_QUESTION)}
          disabled={isJokerUsed[JokerType.SKIP_QUESTION]}
        >
          <img className="icon skip-icon" src={skipIcon} alt="Skip Joker"></img>
        </button>

        <button
          className="joker-button"
          onClick={() => onJokerClick(JokerType.SWAP_QUESTION)}
          disabled={isJokerUsed[JokerType.SWAP_QUESTION]}
        >
          <img className="icon swap-icon" src={swapIcon} alt="Swap Joker"></img>
        </button>
      </div>
    </div>
  );
}
