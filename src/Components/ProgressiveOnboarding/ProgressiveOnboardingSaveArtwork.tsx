import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  PROGRESSIVE_ONBOARDING_ALERT_CHAIN,
  PROGRESSIVE_ONBOARDING_FOLLOW_CHAIN,
  PROGRESSIVE_ONBOARDING_SAVE_ARTWORK,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useFeatureFlag } from "System/useFeatureFlag"

interface ProgressiveOnboardingSaveArtworkProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveArtwork__: FC<ProgressiveOnboardingSaveArtworkProps> = ({
  counts,
  children,
}) => {
  const { dismiss, isDismissed } = useProgressiveOnboarding()
  const isPartnerOfferEnabled = useFeatureFlag(
    "emerald_partner-offers-from-saves"
  )

  const isDisplayble =
    !isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK).status &&
    counts.isReady &&
    counts.savedArtworks === 0

  const handleClose = useCallback(() => {
    dismiss(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the save artwork onboarding once you save an artwork.
    if (
      counts.savedArtworks > 0 &&
      !isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK).status
    ) {
      dismiss(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)

      // If you've started another onboarding chain, ensure they are dismissed.
      if (isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_CHAIN)
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
      name={PROGRESSIVE_ONBOARDING_SAVE_ARTWORK}
      placement="bottom"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          <strong>Like what you see?</strong>
          <br />
          {isPartnerOfferEnabled ? (
            <>
              Tap the heart to save an artwork
              <br />
              and signal your interest to galleries.
            </>
          ) : (
            <>Hit the heart to save an artwork.</>
          )}
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
