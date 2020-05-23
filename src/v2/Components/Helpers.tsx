import { css } from "styled-components"
import theme from "../Assets/Theme"

/**
 * Helper function to display an element as a block that inherits its parents width
 * @param margin value in pixels to remove from width 100%
 */
export const block = (margin: number = 0) => {
  return (props: any = {}) => {
    if (props.block) {
      return css`
        width: 100%;
        margin: 10px auto;
      `
    }
  }
}

const sizes = theme.flexboxgrid.breakpoints

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

const psizes = theme.publishing.breakpoints

type PublishingMedia = { [S in keyof typeof psizes]: typeof css }

export const pMedia: PublishingMedia = Object.keys(psizes).reduce(
  (accumulator, label) => {
    const pxSize = psizes[label]
    accumulator[label] = (strings, ...args) => css`
      @media (max-width: ${pxSize}px) {
        ${css(strings, ...args)};
      }
    `
    return accumulator
  },
  {}
) as PublishingMedia
