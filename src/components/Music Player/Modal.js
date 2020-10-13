import React from 'react';

const Modal = ({children, open, close}) => {
    if (!open) return null;
    return (
        <div className="Modal">
            <div className="modal-content">
                <i className="fa fa-times" onClick={close}/>
                {children}

            </div>
        </div>
    )
};

export default Modal