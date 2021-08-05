import { Box } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"

export const NavBarMobileMenuTransition = styled(Box)<{
  isOpen: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${themeGet("colors.white100")};
  overflow-x: hidden;
  transition: transform 150ms, opacity 150ms;

  ${({ isOpen }) =>
    isOpen
      ? css`
          z-index: 1;
          transform: translate3d(0, 0, 0);
          opacity: 1;
        `
      : css`
          z-index: 0;
          transform: translate3d(100%, 0, 0);
          opacity: 0;
        `}
`
