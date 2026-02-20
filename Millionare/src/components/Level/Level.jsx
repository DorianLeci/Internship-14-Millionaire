import classNames from "classnames";
import { GameState } from "../../GameLogic/GameState.js";

export function Level({ isCurrentLevel, levelNum, reward, isSafeLevel }) {
  const rewardClassName = classNames("level__reward", {
    current: isCurrentLevel,
    safe: isSafeLevel,
  });

  return (
    <li className="level">
      <div className="level__info">
        <span className="level__number">{levelNum + 1}</span>
        <span className={rewardClassName}>{reward} €</span>
      </div>
    </li>
  );
}
