/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { MDBModal } from 'mdbreact';

const Modal = ({ isOpen, toggleModal, children }) => {
  const modalRef = useRef(null);

  return (
    <MDBModal
      ref={modalRef}
      isOpen={isOpen}
      toggle={toggleModal}
      centered
      backdrop={true}
      keyboard={false}
    >
      {children}
    </MDBModal>
  );
};

export default Modal;
