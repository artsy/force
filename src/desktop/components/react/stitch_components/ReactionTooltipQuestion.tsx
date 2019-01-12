import React from "react"
import { HelpIcon } from "@artsy/palette"
import { Tooltip } from "reaction/Components/Tooltip"

export const ReactionTooltipQuestion = props => {
  return (
    <Tooltip {...props}>
      <HelpIcon />
    </Tooltip>
  )
}
