import React from "react"
import styled from "styled-components"
import {
  BottomProps,
  LeftProps,
  RightProps,
  SpaceProps,
  TopProps,
  bottom,
  color,
  left,
  right,
  space,
  top,
} from "styled-system"
import "../Assets/Fonts"
import icons, { IconName } from "../Assets/Icons"

export type FontName = string

export interface IconProps
  extends React.HTMLProps<HTMLDivElement>,
    TopProps,
    LeftProps,
    BottomProps,
    RightProps,
    SpaceProps {
  font?: FontName
  name: IconName
  fontSize?: string
  style?: any
  onClick?: () => void
}

const Icon: React.SFC<IconProps> = ({
  color: _color,
  font,
  fontSize,
  name,
  ...props
}) => <div {...props}>{icons[name]}</div>

export default styled(Icon)`
  font-family: ${props => props.font || "artsy-icons"};
  color: ${props => props.color || "purple"};
  font-size: ${props => props.fontSize || "24px"};
  margin: 0 5px;
  display: inline-block;
  letter-spacing: 0;
  position: relative;
  ${bottom};
  ${color};
  ${left};
  ${right};
  ${space};
  ${top};
`
