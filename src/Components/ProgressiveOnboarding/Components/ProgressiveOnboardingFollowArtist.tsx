import { FC } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/Components/ProgressiveOnboardingPopover"

export const ProgressiveOnboardingFollowArtist: FC = () => {
  return (
    <ProgressiveOnboardingPopover
      name="FollowArtist"
      placement="bottom"
      popover={
        <Text variant="xs">
          <strong>Interested in this artist?</strong>
          <br />
          Follow them to get updates when new works are added.
        </Text>
      }
    />
  )
}
