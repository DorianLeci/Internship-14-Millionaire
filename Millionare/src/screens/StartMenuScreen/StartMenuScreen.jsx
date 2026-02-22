import { useState, useEffect } from "react";
import "./StartMenuScreen.css";
import { HoverLockButton } from "../../components/HoverLockButton/HoverLockButton.jsx";

export function StartMenuScreen({
  handleGameStart,
  handleGameContinue,
  lastGameResult,
}) {
  return (
    <div className="menu">
      <h1 className="menu__title">Who Wants to Be a Millionaire?</h1>

      {lastGameResult && (
        <div className="last-game">
          <span className="last-game__result">
            Last game:{" "}
            <span
              className={
                lastGameResult.won ? "result-text--win" : "result-text--defeat"
              }
            >
              {lastGameResult.won ? "Win" : "Defeat"}
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
