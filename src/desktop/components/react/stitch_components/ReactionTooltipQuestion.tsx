import { HelpIcon } from "@artsy/palette"
import { Tooltip } from "v2/Components/Tooltip"

export const ReactionTooltipQuestion = props => {
  return (
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    <Tooltip {...props}>
      <HelpIcon />
    </Tooltip>
  )
}
