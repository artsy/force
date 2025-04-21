import { Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Components/RouterLink"
import styled, { css } from "styled-components"

const navBarMobileMenuItemMixin = css`
  align-items: center;
  transition: background-color 150ms;
  text-decoration: none;
  user-select: none;

  &:active {
    background-color: ${themeGet("colors.mono15")};
  }
`

export const NavBarMobileMenuItemButton = styled(Clickable)`
  ${navBarMobileMenuItemMixin}
`

NavBarMobileMenuItemButton.defaultProps = {
  display: "flex",
  py: 1,
  px: 2,
  bg: "mono0",
  color: "mono60",
  width: "100%",
}

export const NavBarMobileMenuItemLink = styled(RouterLink)`
  ${navBarMobileMenuItemMixin}
`

NavBarMobileMenuItemLink.defaultProps = {
  display: "flex",
  py: 1,
  px: 2,
  bg: "mono0",
  color: "mono60",
  width: "100%",
}
