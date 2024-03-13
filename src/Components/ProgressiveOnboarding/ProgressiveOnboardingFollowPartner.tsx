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
  PROGRESSIVE_ONBOARDING_SAVE_CHAIN,
} from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

const KEY = PROGRESSIVE_ONBOARDING.followPartner

interface ProgressiveOnboardingFollowPartnerProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingFollowPartner__: FC<ProgressiveOnboardingFollowPartnerProps> = ({
  counts,
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    // Hasn't dismissed the follow Partner onboarding.
    !isDismissed(KEY).status &&
    // Hasn't followed an partner yet.
    counts.isReady &&
    counts.followedProfiles === 0

  const handleClose = useCallback(() => {
    dismiss(KEY)
  }, [dismiss])

  useEffect(() => {
    // Dismiss the follow partner onboarding once you follow an partner.
    if (counts.followedProfiles > 0 && !isDismissed(KEY).status) {
      dismiss(KEY)

      // If you've started another onboarding chain, ensure they are dismissed.
      if (isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST_CHAIN)
      }

      if (isDismissed(PROGRESSIVE_ONBOARDING_SAVE_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_SAVE_CHAIN)
      }

      if (isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CHAIN[0]).status) {
        dismiss(PROGRESSIVE_ONBOARDING_ALERT_CHAIN)
      }
    }
  }, [counts.followedProfiles, dismiss, isDismissed])

  return (
    <ProgressiveOnboardingPopover
      name={KEY}
      visible={isDisplayable}
      placement="bottom"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          <strong>Interested in this Gallery?</strong>
          <br />
          Follow them to get updates on new shows and artworks.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingFollowPartner = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingFollowPartner__
)
