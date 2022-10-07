import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'styles';

type StatusProps = {
  status: string;
};

const Status: FC<StatusProps> = ({ status }) => {
  const isAlive = status === Statuses.ALIVE;
  const textStatus = status === Statuses.UNKNOWN ? 'No Idea' : status;

  return (
    <Root>
      <Indicator $isAlive={isAlive} />
      {textStatus}
    </Root>
  );
};

export default Status;

enum Statuses {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

const Indicator = styled.div<{ $isAlive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  ${({ $isAlive }) => css`
    background-color: ${$isAlive ? colors.indicatorPositive : colors.indicatorNegative};
  `}
`;

const Root = styled.span`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${colors.lightTextColor};
`;
