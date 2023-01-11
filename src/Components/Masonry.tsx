import { Box } from "@artsy/palette"
import styled from "styled-components"
import {
  compose,
  gridColumnGap,
  GridColumnGapProps,
  style,
} from "styled-system"

const columnCount = style({
  prop: "columnCount",
  cssProperty: "columnCount",
})

export interface MasonryProps extends GridColumnGapProps {
  columnCount?: number[] | number
}

/**
 * @deprecated in favor of ArtworkGrid (src/Components/ArtworkGrid/ArtworkGrid.tsx)
 */
export const Masonry = styled(Box)<MasonryProps>`
  ${compose(columnCount, gridColumnGap)};

  * {
    break-inside: avoid;
  }
`

Masonry.defaultProps = {
  gridColumnGap: 2,
}
