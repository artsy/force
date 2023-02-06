import { Box, Tooltip, TooltipProps } from "@artsy/palette"
import { FC } from "react"

type ProgressiveOnboardingTooltipProps = Omit<TooltipProps, "children">

export const ProgressiveOnboardingTooltip: FC<ProgressiveOnboardingTooltipProps> = ({
  content,
  ...rest
}) => {
  return (
    <Tooltip content={content} variant="defaultDark" pointer {...rest}>
      <Box width="100%" height="100%" />
    </Tooltip>
  )
}
