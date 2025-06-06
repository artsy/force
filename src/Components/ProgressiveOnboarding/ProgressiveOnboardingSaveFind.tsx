import { useDismissibleContext } from "@artsy/dismissible"
import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import {
  type WithProgressiveOnboardingCountsProps,
  withProgressiveOnboardingCounts,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import type { FC } from "react"

const ALERTS = {
  saveFind: PROGRESSIVE_ONBOARDING.saveFind,
  saveHighlight: PROGRESSIVE_ONBOARDING.saveHighlight,
}

interface ProgressiveOnboardingSaveFindProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveFind__: FC<
  React.PropsWithChildren<ProgressiveOnboardingSaveFindProps>
> = ({ children, counts }) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    counts.savedArtworks === 1 && !isDismissed(ALERTS.saveFind).status

  const handleClose = () => {
    dismiss(ALERTS.saveFind)
  }

  const handleDismiss = () => {
    handleClose()
    dismiss(ALERTS.saveHighlight)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={ALERTS.saveFind}
      placement="bottom-end"
      onClose={handleClose}
      onDismiss={handleDismiss}
      ignoreClickOutside={false}
      zIndex={Z.dropdown}
      popover={<Text variant="xs">Find and edit all your Saves here.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingSaveFind = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingSaveFind__,
)
