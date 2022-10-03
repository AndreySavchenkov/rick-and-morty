import React, {FC} from 'react'
import styled, {css} from 'styled-components';
import {colors} from 'styles';

type CharacterType = {
  name: string;
  image: string;
  gender: string;
  status: string;
  location: string;
  species: string;
  type: string;
};

enum Statuses {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown'
}

const Character: FC<CharacterType> = ({name, image, gender, status, location, species, type}) => {

  const isAlive = status === Statuses.ALIVE;
  const textStatus = status === Statuses.UNKNOWN ? 'No Idea' : status;

  return (
    <Root>
      <StyledImg src={image} alt='character'/>
      <Content>
        <div>
          <Name>{name}</Name>
          <Status><Indicator $isAlive={isAlive}/> {textStatus} - {species}</Status>
        </div>
        <InfoContainer>
          <SecondText>Gender: </SecondText>
          {gender}
        </InfoContainer>
        {type && (
          <InfoContainer>
            <SecondText>Type: </SecondText>
            {type}
          </InfoContainer>
        )}
        <InfoContainer>
          <SecondText>Location: </SecondText>
          {location}
        </InfoContainer>
      </Content>
    </Root>
  )
}

export default Character

const SecondText = styled.span`
  color: ${colors.greyTextColor};
`;

const InfoContainer = styled.div`
  color: ${colors.lightTextColor};
`;

const Indicator = styled.div<{ $isAlive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  ${({$isAlive}) => css`
    background-color: ${$isAlive ? colors.indicatorPositive : colors.indicatorNegative}
  `}
`;

const Status = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${colors.lightTextColor};
`;

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
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  border-radius: 0 20px 20px 0;
  background-color: ${colors.backgroundColor};

  @media (max-width: 530px) {
    width: 220px;
    gap: 16px;
    border-radius: 0 0 20px 20px;
  }
`;

const StyledImg = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 20px 0 0 20px;

  @media (max-width: 530px) {
    border-radius: 20px 20px 0 0;
  }
`;

const Root = styled.div`
  display: flex;
  max-width: 600px;
  max-height: 220px;
  width: 100%;
  overflow: hidden;

  @media (max-width: 530px) {
    flex-direction: column;
    width: 220px;
    margin: 0 auto;
    max-height: 100%;
  }
`;