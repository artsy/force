import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import type * as React from "react"
import { useTracking } from "react-tracking"
import { NavBarMobileMenuItemButton } from "./NavBarMobileMenuItem"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"
import { useTrackingContextModule } from "./useTrackingContextModule"

export const NavBarMobileSubMenuBackButton: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { trackEvent } = useTracking()
  const { pop } = useNavBarMobileMenuNavigation()
  const contextModule = useTrackingContextModule()

  return (
    <NavBarMobileMenuItemButton
      width={60}
      height={60}
      display="flex"
      py={0}
      px={0}
      aria-label="Back"
      onClick={() => {
        trackEvent({
          action_type: DeprecatedAnalyticsSchema.ActionType.Click,
          context_module: contextModule,
          flow: "Header",
          subject: "Back link",
        })

        pop()
      }}
    >
      <ChevronLeftIcon
        fill="mono100"
        height={14}
        width={14}
        m="auto"
        aria-hidden
      />
    </NavBarMobileMenuItemButton>
  )
}
