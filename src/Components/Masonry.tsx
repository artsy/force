import { Box } from "@artsy/palette"
import styled from "styled-components"
import {
  GridColumnGapProps,
  gridColumnGap,
  style,
  compose,
} from "styled-system"

const columnCount = style({
  prop: "columnCount",
  cssProperty: "columnCount",
})

export interface MasonryProps extends GridColumnGapProps {
  columnCount?: number[] | number
}

export const Masonry = styled(Box)<MasonryProps>`
  ${compose(columnCount, gridColumnGap)};

  * {
    break-inside: avoid;
  }
`

Masonry.defaultProps = {
  gridColumnGap: 2,
}
