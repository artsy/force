import { Box } from "@artsy/palette"
import styled, { StyledComponentClass } from "styled-components"
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

export const Masonry = styled(Box)<
  { columnCount?: number[] | number } & GridColumnGapProps
>`
  ${compose(columnCount, gridColumnGap)};

  * {
    break-inside: avoid;
  }
` as StyledComponentClass<any, any>

Masonry.defaultProps = {
  gridColumnGap: 2,
}
