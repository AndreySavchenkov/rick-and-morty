import { FC } from "react"
import { colors } from "styles";

type SvgComponentProps = {
  width?: number,
  height?: number,
  color?: string,
}

const ArrowLeft:FC<SvgComponentProps> = ({width = 24, height = 24, color = '#fff'}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <path fill={colors.darkTextColor} d="M0 0h24v24H0z" />
    <path  fill={color} d="m10.828 12 4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
  </svg>
)

export default ArrowLeft;
