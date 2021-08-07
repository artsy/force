import { Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"

const navBarMobileMenuItemMixin = css`
  align-items: center;
  background-color: ${themeGet("colors.white100")};
  transition: background-color 150ms;
  text-decoration: none;
  user-select: none;

  &:active {
    background-color: ${themeGet("colors.black15")};
  }
`

export const NavBarMobileMenuItemButton = styled(Clickable)`
  ${navBarMobileMenuItemMixin}
`

NavBarMobileMenuItemButton.defaultProps = {
  display: "flex",
  py: 1,
  px: 2,
  color: "black60",
  width: "100%",
}

export const NavBarMobileMenuItemLink = styled(RouterLink)`
  ${navBarMobileMenuItemMixin}
`

NavBarMobileMenuItemLink.defaultProps = {
  display: "flex",
  py: 1,
  px: 2,
  color: "black60",
  width: "100%",
}
