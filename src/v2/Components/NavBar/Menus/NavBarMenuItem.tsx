import { Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled, { css, StyledComponentClass } from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"

const navBarMenuItemMixin = css`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`

export const NavBarMenuItemLink = styled(RouterLink)`
  ${navBarMenuItemMixin}
` as StyledComponentClass<any, any>

NavBarMenuItemLink.defaultProps = {
  py: 1,
  px: 2,
}

export const NavBarMenuItemButton = styled(Clickable)`
  ${navBarMenuItemMixin}
`

NavBarMenuItemButton.defaultProps = {
  py: 1,
  px: 2,
}
