import styled from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { color } from "@artsy/palette"

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
    color: ${color("black60")};
  }
`
