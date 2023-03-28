import React from "react";
import Modal from "../Modal/Modal";

import "./ConfirmModal.css";

function ConfirmModal({title, show, onClose, message, onYes, onNo}) {
    return (
        <Modal title={title} show={show} onClose={onClose}>
            <div className="ConfirmModal-container">
                {message}
                <button className="button button-success" onClick={onYes}>Yes</button>
                <button className="button button-danger" onClick={onNo}>No</button>
            </div>
        </Modal>
        
    );
}

export default ConfirmModal;
