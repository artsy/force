import React from "react"
import { QuestionCircleIcon } from "@artsy/palette/dist/svgs/QuestionCircleIcon"
import { Tooltip } from "v2/Components/Tooltip"

export const ReactionTooltipQuestion = props => {
  return (
    <Tooltip {...props}>
      <QuestionCircleIcon />
    </Tooltip>
  )
}
