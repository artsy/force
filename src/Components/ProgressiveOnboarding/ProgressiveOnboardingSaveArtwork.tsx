import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useDismissibleContext } from "@artsy/dismissible"
import {
  PROGRESSIVE_ONBOARDING,
  PROGRESSIVE_ONBOARDING_ALERT_CHAIN,
  PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST_CHAIN,
} from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

const KEY = PROGRESSIVE_ONBOARDING.saveArtwork

interface ProgressiveOnboardingSaveArtworkProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveArtwork__: FC<ProgressiveOnboardingSaveArtworkProps> = ({
  counts,
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayble =
    !isDismissed(KEY).status && counts.isReady && counts.savedArtworks === 0

  const handleClose = useCallback(() => {
    dismiss(KEY)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the save artwork onboarding once you save an artwork.
    if (counts.savedArtworks > 0 && !isDismissed(KEY).status) {
      dismiss(KEY)

      // If you've started another onboarding chain, ensure they are dismissed.
      if (isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST_CHAIN)
      }

      if (isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_ALERT_CHAIN)
      }
    }
  }, [counts.savedArtworks, dismiss, isDismissed])

  if (!isDisplayble) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={KEY}
      placement="bottom"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          <strong>Like what you see?</strong>
          <br />
          Tap the heart to save an artwork
          <br />
          and signal your interest to galleries.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingSaveArtwork = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingSaveArtwork__
)
