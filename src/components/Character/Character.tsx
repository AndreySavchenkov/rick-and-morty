import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { Status } from 'UI';
import { stringCircumcision } from 'helper';

type CharacterType = {
  name: string;
  image: string;
  status: string;
  onClick: () => void;
};

const Character: FC<CharacterType> = ({ name, image, status, onClick }) => {
  const formattedName = stringCircumcision(name, 15);

  return (
    <Root onClick={onClick}>
      <StyledImg src={image} alt="character" />
      <Content>
        <Name>{formattedName}</Name>
        <Status status={status} />
      </Content>
    </Root>
  );
};

export default Character;

const Name = styled.span`
  font-size: 28px;
  font-weight: 600;
  color: ${colors.lightTextColor};
  cursor: pointer;

  &:hover {
    color: ${colors.hoverColor};
  }
`;

const Content = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  padding: 16px;

  flex-direction: column;
  justify-content: space-between;
  border-radius: 0 0 20px 20px;
  background-color: ${colors.backgroundColor};
`;

const StyledImg = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 20px 20px 0 0;
`;

const Root = styled.div`
  display: flex;

  width: 220px;
  height: 350px;
  margin: 0 auto;
  max-height: 100%;
  border: 1px solid ${colors.backgroundColor};

  overflow: hidden;
  cursor: pointer;
  flex-direction: column;

  border-radius: 20px;

  &:hover {
    border: 1px solid ${colors.hoverColor};
  }
`;
