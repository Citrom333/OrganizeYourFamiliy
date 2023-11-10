import React from 'react';
import "../Modal.css"
const Modal = ({ isOpen, onClose, child, isSmall = false }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" id={isSmall ? "small" : ""} >
            <div className="modal">
                <div>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modalContent">{child}</div>
            </div>
        </div>
    );
};

export default Modal;