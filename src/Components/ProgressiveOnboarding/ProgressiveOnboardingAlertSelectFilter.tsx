import {
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, useEffect, useRef } from "react"
import { Text } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"

export const ProgressiveOnboardingAlertSelectFilter: FC = ({ children }) => {
  const { dismiss, isDismissed, enabled } = useProgressiveOnboarding()

  const { currentlySelectedFilters } = useArtworkFilterContext()
  const initialFilterState = useRef(
    JSON.stringify(currentlySelectedFilters?.())
  )

  const isDisplayable =
    enabled &&
    isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CREATE) &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER)

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
      enabled &&
      isFilterStateChanged &&
      !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER)
    ) {
      dismiss(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER)
    }
  }, [dismiss, enabled, currentlySelectedFilters, isDismissed])

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER}
      placement="left-start"
      onClose={handleClose}
      onDismiss={handleDismiss}
      popover={<Text variant="xs">First, select the relevant filters.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
