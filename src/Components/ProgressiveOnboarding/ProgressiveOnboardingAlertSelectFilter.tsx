import {
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode, useEffect, useRef } from "react"
import { Position, Text } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"

interface ProgressiveOnboardingAlertSelectFilterProps {
  children: ReactNode
  placement?: Position
}

export const ProgressiveOnboardingAlertSelectFilter: FC<ProgressiveOnboardingAlertSelectFilterProps> = ({
  children,
  placement = "left-start",
}) => {
  const { dismiss, isDismissed } = useProgressiveOnboarding()

  const { currentlySelectedFilters } = useArtworkFilterContext()
  const initialFilterState = useRef(
    JSON.stringify(currentlySelectedFilters?.())
  )

  const isDisplayable =
    isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CREATE).status &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER)
  }

  const handleDismiss = () => {
    handleClose()
  }

  useEffect(() => {
    const isFilterStateChanged =
      initialFilterState.current !==
      JSON.stringify(currentlySelectedFilters?.())

    if (
      isFilterStateChanged &&
      !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER).status
    ) {
      dismiss(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER)
    }
  }, [dismiss, currentlySelectedFilters, isDismissed])

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER}
      placement={placement}
      onClose={handleClose}
      onDismiss={handleDismiss}
      popover={<Text variant="xs">First, select the relevant filters.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
