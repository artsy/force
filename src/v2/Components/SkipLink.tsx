import React from "react"
import styled from "styled-components"
import { Text, color, space } from "@artsy/palette"

export const SkipLink: React.FC = () => {
  return (
    <Container href="#main">
      <Text variant="text">Skip to Main Content</Text>
    </Container>
  )
}

SkipLink.displayName = "SkipLink"

const Container = styled.a`
  display: block;
  position: absolute;
  top: -100%;
  left: 0;
  padding: ${space(1)}px;
  color: ${color("black100")};
  background-color: ${color("black10")};

  &:focus {
    position: relative;
    top: 0;
  }
`
