import classNames from "classnames";
import "./ConfirmPopup.css";
import { HoverLockButton } from "../../components/HoverLockButton/HoverLockButton.jsx";

export function ConfirmPopup({ onConfirm, onCancel, reward, isVisible }) {
  const overlayClass = classNames("overlay", {
    visible: isVisible,
  });

  return (
    <div className={overlayClass}>
      <div className="confirm-popup">
        <p>
          Are you sure you want to quit and take <span>{reward} €</span> with
          you?
        </p>
        <div className="confirm-popup__buttons">
          <button className="popup-confirm-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="popup-quit-button" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
