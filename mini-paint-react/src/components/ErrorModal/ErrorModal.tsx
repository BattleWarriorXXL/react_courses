import React from "react";
import Modal from "../Layout/Modal/Modal";

import "./ErrorModal.css";

interface IErrorModalProps {
    errorMessage: string | null;
    onErrorModalClose: () => void;
}

const ErrorModal = (props: IErrorModalProps) => {
    return (
        <Modal
            title=":-("
            isOpen={!!props.errorMessage}
            onClose={props.onErrorModalClose}>
            <div className="error-modal-wrapper">
                {props.errorMessage}
            </div>
        </Modal>
    );
};

export default ErrorModal;
