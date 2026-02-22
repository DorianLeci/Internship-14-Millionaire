import { gameManager } from "../../GameLogic/GameManager.js";
import { GameState } from "../../GameLogic/GameState.js";
import { useState, useEffect, useRef } from "react";
import "./LevelList.css";
import { Level } from "../Level/Level.jsx";

export function LevelList() {
  const listRef = useRef(null);
  const [rewardIndex, setRewardIndex] = useState(
    gameManager.state.getCurrentRewardIndex(),
  );
  const [listHeight, setListHeight] = useState(0);

  const [progressPercent, setProgressPercent] = useState(
    gameManager.state.getProgressFillPercent(),
  );

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.offsetHeight);
    }
    const observer = {
      update: (newState) => {
        setRewardIndex(newState.getCurrentRewardIndex());
        setProgressPercent(newState.getProgressFillPercent());
      },
    };

    gameManager.addObserver(observer);

    return () => {
      gameManager.removeObserver(observer);
    };
  }, []);

  const clipValue = 100 - progressPercent;

  return (
    <div className="level-container">
      <div className="progress" style={{ height: `${listHeight}px` }}>
        <div
          className="progress-fill"
          style={{ clipPath: `inset(0 0 ${clipValue}% 0)` }}
        ></div>
      </div>
      <ul className="level-list" ref={listRef}>
        {GameState.rewards.map((reward, i) => {
          return (
            <Level
              key={i}
              levelNum={i}
              reward={reward}
              isCurrentLevel={i === rewardIndex}
              isSafeLevel={i === GameState.safeLevelIndex}
            ></Level>
          );
        })}
      </ul>
    </div>
  );
}
