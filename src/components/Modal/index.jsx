
import React from 'react';
import "./style.css";



const Modal = ({ isOpen, onClose,content }) => {
    return (
      <div className={`modal-container ${isOpen ? 'open' : ''}`}>
        {/* Modal Backdrop */}
        <div className="modal-backdrop"></div>
  
        {/* Modal Content */}
        <div className="modal">
          <span>{content}</span>
          <span className="close" onClick={onClose}>x</span>
        </div>
      </div>
    );
  };
  
  export default Modal;