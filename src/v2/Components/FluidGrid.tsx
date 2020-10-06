import React from "react"
import styled from "styled-components"
import { Box, BoxProps, CSSGrid } from "@artsy/palette"
import {
  GridColumnProps,
  ResponsiveValue,
  gridColumn,
  system,
} from "styled-system"

/**
 * A 12-column fluid grid. Collapses to a single column at mobile breakpoints.
 */
export const Grid = styled(CSSGrid)``

Grid.defaultProps = {
  gridColumnGap: 2,
  gridRowGap: 2,
  gridTemplateColumns: "repeat(12, 1fr)",
}

const colSpan = system({
  span: {
    property: "gridColumn",
    transform: value => value && `span ${value}`,
  },
})

type ColSpanProps = { span?: ResponsiveValue<number> } & GridColumnProps

const __Col__ = styled(Box)<ColSpanProps>`
  ${colSpan}
  ${gridColumn}
  outline: 1px dotted red;
`

export const Col: React.FC<BoxProps & ColSpanProps> = ({ span, ...rest }) => {
  if (typeof span === "number") {
    return (
      <__Col__
        span={[undefined, span]}
        gridColumn={["1 / -1", undefined]}
        {...rest}
      />
    )
  }

  return <__Col__ span={span} {...rest} />
}

/**
 * Utility for breaking after a non full-width column.
 * Fills until the end of the row.
 */
export const Break = styled(Col)``

Break.defaultProps = {
  display: ["none", "block"],
  gridColumn: "auto / -1",
}
