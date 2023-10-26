import React from 'react';
import "../Modal.css"
const Modal = ({ isOpen, onClose, child }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div>{child}</div>
            </div>
        </div>
    );
};

export default Modal;