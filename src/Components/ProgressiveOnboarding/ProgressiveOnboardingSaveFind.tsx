import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  PROGRESSIVE_ONBOARDING_SAVE_FIND,
  PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"

interface ProgressiveOnboardingSaveFindProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingSaveFind__: FC<ProgressiveOnboardingSaveFindProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed } = useProgressiveOnboarding()

  const isDisplayable =
    counts.savedArtworks === 1 &&
    !isDismissed(PROGRESSIVE_ONBOARDING_SAVE_FIND).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_SAVE_FIND)
  }

  const handleDismiss = () => {
    handleClose()
    dismiss(PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_SAVE_FIND}
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
  __ProgressiveOnboardingSaveFind__
)
