import { FC, useCallback, useEffect } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useDismissibleContext } from "@artsy/dismissible"
import {
  PROGRESSIVE_ONBOARDING_ALERTS,
  PROGRESSIVE_ONBOARDING_ALERT_CHAIN,
  PROGRESSIVE_ONBOARDING_FOLLOW_CHAIN,
} from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"

const ALERT_ID = PROGRESSIVE_ONBOARDING_ALERTS.saveArtwork

interface ProgressiveOnboardingSaveArtworkProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveArtwork__: FC<ProgressiveOnboardingSaveArtworkProps> = ({
  counts,
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()
  const isPartnerOfferEnabled = useFeatureFlag(
    "emerald_partner-offers-from-saves"
  )

  const isDisplayble =
    !isDismissed(ALERT_ID).status &&
    counts.isReady &&
    counts.savedArtworks === 0

  const handleClose = useCallback(() => {
    dismiss(ALERT_ID)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the save artwork onboarding once you save an artwork.
    if (counts.savedArtworks > 0 && !isDismissed(ALERT_ID).status) {
      dismiss(ALERT_ID)

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
      name={ALERT_ID}
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
