import React from 'react';
import "../../scss/components/Modal.scss";

const Modal = ({children, open, close}) => {
    if (!open) return null;
    return (
        <div className="modal">
            <div className="modal__content">
                <i className="fa fa-times" onClick={close}/>
                {children}
            </div>
        </div>
    )
};

export default Modal