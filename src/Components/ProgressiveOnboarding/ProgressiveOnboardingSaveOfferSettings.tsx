import { FC, useCallback } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

const KEY = PROGRESSIVE_ONBOARDING.saveOfferSettings

interface ProgressiveOnboardingSaveOfferSettingsProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveOfferSettings__: FC<React.PropsWithChildren<ProgressiveOnboardingSaveOfferSettingsProps>> = ({
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayble = !isDismissed(KEY).status

  const handleClose = useCallback(() => {
    dismiss(KEY)
  }, [dismiss])

  if (!isDisplayble) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={KEY}
      placement="bottom-start"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          Edit list settings to indicate to galleries which artworks you want to
          receive offers on.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingSaveOfferSettings = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingSaveOfferSettings__
)
