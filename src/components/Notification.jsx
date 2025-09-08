// src/components/Notification.jsx
import React, { useEffect } from "react";
import "./styles/Notification.css";

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}
