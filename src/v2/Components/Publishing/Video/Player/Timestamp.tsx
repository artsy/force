import { garamond } from "v2/Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { formatTime } from "../../Constants"

interface Props extends React.HTMLProps<HTMLDivElement> {
  duration: number
  currentTime: number
}

const TimestampComponent: React.SFC<Props> = props => {
  const { className, currentTime, duration } = props

  return (
    <div className={className}>
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  )
}

export const Timestamp = styled(TimestampComponent)`
  ${garamond("s23")};
`
