import { Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Components/RouterLink"
import styled, { css } from "styled-components"

const navBarMenuItemMixin = css`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;

  &:hover {
    background-color: ${themeGet("colors.mono5")};
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
