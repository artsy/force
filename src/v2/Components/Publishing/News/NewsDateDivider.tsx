import { pMedia } from "v2/Components/Helpers"
import React from "react"
import styled from "styled-components"
import { NewsDateHeader } from "./NewsDateHeader"

interface Props {
  date?: string
}

export const NewsDateDivider: React.SFC<Props> = props => {
  const { date } = props

  return (
    <NewsDateDividerContainer>
      {date && <NewsDateHeader date={date} />}
    </NewsDateDividerContainer>
  )
}

const NewsDateDividerContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
  ${pMedia.sm`
    margin-top: 40px;
`};
`
