import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useRouter } from "System/Hooks/useRouter"
import { pathToRegexp } from "path-to-regexp"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDismissibleContext } from "@artsy/dismissible"
import {
  PROGRESSIVE_ONBOARDING,
  PROGRESSIVE_ONBOARDING_ALERT_CHAIN,
  PROGRESSIVE_ONBOARDING_SAVE_CHAIN,
} from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

const KEY = PROGRESSIVE_ONBOARDING.followArtist
interface ProgressiveOnboardingFollowArtistProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingFollowArtist__: FC<ProgressiveOnboardingFollowArtistProps> = ({
  counts,
  children,
}) => {
  const router = useRouter()
  const { isLoggedIn } = useSystemContext()

  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    // Hasn't dismissed the follow artist onboarding.
    !isDismissed(KEY).status &&
    // Hasn't followed an artist yet.
    counts.isReady &&
    counts.followedArtists === 0 &&
    // If you've already dismissed the alerts onboarding OR you're logged out OR you're not on the artist page.
    (!isLoggedIn ||
      PROGRESSIVE_ONBOARDING_ALERT_CHAIN.every(
        key => isDismissed(key).status
      ) ||
      !pathToRegexp("/artist/:artistID").test(router.match.location.pathname))

  const handleClose = useCallback(() => {
    dismiss(KEY)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the follow artist onboarding once you follow an artist.
    if (counts.followedArtists > 0 && !isDismissed(KEY).status) {
      dismiss(KEY)

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
      name={KEY}
      placement="bottom-start"
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
