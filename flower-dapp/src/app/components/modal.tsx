import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void,
    children : React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${
                isOpen ? "" : "hidden"
            }`}
        >
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"/>
            <div
                className="modal-container bg-catppuccin_blue0 text-gray-200 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    {children}
                    <div className="modal-close cursor-pointer z-50">
                        <button onClick={onClose} className="modal-close-button">
                            🆗
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;