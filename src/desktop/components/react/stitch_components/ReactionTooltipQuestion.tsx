import React from "react"
import { HelpIcon } from "@artsy/palette"
import { Tooltip } from "v2/Components/Tooltip"

export const ReactionTooltipQuestion = props => {
  return (
    // @ts-expect-error STRICT_NULL_CHECK
    <Tooltip {...props}>
      <HelpIcon />
    </Tooltip>
  )
}
