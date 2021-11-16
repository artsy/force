import { keyframes } from "styled-components"

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

export const growAndFadeIn = height => keyframes`
  from {
    opacity: 0;
    height: 0;
  }

  to {
    opacity: 1;
    height: ${height};
  }
`

export const shrinkAndFadeOut = height => keyframes`
  from {
    opacity: 1;
    height: ${height};
  }

  to {
    opacity: 0;
    height: 0;
  }
`
