import classNames from "classnames";
import { useEffect, useState } from "react";
import "./GameEndScreen.css";
import { HoverLockButton } from "../../components/HoverLockButton/HoverLockButton.jsx";

export function GameEndScreen({ result, onGameRestart }) {
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    setAppear(true);
  }, []);

  const screenClass = classNames("game-end-screen", {
    appear: appear === true,
  });

  const titleClass = classNames("game-end-title", {
    win: result.won,
    defeat: !result.won,
  });

  return (
    <div className={screenClass}>
      <div className="game-end-card">
        <h1 className={titleClass}>{result.won ? "You won!" : "You lost"}</h1>
        <p className="game-end-reward">
          Reward: <strong>{result.reward} €</strong>
        </p>
        <HoverLockButton className="restart-button" onClick={onGameRestart}>
          Play again
        </HoverLockButton>
      </div>
    </div>
  );
}
