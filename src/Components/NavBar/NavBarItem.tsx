import { Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import { RouterUnawareLink } from "System/Components/RouterLink"

const navBarItemMixin = css<{ active?: boolean }>`
  position: relative;
  height: 100%;
  align-items: center;
  color: ${themeGet("colors.black100")};
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;

  ${props =>
    props.active &&
    css`
      color: ${themeGet("colors.blue100")};
    `}

  &:hover {
    color: ${themeGet("colors.blue100")};
  }
`

// NOTE: Found's `Link` doesn't forward its ref, which is necessary for the UI.
export const NavBarItemLink = styled(RouterUnawareLink)`
  ${navBarItemMixin}
`

NavBarItemLink.defaultProps = {
  display: "flex",
  px: 1,
}

export const NavBarItemButton = styled(Clickable)`
  ${navBarItemMixin}
`

NavBarItemButton.defaultProps = {
  display: "flex",
  px: 1,
}

export const NavBarItemUnfocusableAnchor = styled(RouterUnawareLink)`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

NavBarItemUnfocusableAnchor.defaultProps = {
  role: "presentation",
  tabIndex: -1,
}
