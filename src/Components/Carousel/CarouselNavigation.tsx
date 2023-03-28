import {
  Clickable,
  ClickableProps,
  color,
  space,
  SpacingUnit,
} from "@artsy/palette"
import styled from "styled-components"

const ARROW_WIDTH: SpacingUnit[] = [2, 4]
const ARROW_TRANSITION_MS = 250

/** CarouselNavigationProps */
export type CarouselNavigationProps = ClickableProps

const Arrow = styled(Clickable)`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity ${ARROW_TRANSITION_MS}ms, color ${ARROW_TRANSITION_MS}ms;

  > svg {
    fill: currentColor;
  }

  &:hover,
  &:focus {
    outline: 0;
    color: ${color("black100")};
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }
`

/**
 * Set some easily overwriteable props using `defaultProps`
 */
Arrow.defaultProps = {
  width: ARROW_WIDTH.map(value => space(value)),
  height: "100%",
  color: "black60",
}

/**
 * Default next button
 */
export const CarouselNext = styled(Arrow)`
  right: 0;
  transform: translateX(100%);
`

/**
 * Default previous button
 */
export const CarouselPrevious = styled(Arrow)`
  left: 0;
  transform: translateX(-100%);
`
