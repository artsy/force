import { StaticCountdownTimer } from "@artsy/palette"
import * as React from "react"

import { WithCurrentTime } from "Components/WithCurrentTime"

export const CountdownTimer: React.FunctionComponent<{
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
