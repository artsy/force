import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import type * as React from "react"
import { NavBarMobileMenuItemButton } from "./NavBarMobileMenuItem"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"
import { useTrackingContextModule } from "./useTrackingContextModule"
import { useNavBarTracking } from "../useNavBarTracking"

export const NavBarMobileSubMenuBackButton: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const tracking = useNavBarTracking()
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
        tracking.clickedMobileSubMenuBack({ contextModule })

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
