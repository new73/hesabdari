import React from "react";
import "./styles/ConfirmDialog.css";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <button onClick={onConfirm}>تایید</button>
        <button onClick={onCancel}>لغو</button>
      </div>
    </div>
  );
}
