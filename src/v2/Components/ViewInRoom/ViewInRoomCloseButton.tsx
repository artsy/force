import { Clickable, ClickableProps } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"

interface ViewInRoomCloseButtonProps extends ClickableProps {}

export const ViewInRoomCloseButton: React.FC<ViewInRoomCloseButtonProps> = props => (
  <Clickable {...props}>
    <Svg>
      <line x1="0%" y1="0%" x2="100%" y2="100%" />
      <line x1="0%" y1="100%" x2="100%" y2="0%" />
    </Svg>
  </Clickable>
)

const Svg = styled.svg`
  display: block;
  width: 30px;
  height: 30px;
  stroke: ${themeGet("colors.black60")};
  stroke-width: 3px;
  overflow: visible;
`
