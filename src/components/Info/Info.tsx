import React, { FC } from 'react';
import styled from 'styled-components';
import { Status } from 'UI';
import { colors } from 'styles';
import { useSelector } from 'react-redux';
import { getCharacterById } from 'store/ducks/characterSlice/selectors';

type InfoProps = {
  id: number;
};

const Info: FC<InfoProps> = ({ id }) => {
  const character = useSelector(getCharacterById(id));

  const formattedNumbersEpisodes = character?.episode.map((item) => item.slice(40));

  const infoList: InfoListType[] = [
    { title: 'Status', content: <Status status={character?.status || 'unknown'} /> },
    { title: 'Gender', content: character?.gender },
    { title: 'Type', content: character?.type || '-' },
    { title: 'Location', content: character?.location.name },
    {
      title: 'Episodes',
      content:
        formattedNumbersEpisodes && formattedNumbersEpisodes?.length > 10
          ? 'In all episodes'
          : formattedNumbersEpisodes?.map((item) => <span key={item}>{item}</span>),
    },
  ];

  return (
    <Root>
      <Name>{character?.name}</Name>
      <StyledImg src={character?.image} alt="character" />
      <Description>
        {infoList.map((item: InfoListType) => (
          <InfoContainer key={item.title}>
            <SecondText>{item.title}:</SecondText>
            {item.content}
          </InfoContainer>
        ))}
      </Description>
    </Root>
  );
};

export default Info;

type InfoListType = {
  title: string;
  content: string | JSX.Element[] | JSX.Element | undefined;
};

const Description = styled.div`
  display: flex;

  margin: 20px 0;
  padding: 10px;
  gap: 10px;
  border: 1px solid ${colors.lightTextColor};

  flex-direction: column;
  border-radius: 10px;
`;

const SecondText = styled.span`
  width: 70px;
  color: ${colors.greyTextColor};
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 10px;
  color: ${colors.lightTextColor};
`;

const Name = styled.span`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: ${colors.hoverColor};
  cursor: pointer;
`;

const StyledImg = styled.img`
  margin-top: 20px;
  width: 100%;
  height: 315px;
  object-fit: contain;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.backgroundColor};
`;
