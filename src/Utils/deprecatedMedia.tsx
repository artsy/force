import { css } from "styled-components"

// This is way old, pre palette v1.
const sizes = {
  xs: 768,
  sm: 900,
  md: 1024,
  lg: 1192,
}

type Media = { [S in keyof typeof sizes]: typeof css }

/**
 * @deprecated import { media } from `Styleguide/Elements/Grid` instead
 */
export const media: Media = Object.keys(sizes).reduce((accumulator, label) => {
  // using px in breakpoints to maintain uniform units with flexbox-grid
  // https://zellwk.com/blog/media-query-units/
  const pxSize = sizes[label]
  accumulator[label] = (strings, ...args) => css`
    @media (max-width: ${pxSize}px) {
      ${css(strings, ...args)};
    }
  `
  return accumulator
}, {}) as Media
