import React from 'react';
import "./Modal.css";

const Modal = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content d-flex">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button 
                            type="button" 
                            className="custom-close-btn" 
                            onClick={onClose} 
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
