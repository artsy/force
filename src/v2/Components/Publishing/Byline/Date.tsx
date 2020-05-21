import { Sans, SansSize } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { getDate } from "../Constants"
import { BylineLayout, DateFormat } from "../Typings"

interface DateProps {
  date?: string
  format?: DateFormat
  layout?: BylineLayout
  size?: SansSize
}

export const Date: React.SFC<DateProps> = props => {
  const { date, format, layout, size } = props
  const condensed = layout === "condensed"
  const dateFormat = format || (condensed ? "condensed" : "default")
  const fontSize = size ? size : condensed ? "2" : "3t"

  return (
    <DateContainer condensed={condensed}>
      <Sans size={fontSize} weight="medium">
        {getDate(date, dateFormat)}
      </Sans>
    </DateContainer>
  )
}

export const DateContainer = styled.div.attrs<{ condensed?: boolean }>({})`
  margin: 5px 20px 0 0;
  white-space: nowrap;
`
