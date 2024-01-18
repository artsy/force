import {
  Flex,
  ClickableProps,
  Clickable,
  FlexProps,
  useTheme,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import * as React from "react"
import styled, { css } from "styled-components"

interface DeepZoomSliderProps extends FlexProps {
  min: number
  max: number
  step: number
  value: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onZoomInClicked?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onZoomOutClicked?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const DeepZoomSlider: React.FC<DeepZoomSliderProps> = ({
  min,
  max,
  step,
  onChange,
  value,
  onZoomInClicked,
  onZoomOutClicked,
  ...rest
}) => {
  const { theme } = useTheme()

  const rgb = theme.name === "light" ? "0, 0, 0" : "255, 255, 255"

  return (
    <Flex
      width={240}
      height={50}
      borderRadius={2}
      bg={`rgba(${rgb}, 0.6)`}
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <ZoomOutButton onClick={onZoomOutClicked} />

      <Track>
        <SliderInput
          min={min.toString()}
          max={max.toString()}
          step={step.toString()}
          onChange={onChange}
          value={value}
        />
      </Track>

      <ZoomInButton onClick={onZoomInClicked} />
    </Flex>
  )
}

const railStyles = css`
  width: 100%;
  height: ${themeGet("space.2")};
`

const knobStyles = css`
  user-select: none;
  cursor: pointer;
  width: ${themeGet("space.2")};
  height: ${themeGet("space.2")};
  background-color: ${themeGet("colors.white100")};
  border-radius: 50%;
`

const Track = styled(Flex)`
  align-items: center;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -1px;
    background-color: ${themeGet("colors.black30")};
  }
`

const SliderInput = styled.input`
  appearance: none;
  background: transparent;
  position: relative;

  &::-webkit-slider-runnable-track {
    ${railStyles}
  }

  &::-moz-range-track {
    ${railStyles}
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${knobStyles}
  }

  &::-moz-range-thumb {
    ${knobStyles}
  }
`

SliderInput.defaultProps = {
  type: "range",
}

const Svg = styled.svg`
  display: block;
  height: 32px;
  width: 32px;
  padding: ${themeGet("space.1")};
  flex-shrink: 0;
  cursor: pointer;
  stroke: ${themeGet("colors.white100")};
`

const ZoomOutButton: React.FC<ClickableProps> = props => (
  <Clickable {...props}>
    <Svg>
      <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2px" />
    </Svg>
  </Clickable>
)

const ZoomInButton: React.FC<ClickableProps> = props => (
  <Clickable {...props}>
    <Svg>
      <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="2px" />
      <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2px" />
    </Svg>
  </Clickable>
)
