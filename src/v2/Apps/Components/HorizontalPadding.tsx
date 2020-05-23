import { media, space } from "@artsy/palette"
import styled, { css } from "styled-components"
import { SpaceProps } from "styled-system"

export interface HorizontalPaddingProps {
  px?: SpaceProps["px"]
}

export const HorizontalPadding = styled.div<HorizontalPaddingProps>`
  ${p =>
    media.xs`
      padding-right: ${(p.px[0] && space(p.px[0])) || 0}px;
      padding-left: ${(p.px[0] && space(p.px[0])) || 0}px;
    `};
  ${p =>
    p.px[1] &&
    css`
      padding-right: ${space(p.px[1])}px;
      padding-left: ${space(p.px[1])}px;
    `};
  margin-right: auto;
  margin-left: auto;
`

HorizontalPadding.defaultProps = {
  px: [2, 4],
}
