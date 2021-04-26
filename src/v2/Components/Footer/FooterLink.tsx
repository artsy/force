import { boxMixin, BoxProps } from "@artsy/palette"
import styled from "styled-components"
import { RouterLink, RouterLinkProps } from "v2/Artsy/Router/RouterLink"

export const FooterLink = styled(RouterLink)<RouterLinkProps & BoxProps>`
  display: flex;
  text-decoration: none;
  white-space: nowrap;
  ${boxMixin}
`
