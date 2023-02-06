import { FC } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/Components/ProgressiveOnboardingPopover"

export const ProgressiveOnboardingSaveArtwork: FC = () => {
  return (
    <ProgressiveOnboardingPopover
      name="SaveArtwork"
      placement="top"
      popover={
        <Text variant="xs">
          <strong>Like what you see?</strong>
          <br />
          Hit the heart to save an artwork.
        </Text>
      }
    />
  )
}
