import { useDismissibleContext } from "@artsy/dismissible"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import {
  type WithProgressiveOnboardingCountsProps,
  withProgressiveOnboardingCounts,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { FC } from "react"

const KEY = PROGRESSIVE_ONBOARDING.alertCreate

interface ProgressiveOnboardingAlertCreateSimpleProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingAlertCreateSimple__: FC<
  React.PropsWithChildren<ProgressiveOnboardingAlertCreateSimpleProps>
> = ({ children, counts }) => {
  const { isLoggedIn } = useSystemContext()

  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    isLoggedIn &&
    !isDismissed(KEY).status &&
    counts.isReady &&
    counts.savedSearches === 0

  const handleClose = () => {
    dismiss(KEY)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={KEY}
      ignoreClickOutside
      placement="left"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          Create an alert for similar works by this artist.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingAlertCreateSimple =
  withProgressiveOnboardingCounts(__ProgressiveOnboardingAlertCreateSimple__)
