import { Box, media, space } from "@artsy/palette"
import styled, { css } from "styled-components"
import { SpaceProps } from "styled-system"

export interface HorizontalPaddingProps {
  px?: SpaceProps["px"]
}

export const HorizontalPadding = styled(Box)<HorizontalPaddingProps>`
  ${p =>
    media.xs`
      padding-right: ${
        // @ts-expect-error STRICT_NULL_CHECK
        (p.px[0] && space(p.px[0])) || 0
      }px;
      padding-left: ${
        // @ts-expect-error STRICT_NULL_CHECK
        (p.px[0] && space(p.px[0])) || 0
      }px;
    `};
  ${p =>
    // @ts-expect-error STRICT_NULL_CHECK
    p.px[1] &&
    css`
      padding-right: ${// @ts-expect-error STRICT_NULL_CHECK
      space(p.px[1])}px;
      padding-left: ${// @ts-expect-error STRICT_NULL_CHECK
      space(p.px[1])}px;
    `};
  margin-right: auto;
  margin-left: auto;
`

HorizontalPadding.defaultProps = {
  px: [2, 4],
}
