import classNames from "classnames";
import { useEffect, useState } from "react";
import "./GameEndScreen.css";
import { HoverLockButton } from "../../components/HoverLockButton/HoverLockButton.jsx";
import { GamePhase } from "../../enums/GamePhase.js";
import { PhaseTextHelper } from "../../helpers/PhaseTextHelper.js";

export function GameEndScreen({ result, onGameRestart }) {
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    setAppear(true);
  }, []);

  const screenClass = classNames("game-end-screen", {
    appear: appear === true,
  });

  const titleClass = classNames("game-end-title", {
    win: result.phase === GamePhase.WON,
    defeat: result.phase === GamePhase.LOST,
    quit: result.phase === GamePhase.QUIT,
  });

  return (
    <div className={screenClass}>
      <div className="game-end-card">
        <h1 className={titleClass}>
          {PhaseTextHelper.getEndScreenTitleText(result.phase)}
        </h1>
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
