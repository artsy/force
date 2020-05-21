import { StaticCountdownTimer } from "@artsy/palette"
import React from "react"

import { WithCurrentTime } from "v2/Components/WithCurrentTime"

export const CountdownTimer: React.SFC<{
  action: string
  note: string
  countdownStart: string
  countdownEnd: string
}> = props => (
  <WithCurrentTime syncWithServer>
    {currentTime => {
      return <StaticCountdownTimer currentTime={currentTime} {...props} />
    }}
  </WithCurrentTime>
)
