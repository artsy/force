import React from "react"
import styled from "styled-components"
import { Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"

export const NavBarSkipLink: React.FC = () => {
  return (
    <Container href="#main">
      <Text variant="text">Skip to Main Content</Text>
    </Container>
  )
}

NavBarSkipLink.displayName = "NavBarSkipLink"

const Container = styled.a`
  display: block;
  position: absolute;
  top: -100%;
  left: 0;
  padding: ${themeGet("space.1")};
  color: ${themeGet("color.black100")};
  background-color: ${themeGet("color.black10")};

  &:focus {
    position: relative;
    top: 0;
  }
`
