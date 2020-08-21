import React from "react"
import styled from "styled-components"
import { Text } from "@artsy/palette/dist/elements/Text"
import { space } from "@artsy/palette/dist/helpers/space"
import { color } from "@artsy/palette/dist/helpers/color"

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

export const NavBarSkipLink: React.FC = () => {
  return (
    <Container href="#main">
      <Text variant="text">Skip to Main Content</Text>
    </Container>
  )
}

NavBarSkipLink.displayName = "NavBarSkipLink"
