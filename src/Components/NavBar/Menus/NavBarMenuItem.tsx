import { Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import { RouterLink } from "System/Components/RouterLink"

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
`

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
