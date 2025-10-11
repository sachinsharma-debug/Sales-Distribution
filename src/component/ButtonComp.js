import React from 'react';

export default function ButtonComp({ button, onClick, type = "submit" }) {
  return (
    <button type={type} className="signin-btn" onClick={onClick}>
      {button || "Button"}
    </button>
  );
}
