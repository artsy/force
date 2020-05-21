import { color, Flex, Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"

interface VanguardFrameTextProps {
  isSlideOpen?: boolean
}

export const VanguardFrameText: React.SFC<VanguardFrameTextProps> = props => {
  const { isSlideOpen } = props

  return (
    <>
      <Media at="xs">
        <MobileFrame isSlideOpen={isSlideOpen}>
          <MobileFrameText size="8">The Artsy</MobileFrameText>
          <MobileFrameText size="8" isUppercase>
            Vanguard
          </MobileFrameText>
          <MobileFrameText size="8" isUppercase>
            2019
          </MobileFrameText>
        </MobileFrame>
      </Media>

      {/* Desktop */}
      <Media greaterThan="xs">
        <FrameTextLeft
          isSlideOpen={isSlideOpen}
          size={["12", "12", "14", "16"]}
        >
          Vanguard
        </FrameTextLeft>
        <FrameTextRight
          isSlideOpen={isSlideOpen}
          size={["12", "12", "14", "16"]}
        >
          2019
        </FrameTextRight>
      </Media>
    </>
  )
}

const FrameText = styled(Sans)`
  position: fixed;
  top: 50%;
  text-transform: uppercase;
  z-index: 2;
  mix-blend-mode: difference;
  color: ${color("white100")};
  will-change: color;
`

const FrameTextLeft = styled(FrameText) <{ isSlideOpen?: boolean }>`
  left: 0;
  transform: rotate(-90deg);
  transform-origin: 30% 136%;

  &&& {
    z-index: ${p => (p.isSlideOpen ? 0 : 2)};
  }
`

const FrameTextRight = styled(FrameText) <{ isSlideOpen?: boolean }>`
  right: 0;
  transform: rotate(90deg);
  transform-origin: 60% 60%;

  &&& {
    z-index: ${p => (p.isSlideOpen ? 0 : 2)};
  }
`

const MobileFrame = styled(Flex) <{
  isSlideOpen?: boolean
}>`
  position: fixed;
  flex-direction: column;
  top: 65px;
  left: -10px;
  height: calc(100vh - 150px);
  width: 60px;
  justify-content: space-between;
  z-index: ${p => (p.isSlideOpen ? 0 : 2)};
`

const MobileFrameText = styled(Sans) <{
  isUppercase?: boolean
}>`
  transform: rotate(90deg);
  white-space: nowrap;
  padding: 0 10px;

  ${({ isUppercase }) =>
    isUppercase &&
    `
    text-transform: uppercase;
  `}
`
