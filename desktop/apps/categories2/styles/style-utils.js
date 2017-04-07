import { css } from 'styled-components'

export const media = {
  mobile: (...args) => css`
    @media (min-width: 700px) {
      ${ css(...args) }
    }
  `
}
