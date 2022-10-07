import React from 'react';
import { FC } from 'react';
import { colors } from 'styles';

type SvgComponentProps = {
  width?: number;
  height?: number;
  color?: string;
};

const ArrowRight: FC<SvgComponentProps> = ({ width = 24, height = 24, color = '#f08d49' }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill={colors.darkTextColor} d="M0 0h24v24H0z" />
      <path
        fill={colors.hoverColor}
        d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
      />
    </g>
  </svg>
);

export default ArrowRight;
