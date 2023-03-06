import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingCountsQueryRenderer,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"

interface ProgressiveOnboardingFollowArtistProps
  extends WithProgressiveOnboardingCountsProps {}

const ProgressiveOnboardingFollowArtist: FC<ProgressiveOnboardingFollowArtistProps> = ({
  counts,
  children,
}) => {
  const { dismiss, isDismissed, enabled } = useProgressiveOnboarding()

  const isDisplayable =
    enabled &&
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST) &&
    counts.followedArtists === 0

  const handleClose = useCallback(() => {
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the follow artist onboarding once you follow an artist.
    if (
      counts.followedArtists > 0 &&
      !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
    ) {
      dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
    }
  }, [
    counts.followedArtists,
    counts.initialFollowedArtists,
    dismiss,
    isDismissed,
  ])

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST}
      placement="bottom"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          <strong>Interested in this artist?</strong>
          <br />
          Follow them to get updates when new works are added.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingFollowArtistQueryRenderer: FC = ({
  children,
}) => {
  return (
    <ProgressiveOnboardingCountsQueryRenderer
      Component={ProgressiveOnboardingFollowArtist}
    >
      {children}
    </ProgressiveOnboardingCountsQueryRenderer>
  )
}
