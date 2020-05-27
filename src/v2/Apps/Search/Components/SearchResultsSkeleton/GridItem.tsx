import { Box, BoxProps, Spacer, color } from "@artsy/palette"
import React from "react"
import styled, { css, keyframes } from "styled-components"
import { BorderRadiusProps } from "styled-system"
import { borderRadius as borderRadiusStyle } from "styled-system"

/**
 * The animation that's used for the background of an image while it's loading
 * in.
 */
const pulse = keyframes`
  0% { background-color: ${color("black10")}; }
  50% { background-color: ${color("black5")}; }
  100% { background-color: ${color("black10")}; }
`

// TODO: Move animation out to a shared place
const pulseAnimation = () =>
  css`
    ${pulse} 2s ease-in-out infinite;
  `

const Placeholder = styled(Box)<BoxProps & BorderRadiusProps>`
  background-color: ${color("black10")};
  animation: ${pulseAnimation};
  ${borderRadiusStyle}
`

export const GridItem: React.SFC<BoxProps> = props => {
  return (
    <Box mb={30} pr={20}>
      <Placeholder
        height={props.height}
        style={{ backgroundColor: color("black10") }}
      />
      <Placeholder
        width={80}
        height={14}
        style={{ marginTop: 10, backgroundColor: color("black10") }}
      />
      <Placeholder
        width={140}
        height={14}
        style={{ marginTop: 10, backgroundColor: color("black10") }}
      />
      <Placeholder
        width={120}
        height={14}
        style={{ marginTop: 5, backgroundColor: color("black10") }}
      />
      <Placeholder
        width={110}
        height={14}
        style={{ marginTop: 5, backgroundColor: color("black10") }}
      />
      <Spacer />
    </Box>
  )
}
