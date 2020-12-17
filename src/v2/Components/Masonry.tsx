import { Box } from "@artsy/palette"
import styled from "styled-components"
import { GridColumnGapProps, gridColumnGap, style } from "styled-system"

const columnCount = style({
  cssProperty: "columnCount",
  prop: "columnCount",
})

export const Masonry = styled(Box)<
  { columnCount?: number[] | number } & GridColumnGapProps
>`
  ${columnCount};
  ${gridColumnGap};

  > * {
    break-inside: avoid;
  }
`
