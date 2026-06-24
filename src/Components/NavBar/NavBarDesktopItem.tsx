import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import type { NavigationData } from "System/Contexts/NavigationDataContext"
import type * as React from "react"
import styled from "styled-components"
import { NavBarDropdownPanel } from "./NavBarDropdownPanel"
import { NavBarItemLink } from "./NavBarItem"
import type { NavItem, NavItemId } from "./navItems"

// Hide these links earlier to ensure "Collecting 101" has space on smaller widths.
const NavBarItemFairsLink = styled(NavBarItemLink)`
  @media (max-width: 1000px) {
    display: none;
  }
`
const NavBarItemInstitutionsLink = styled(NavBarItemLink)`
  // Can no longer fit on screen @ 900px
  @media (max-width: 900px) {
    display: none;
  }
`

// Links that collapse at wider breakpoints; all others use NavBarItemLink.
const DESKTOP_LINK_COMPONENT: Partial<
  Record<NavItemId, typeof NavBarItemLink>
> = {
  fairs: NavBarItemFairsLink,
  museums: NavBarItemInstitutionsLink,
}

interface NavBarDesktopItemProps {
  item: NavItem
  navigationData: NavigationData | null
  handleClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export const NavBarDesktopItem: React.FC<NavBarDesktopItemProps> = ({
  item,
  navigationData,
  handleClick,
}) => {
  const { prefetch } = usePrefetchRoute()

  if (item.type === "dropdown") {
    const navigationVersion = navigationData?.[item.navigationKey]

    if (!navigationVersion) {
      return null
    }

    return (
      <NavBarDropdownPanel
        navigationData={navigationVersion}
        label={item.label}
        href={item.href}
        contextModule={item.contextModule}
        menuType={item.menuType}
        handleClick={handleClick}
      />
    )
  }

  const LinkComponent =
    DESKTOP_LINK_COMPONENT[item.id as NavItemId] ?? NavBarItemLink

  return (
    <LinkComponent
      href={item.href}
      data-label={item.dataLabel ?? item.label}
      textDecoration="none"
      onClick={handleClick}
      onMouseOver={item.prefetch ? () => prefetch(item.href) : undefined}
    >
      {item.label}
    </LinkComponent>
  )
}
