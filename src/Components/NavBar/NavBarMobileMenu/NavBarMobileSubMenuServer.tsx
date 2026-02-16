import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Flex, Separator, Text } from "@artsy/palette"
import type * as React from "react"
import { useEffect, useRef } from "react"
import { graphql, useFragment } from "react-relay"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { NavBarMobileSubMenuBackButton } from "./NavBarMobileSubMenuBackButton"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import { useTrackingContextModule } from "./useTrackingContextModule"
import type { NavBarMobileSubMenuServer_navigationVersion$key } from "__generated__/NavBarMobileSubMenuServer_navigationVersion.graphql"
import { useNavBarTracking } from "../useNavBarTracking"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

interface NavBarMobileSubMenuServerProps {
  navigationVersion: NavBarMobileSubMenuServer_navigationVersion$key
  menuType: "whatsNew" | "artists" | "artworks"
  level?: number
}

export const NavBarMobileSubMenuServer: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuServerProps>
> = ({
  children,
  navigationVersion: navigationVersionProp,
  menuType,
  level = 0,
}) => {
  const navigationVersion = useFragment(
    NAVIGATION_VERSION_FRAGMENT,
    navigationVersionProp,
  )

  if (!navigationVersion?.items) {
    return null
  }

  return (
    <NavBarMobileSubMenuDrilldown
      title={children?.toString() || ""}
      navigationData={navigationVersion}
      menuType={menuType}
      level={level}
    />
  )
}

interface NavBarMobileSubMenuDrilldownProps {
  title: string
  navigationData: any // Plain unwrapped data
  menuType: "whatsNew" | "artists" | "artworks"
  level: number
}

const NavBarMobileSubMenuDrilldown: React.FC<
  NavBarMobileSubMenuDrilldownProps
> = ({ title, navigationData, menuType, level }) => {
  const tracking = useNavBarTracking()
  const { path, push } = useNavBarMobileMenuNavigation()
  const contextModule = useTrackingContextModule()

  const hasTrackedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  // Check if this menu is open by matching title at the correct level
  const isOpen = path?.[level] === title

  // Track when drilldown menu becomes visible (once per page load, with 500ms delay)
  // biome-ignore lint/correctness/useExhaustiveDependencies: only track once per page load based on open state
  useEffect(() => {
    if (isOpen && !hasTrackedRef.current) {
      // Only fire if menu stays open for at least 500ms
      timeoutRef.current = setTimeout(() => {
        tracking.navigationDropdownViewed({
          navigationItem: title,
          level: level,
          interactionType: "drilldown",
        })
        hasTrackedRef.current = true
      }, 500)
    } else if (!isOpen && timeoutRef.current) {
      // Cancel tracking if menu closes before delay
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isOpen])

  return (
    <>
      <NavBarMobileMenuItemButton
        onClick={() => {
          push(title)

          tracking.clickedMobileSubMenuOpen({
            contextModule,
            subject: title,
          })
        }}
        aria-expanded={false}
      >
        {title}

        <ChevronRightIcon
          fill="mono60"
          height={14}
          width={14}
          ml={1}
          aria-hidden
        />
      </NavBarMobileMenuItemButton>

      <NavBarMobileSubMenuPanelServer
        isOpen={isOpen}
        title={title}
        navigationVersion={navigationData}
        menuType={menuType}
        level={level}
      />
    </>
  )
}

interface NavBarMobileSubMenuPanelServerProps {
  isOpen: boolean
  title: string
  navigationVersion: any // Already fragmented
  menuType: "whatsNew" | "artists" | "artworks"
  level: number
  showBacknav?: boolean
}

const NavBarMobileSubMenuPanelServer: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuPanelServerProps>
> = ({
  isOpen,
  title,
  navigationVersion,
  menuType,
  level,
  showBacknav = true,
}) => {
  const tracking = useNavBarTracking()
  const contextModule = useTrackingContextModule()

  const handleClick = (
    _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    itemTitle: string,
    href: string,
    sectionTitle: string,
  ) => {
    tracking.clickedNavigationDropdownItem({
      contextModule,
      parentNavigationItem: title,
      dropdownGroup: sectionTitle,
      subject: itemTitle,
      destinationPath: href,
    })
  }

  return (
    <NavBarMobileMenuTransition isOpen={isOpen}>
      <Flex position="relative" alignItems="stretch" height={60}>
        {showBacknav && <NavBarMobileSubMenuBackButton />}

        <Text variant="sm" color="mono100" display="flex" m="auto">
          {title}
        </Text>

        {/* Spacer for close button */}
        {showBacknav && <Box size={60} />}
      </Flex>

      {navigationVersion.items.map((section, sectionIndex) => {
        if (!section?.title) return null

        return (
          <Box key={sectionIndex}>
            {/* Render each section as a drill-down button */}
            <NavBarMobileSubMenuItem
              item={section}
              parentNavigationItem={title}
              sectionTitle=""
              level={level + 1}
              menuType={menuType}
            />
          </Box>
        )
      })}

      {/* View All links */}
      {menuType === "artists" && level === 0 && (
        <>
          <Separator my={1} />
          <NavBarMobileMenuItemLink
            to="/artists"
            onClick={e => handleClick(e, "View All Artists", "/artists", "")}
          >
            View All Artists
          </NavBarMobileMenuItemLink>
          <Separator my={1} />
        </>
      )}

      {menuType === "artworks" && level === 0 && (
        <>
          <Separator my={1} />
          <NavBarMobileMenuItemLink
            to="/collect"
            onClick={e => handleClick(e, "View All Artworks", "/collect", "")}
          >
            View All Artworks
          </NavBarMobileMenuItemLink>
          <Separator my={1} />
        </>
      )}

      {/* A-Z letters for Artists menu */}
      {menuType === "artists" && level === 0 && (
        <Flex flexWrap="wrap" justifyContent="center">
          {LETTERS.map(letter => {
            return (
              <NavBarMobileMenuItemLink
                key={letter}
                width={60}
                px={0}
                justifyContent="center"
                to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
                title={`View artists starting with "${letter}"`}
                onClick={e =>
                  handleClick(
                    e,
                    letter,
                    `/artists/artists-starting-with-${letter.toLowerCase()}`,
                    "Browse by name",
                  )
                }
              >
                {letter}
              </NavBarMobileMenuItemLink>
            )
          })}
        </Flex>
      )}
    </NavBarMobileMenuTransition>
  )
}

interface NavBarMobileSubMenuItemProps {
  item: any // NavigationItem from server
  parentNavigationItem: string
  sectionTitle: string
  level: number
  menuType: "whatsNew" | "artists" | "artworks"
}

const NavBarMobileSubMenuItem: React.FC<NavBarMobileSubMenuItemProps> = ({
  item,
  parentNavigationItem,
  sectionTitle,
  level,
  menuType,
}) => {
  const tracking = useNavBarTracking()
  const contextModule = useTrackingContextModule()

  // If item has children, it's a nested submenu - use the drilldown component
  if (item.children && item.children.length > 0) {
    return (
      <NavBarMobileSubMenuDrilldown
        title={item.title}
        navigationData={{ items: item.children }}
        menuType={menuType}
        level={level}
      />
    )
  }

  // Otherwise it's a regular link
  if (!item.href) return null

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    tracking.clickedNavigationDropdownItem({
      contextModule,
      parentNavigationItem,
      dropdownGroup: sectionTitle,
      subject: item.title,
      destinationPath: item.href,
    })
  }

  return (
    <NavBarMobileMenuItemLink to={item.href} onClick={handleClick}>
      {item.title}
    </NavBarMobileMenuItemLink>
  )
}

const NAVIGATION_VERSION_FRAGMENT = graphql`
  fragment NavBarMobileSubMenuServer_navigationVersion on NavigationVersion {
    items {
      title
      position
      children {
        title
        href
        position
      }
    }
  }
`
