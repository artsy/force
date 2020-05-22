import { color, Flex, space } from "@artsy/palette"
import React, { SFC } from "react"
import styled, { css } from "styled-components"

const railStyles = css`
  width: 100%;
  height: 2px;
  background-color: ${color("black30")};
`

const knobStyles = css`
  user-select: none;
  cursor: pointer;
  width: ${space(2)}px;
  height: ${space(2)}px;
  border-radius: 20px;
  background-color: ${color("white100")};
`

const StyledSlider = styled.input`
  appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
  margin: 0 ${space(1)}px;

  &::-webkit-slider-thumb {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-appearance: none;
    margin-top: -9px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */

    /* prettier-ignore */
    ${knobStyles}
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    ${knobStyles};
  }

  /* All the same stuff for IE */
  &::-ms-thumb {
    ${knobStyles};
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
    ${railStyles};
  }

  &::-webkit-slider-runnable-track {
    ${railStyles};
  }

  &::-moz-range-track {
    ${railStyles};
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-ms-fill-lower {
    ${railStyles};
  }

  &::-ms-fill-upper {
    ${railStyles};
  }

  &:invalid {
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`

StyledSlider.defaultProps = {
  type: "range",
}

const SliderContainer = styled.div`
  width: 240px;
  height: 50px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: ${space(1)}px;
`

const ZoomSymbolContainer = styled.svg`
  height: 32px;
  width: 32px;
  padding: ${space(1)}px;
  flex-shrink: 0;
  cursor: pointer;
`

interface ZoomButton {
  onClick?: () => void
}

const ZoomOutButton: SFC<ZoomButton> = props => (
  <ZoomSymbolContainer {...props}>
    <line
      x1="0"
      y1="50%"
      x2="100%"
      y2="50%"
      stroke={color("white100")}
      strokeWidth="2px"
    />
  </ZoomSymbolContainer>
)

const ZoomInButton: SFC<ZoomButton> = props => (
  <ZoomSymbolContainer {...props}>
    <line
      x1="50%"
      y1="0"
      x2="50%"
      y2="100%"
      stroke={color("white100")}
      strokeWidth="2px"
    />
    <line
      x1="0"
      y1="50%"
      x2="100%"
      y2="50%"
      stroke={color("white100")}
      strokeWidth="2px"
    />
  </ZoomSymbolContainer>
)

export interface SliderProps {
  min: number
  max: number
  step: number
  value: number
  onChange?: (Event) => void
  onZoomInClicked?: () => void
  onZoomOutClicked?: () => void
}
export const Slider: SFC<SliderProps> = props => (
  <SliderContainer>
    <Flex
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <ZoomOutButton onClick={props.onZoomOutClicked} />
      <StyledSlider
        min={props.min.toString()}
        max={props.max.toString()}
        step={props.step.toString()}
        onChange={props.onChange}
        ref={element => element && (element.value = props.value)}
      />
      <ZoomInButton onClick={props.onZoomInClicked} />
    </Flex>
  </SliderContainer>
)
