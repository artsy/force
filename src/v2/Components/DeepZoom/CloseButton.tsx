import { color, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

const CloseButtonContainer = styled.svg`
  width: ${space(6)}px;
  height: ${space(6)}px;
  padding: ${space(3) / 2}px;
  stroke: ${color("white100")};
  stroke-width: 3px;
  overflow: visible;
  cursor: pointer;
`

export interface CloseButtonProps {
  onClick: (Event) => void
}
export const CloseButton = props => (
  <CloseButtonContainer onClick={props.onClick}>
    <line x1="0%" y1="0%" x2="100%" y2="100%" />
    <line x1="0%" y1="100%" x2="100%" y2="0%" />
  </CloseButtonContainer>
)
