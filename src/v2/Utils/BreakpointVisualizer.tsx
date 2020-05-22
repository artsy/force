import { Box, Display } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"

// TODO: Bring transition animation back
const StyledBox = styled(Box)`
  pointer-events: none;
  position: fixed;
  background-color: black;
  color: white;
  border-bottom-right-radius: 5px;
  /* transition: opacity 0.3s ease-in-out; */
  opacity: 0.05;
  z-index: 2;
`

const BreakpointText: React.SFC<{ breakpoint: string; max?: boolean }> = ({
  breakpoint,
  max,
}) => (
    <Media {...{ [max ? "greaterThanOrEqual" : "at"]: breakpoint }}>
      <Display size="8">{breakpoint}</Display>
    </Media>
  )

export const BreakpointVisualizer: React.SFC = () => (
  <React.Fragment>
    {typeof window !== "undefined" &&
      window.navigator &&
      !window.navigator.userAgent.match(/Chromatic/) && (
        <StyledBox top={0} left={0} py={1} px={2}>
          <BreakpointText breakpoint="xs" />
          <BreakpointText breakpoint="sm" />
          <BreakpointText breakpoint="md" />
          <BreakpointText breakpoint="lg" />
          <BreakpointText breakpoint="xl" max />
        </StyledBox>
      )}
  </React.Fragment>
)
