import { Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type * as React from "react"
import styled from "styled-components"

export const NavBarSkipLink: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Container href="#main">
      <Text variant="sm">Skip to Main Content</Text>
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
  color: ${themeGet("colors.mono100")};
  background-color: ${themeGet("colors.mono10")};

  &:focus {
    position: relative;
    top: 0;
  }
`
