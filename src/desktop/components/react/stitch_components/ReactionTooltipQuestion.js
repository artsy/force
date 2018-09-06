import React from 'react'
import { Help } from 'reaction/Assets/Icons/Help'
import { Tooltip } from 'reaction/Components/Tooltip'

export const ReactionTooltipQuestion = props => {
  return (
    <Tooltip {...props}>
      <Help />
    </Tooltip>
  )
}
