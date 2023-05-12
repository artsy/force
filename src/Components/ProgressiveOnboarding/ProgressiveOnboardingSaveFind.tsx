import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  PROGRESSIVE_ONBOARDING_SAVE_FIND,
  PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingCountsQueryRenderer,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"

interface ProgressiveOnboardingSaveFindProps
  extends WithProgressiveOnboardingCountsProps {}

const ProgressiveOnboardingSaveFind: FC<ProgressiveOnboardingSaveFindProps> = ({
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

export const ProgressiveOnboardingSaveFindQueryRenderer: FC = ({
  children,
}) => {
  return (
    <ProgressiveOnboardingCountsQueryRenderer
      Component={ProgressiveOnboardingSaveFind}
    >
      {children}
    </ProgressiveOnboardingCountsQueryRenderer>
  )
}
