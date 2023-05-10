import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  PROGRESSIVE_ONBOARDING_ALERT_CHAIN,
  PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST,
  PROGRESSIVE_ONBOARDING_SAVE_CHAIN,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingCountsQueryRenderer,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { useRouter } from "System/Router/useRouter"
import { pathToRegexp } from "path-to-regexp"

interface ProgressiveOnboardingFollowArtistProps
  extends WithProgressiveOnboardingCountsProps {}

const ProgressiveOnboardingFollowArtist: FC<ProgressiveOnboardingFollowArtistProps> = ({
  counts,
  children,
}) => {
  const router = useRouter()

  const { dismiss, isDismissed, isEnabledFor } = useProgressiveOnboarding()

  const isDisplayable =
    // Is enabled for follows.
    isEnabledFor("follows") &&
    // Hasn't dismissed the follow artist onboarding.
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST).status &&
    // Hasn't followed an artist yet.
    counts.followedArtists === 0 &&
    // FIXME: Spot check
    // If you've already dismissed the alerts onboarding OR you're not on the artist page.
    (PROGRESSIVE_ONBOARDING_ALERT_CHAIN.every(key => isDismissed(key).status) ||
      !pathToRegexp("/artist/:artistID").test(router.match.location.pathname))

  const handleClose = useCallback(() => {
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the follow artist onboarding once you follow an artist.
    if (
      counts.followedArtists > 0 &&
      !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST).status
    ) {
      dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)

      // If you've started another onboarding chain, ensure they are dismissed.
      if (isDismissed(PROGRESSIVE_ONBOARDING_SAVE_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_SAVE_CHAIN)
      }

      if (isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_ALERT_CHAIN)
      }
    }
  }, [counts.followedArtists, dismiss, isDismissed])

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
