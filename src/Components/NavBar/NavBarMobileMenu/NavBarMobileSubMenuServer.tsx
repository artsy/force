import { ActionType } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Flex, Separator, Text } from "@artsy/palette"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type * as React from "react"
import { useEffect, useRef } from "react"
import { useTracking } from "react-tracking"
import { graphql, useFragment } from "react-relay"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import { useTrackingContextModule } from "./useTrackingContextModule"
import type { NavBarMobileSubMenuServer_navigationVersion$key } from "__generated__/NavBarMobileSubMenuServer_navigationVersion.graphql"

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
  const { trackEvent } = useTracking()
  const { path, push } = useNavBarMobileMenuNavigation()
  const contextModule = useTrackingContextModule()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

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
        trackEvent({
          action: ActionType.navigationDropdownViewed,
          context_module: "header" as any,
          context_page_owner_type: contextPageOwnerType!,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          navigation_item: title,
          level: level,
          interaction_type: "drilldown",
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

          trackEvent({
            action_type: DeprecatedAnalyticsSchema.ActionType.Click,
            context_module: contextModule,
            flow: "Header",
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
  const { trackEvent } = useTracking()
  const contextModule = useTrackingContextModule()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const isArtistsMenu = menuType === "artists"

  // Sort sections by position
  const sortedSections = [...(navigationVersion.items || [])].sort(
    (a, b) => (a?.position ?? 0) - (b?.position ?? 0),
  )

  const handleClick = (
    _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    itemTitle: string,
    href: string,
    sectionTitle: string,
  ) => {
    trackEvent({
      action: "click",
      flow: "Header",
      context_module: contextModule,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      parent_navigation_item: title,
      subject: itemTitle,
      destination_path: href,
      navigation_dropdown_group: sectionTitle,
    })
  }

  return (
    <NavBarMobileMenuTransition isOpen={isOpen}>
      <Flex position="relative" alignItems="stretch" height={60}>
        {showBacknav && <NavBarMobileSubMenuBack />}

        <Text variant="sm" color="mono100" display="flex" m="auto">
          {title}
        </Text>

        {/* Spacer for close button */}
        {showBacknav && <Box size={60} />}
      </Flex>

      {sortedSections.map((section, sectionIndex) => {
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
      {menuType === "artists" && (
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

      {menuType === "artworks" && (
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
      {isArtistsMenu && (
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

const NavBarMobileSubMenuBack: React.FC<
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
  const { trackEvent } = useTracking()
  const contextModule = useTrackingContextModule()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

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
    trackEvent({
      action: "click",
      flow: "Header",
      context_module: contextModule,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      parent_navigation_item: parentNavigationItem,
      subject: item.title,
      destination_path: item.href,
      navigation_dropdown_group: sectionTitle,
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
        children {
          title
          href
          position
        }
      }
    }
  }
`
