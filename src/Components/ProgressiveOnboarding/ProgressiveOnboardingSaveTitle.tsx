import { useDismissibleContext } from "@artsy/dismissible"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import {
  type WithProgressiveOnboardingCountsProps,
  withProgressiveOnboardingCounts,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { type FC, useCallback } from "react"

const KEY = PROGRESSIVE_ONBOARDING.saveTitle

interface ProgressiveOnboardingSaveTitleProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveTitle__: FC<
  React.PropsWithChildren<ProgressiveOnboardingSaveTitleProps>
> = ({ children }) => {
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
  __ProgressiveOnboardingSaveTitle__,
)
