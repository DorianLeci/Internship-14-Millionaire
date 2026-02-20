import classNames from "classnames";
import { useState } from "react";

export function HoverLockButton({ children, onClick, className = "" }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    onClick?.();
  };

  const btnClass = classNames(className, {
    clicked: clicked,
    hoverable: !clicked,
  });

  return (
    <button className={btnClass} onClick={handleClick}>
      {children}
    </button>
  );
}
