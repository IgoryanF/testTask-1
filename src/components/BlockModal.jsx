import React from 'react';
import styled from "styled-components";

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlockModal = ({children}) => {
    return (
        <Modal>
            {children}
        </Modal>
    );
};

export default BlockModal;