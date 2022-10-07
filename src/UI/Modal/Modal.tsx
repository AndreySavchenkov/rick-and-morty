import React, { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import Button from '../Button/Button';

const modalRootElement = document.querySelector('#modal');

type ModalProps = {
  children: React.ReactNode;
  onClose: (data: boolean) => void;
};

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (modalRootElement) {
      modalRootElement.appendChild(element);
      return () => {
        modalRootElement.removeChild(element);
      };
    }
  });

  return (
    <Root>
      <Container>
        {children}
        <StyledButton text="Close" action={() => onClose(false)} />
      </Container>
    </Root>
  );
};

export default Modal;

const StyledButton = styled(Button)`
  height: 36px;
`;

const Container = styled.div`
  display: flex;

  padding: 20px;
  width: 500px;

  background-color: ${colors.backgroundColor};
  z-index: 5;
  flex-direction: column;
  border-radius: 18px;

  @media (max-width: 500px) {
    left: 0;
    margin: 0 10px;
  }
`;

const Root = styled.div`
  position: fixed;
  display: flex;

  height: 100%;
  width: 100%;
  top: 0;

  align-items: center;
  justify-content: center;
  overflow: scroll;
  background-color: rgba(1, 1, 1, 0.8);
  z-index: 4;
`;
