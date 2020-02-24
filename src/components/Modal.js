import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  width: min-content;
  height: min-content;
  animation: fadeIn 0.2s ease-in;
  will-change: opacity;
`;
const StyledBackdrop = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(9, 53, 84, 0.9);
  animation: fadeIn 0.2s ease-in;
  will-change: opacity;
`;

const modalTarget = document.getElementById("modal");

const Modal = ({ children, open, close }) => {
  return ReactDOM.createPortal(
    <React.Fragment>
      <StyledModal open={open}>{children}</StyledModal>
      <StyledBackdrop onClick={close} open={open} />
    </React.Fragment>,
    modalTarget
  );
};

Modal.defaultProps = {
  open: false
};

export default Modal;
