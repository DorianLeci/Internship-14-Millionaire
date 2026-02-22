import "./StartMenuScreen.css";
import { HoverLockButton } from "../../components/HoverLockButton/HoverLockButton.jsx";
import classNames from "classnames";
import { PhaseTextHelper } from "../../helpers/PhaseTextHelper.js";
import { GamePhase } from "../../enums/GamePhase.js";

export function StartMenuScreen({
  handleGameStart,
  handleGameContinue,
  lastGameResult,
}) {
  const resultTextClass = classNames("result-text", {
    win: lastGameResult?.phase === GamePhase.WON,
    defeat: lastGameResult?.phase === GamePhase.LOST,
    quit: lastGameResult?.phase === GamePhase.QUIT,
  });

  return (
    <div className="menu">
      <h1 className="menu__title">Who Wants to Be a Millionaire?</h1>

      {lastGameResult && (
        <div className="last-game">
          <span className="last-game__result">
            Last game:{" "}
            <span className={resultTextClass}>
              {PhaseTextHelper.getStartScrenResultText(lastGameResult.phase)}
            </span>
          </span>
          <span className="last-game__reward">
            Reward:{" "}
            <span className="reward-text">{lastGameResult.reward} €</span>
          </span>
        </div>
      )}

      <div className="menu__buttons">
        <HoverLockButton className="start-button" onClick={handleGameStart}>
          New Game
        </HoverLockButton>

        {handleGameContinue && (
          <HoverLockButton
            className="continue-button"
            onClick={handleGameContinue}
          >
            Continue Game
          </HoverLockButton>
        )}
      </div>
    </div>
  );
}
