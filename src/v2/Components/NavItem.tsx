import { avantgarde } from "v2/Assets/Fonts"
import * as React from "react";
import styled from "styled-components"

interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string
}

const StyledLink = styled.a`
  align-self: center;
  font-family: ${avantgarde("s13")};
  line-height: 12px;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.8;
`

const NavItem: React.SFC<NavLinkProps> = props => (
  <StyledLink href={props.href}>{props.children}</StyledLink>
)

export default NavItem
