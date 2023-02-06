import { FC } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/Components/ProgressiveOnboardingPopover"

export const ProgressiveOnboardingUserProfile: FC = () => {
  return (
    <ProgressiveOnboardingPopover
      name="UserProfile"
      placement="bottom-end"
      popover={<Text variant="xs">Find and edit all your Saves here.</Text>}
    />
  )
}
