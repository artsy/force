import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  PROGRESSIVE_ONBOARDING_FIND_SAVES,
  PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingCountsQueryRenderer,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"

interface ProgressiveOnboardingFindSavesProps
  extends WithProgressiveOnboardingCountsProps {}

const ProgressiveOnboardingFindSaves: FC<ProgressiveOnboardingFindSavesProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed, isEnabledFor } = useProgressiveOnboarding()

  const isDisplayable =
    isEnabledFor("saves") &&
    counts.savedArtworks === 1 &&
    !isDismissed(PROGRESSIVE_ONBOARDING_FIND_SAVES)

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_FIND_SAVES)
  }

  const handleDismiss = () => {
    handleClose()
    dismiss(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_FIND_SAVES}
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

export const ProgressiveOnboardingFindSavesQueryRenderer: FC = ({
  children,
}) => {
  return (
    <ProgressiveOnboardingCountsQueryRenderer
      Component={ProgressiveOnboardingFindSaves}
    >
      {children}
    </ProgressiveOnboardingCountsQueryRenderer>
  )
}
