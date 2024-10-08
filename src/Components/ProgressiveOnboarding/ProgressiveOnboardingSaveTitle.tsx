import { FC, useCallback } from "react"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

const KEY = PROGRESSIVE_ONBOARDING.saveTitle

interface ProgressiveOnboardingSaveTitleProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveTitle__: FC<ProgressiveOnboardingSaveTitleProps> = ({
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
      placement="top-end"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          Learn more about saves and how to manage your preferences.
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
