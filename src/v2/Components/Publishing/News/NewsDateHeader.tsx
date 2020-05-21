import { unica } from "v2/Assets/Fonts"
import { pMedia } from "v2/Components/Helpers"
import React from "react"
import styled from "styled-components"
import { getDate } from "../Constants"

interface Props {
  date: string
}

export const NewsDateHeader: React.SFC<Props> = props => {
  const { date } = props

  return <NewsText>{getDate(date, "news")}</NewsText>
}

export const NewsText = styled.div`
  ${unica("s25", "medium")};
  ${pMedia.sm`
    ${unica("s16", "medium")}
  `};
`
