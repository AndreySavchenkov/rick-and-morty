import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';

type ButtonProps = {
  text: string;
  className?: string;
  action?: () => void;
};

const Button: FC<ButtonProps> = ({ text, action, className }) => {
  return (
    <Root onClick={action} className={className}>
      {text}
    </Root>
  );
};

export default Button;

const Root = styled.button`
  min-width: 65px;
  padding: 5px 10px;

  border-radius: 8px;
  outline: none;
  border: none;

  font-weight: 600;
  cursor: pointer;
  color: ${colors.lightTextColor};
  background-color: ${colors.hoverColor};

  &:hover {
    background-color: ${colors.hoverActiveColor};
  }

  &:active {
    padding: 4px 9px;
    border: 1px solid ${colors.lightTextColor};
  }

  @media (max-width: 530px) {
    height: 42px;
  }
`;
