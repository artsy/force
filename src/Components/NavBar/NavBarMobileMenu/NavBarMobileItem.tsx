import { Separator } from "@artsy/palette"
import type { NavigationData } from "System/Contexts/NavigationDataContext"
import type * as React from "react"
import {
  MOBILE_EMPHASIZED,
  NAV_ITEMS,
  type NavItemId,
  SEPARATOR,
} from "../navItems"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"
import { NavBarMobileSubMenu } from "./NavBarMobileSubMenu"

interface NavBarMobileItemProps {
  entry: NavItemId | typeof SEPARATOR
  navigationData?: NavigationData | null
  handleClick: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
  ) => void
}

export const NavBarMobileItem: React.FC<NavBarMobileItemProps> = ({
  entry,
  navigationData,
  handleClick,
}) => {
  if (entry === SEPARATOR) {
    return <Separator my={1} />
  }

  const item = NAV_ITEMS[entry]

  if (item.type === "dropdown") {
    const navigationVersion = navigationData?.[item.navigationKey]

    if (!navigationVersion) {
      return null
    }

    return (
      <NavBarMobileSubMenu
        navigationVersion={navigationVersion}
        menuType={item.menuType}
      >
        {item.label}
      </NavBarMobileSubMenu>
    )
  }

  return (
    <NavBarMobileMenuItemLink
      to={item.href}
      color={MOBILE_EMPHASIZED.includes(entry) ? "mono100" : undefined}
      onClick={handleClick}
    >
      {item.label}
    </NavBarMobileMenuItemLink>
  )
}
