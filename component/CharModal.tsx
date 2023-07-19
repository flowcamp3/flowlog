import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CharModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleModalClose = () => {
    onClose();
  };

  return (
    <div className={"modal_overlay"}>
      <div className={"modal_content"} ref={modalRef}>
        <button className={"close_btn"} onClick={handleModalClose}>
          &times;
        </button>
        <button onClick={handleModalClose}>X</button>
        {children}
      </div>

      <style jsx>{`
        .modal_overlay {
          z-index: 10;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal_content {
          background-color: #fff;
          padding: 20px;
          border-radius: 4px;
          max-width: 400px;
        }

        .close_btn {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CharModal;
