import { FC, useCallback } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"
import { t } from "i18next"

const ALERT_ID = PROGRESSIVE_ONBOARDING_ALERTS.saveTitle

interface ProgressiveOnboardingSaveTitleProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveTitle__: FC<ProgressiveOnboardingSaveTitleProps> = ({
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayble = !isDismissed(ALERT_ID).status

  const handleClose = useCallback(() => {
    dismiss(ALERT_ID)
  }, [dismiss])

  if (!isDisplayble) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={ALERT_ID}
      placement="top-end"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          <>{t("collectorSaves.artworkListsHeader.curateYourList")}</>
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingSaveTitle = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingSaveTitle__
)
