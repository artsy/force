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
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useRouter } from "System/Router/useRouter"
import { pathToRegexp } from "path-to-regexp"

interface ProgressiveOnboardingFollowArtistProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingFollowArtist__: FC<ProgressiveOnboardingFollowArtistProps> = ({
  counts,
  children,
}) => {
  const router = useRouter()

  const { dismiss, isDismissed } = useProgressiveOnboarding()

  const hasNotDismissed = !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
    .status
  const countsReady = counts.isReady
  const zeroFollows = counts.followedArtists === 0

  const dismissedAll = PROGRESSIVE_ONBOARDING_ALERT_CHAIN.every(
    key => isDismissed(key).status
  )

  const notArtistPage = !pathToRegexp("/artist/:artistID").test(
    router.match.location.pathname
  )

  const isDisplayable =
    // Hasn't dismissed the follow artist onboarding.
    hasNotDismissed &&
    // Hasn't followed an artist yet.
    countsReady &&
    zeroFollows &&
    // If you've already dismissed the alerts onboarding OR you're not on the artist page.
    (dismissedAll || notArtistPage)

  console.log({
    countsReady,
    dismissedAll,
    hasNotDismissed,
    notArtistPage,
    zeroFollows,
  })

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

export const ProgressiveOnboardingFollowArtist = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingFollowArtist__
)
