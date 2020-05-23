import React from "react"
import { HelpIcon } from "@artsy/palette"
import { Tooltip } from "v2/Components/Tooltip"

export const ReactionTooltipQuestion = props => {
  return (
    <Tooltip {...props}>
      <HelpIcon />
    </Tooltip>
  )
}
