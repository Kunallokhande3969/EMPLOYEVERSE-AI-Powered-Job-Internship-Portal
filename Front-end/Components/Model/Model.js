// components/Modal.js
"use client";
import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      {children}
    </div>
  );
};

export default Modal;