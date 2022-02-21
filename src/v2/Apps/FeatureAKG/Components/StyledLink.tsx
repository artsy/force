import { RouterLink } from "v2/System/Router/RouterLink"
import styled, { StyledComponentClass } from "styled-components"

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
  }
` as StyledComponentClass<any, any>
