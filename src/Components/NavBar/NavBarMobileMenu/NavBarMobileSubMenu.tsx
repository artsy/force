import { ActionType } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Flex, Separator, Text } from "@artsy/palette"
import {
  type LinkData,
  type MenuData,
  isMenuLinkData,
} from "Components/NavBar/menuData"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type * as React from "react"
import { useEffect, useRef } from "react"
import { useTracking } from "react-tracking"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import { useTrackingContextModule } from "./useTrackingContextModule"

interface NavBarMobileSubMenuProps {
  menu: MenuData
  level?: number
}

export const NavBarMobileSubMenu: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuProps>
> = ({ children, menu, level = 0 }) => {
  const { trackEvent } = useTracking()
  const { path, push } = useNavBarMobileMenuNavigation()
  const contextModule = useTrackingContextModule()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const hasTrackedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isOpen = !!path?.includes(menu.title)

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
          navigation_item: menu.title,
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
          push(menu.title)

          trackEvent({
            action_type: DeprecatedAnalyticsSchema.ActionType.Click,
            context_module: contextModule,
            flow: "Header",
            subject: menu.title,
          })
        }}
        aria-expanded={false}
      >
        {children}

        <ChevronRightIcon
          fill="mono60"
          height={14}
          width={14}
          ml={1}
          aria-hidden
        />
      </NavBarMobileMenuItemButton>

      <NavBarMobileSubMenuPanel
        isOpen={isOpen}
        title={menu.title}
        links={menu.links}
        parentNavigationItem={menu.title}
        level={level}
      />
    </>
  )
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

interface NavBarMobileSubMenuPanelProps {
  isOpen: boolean
  title: string
  links: LinkData[]
  parentNavigationItem: string
  level: number
  showBacknav?: boolean
}

const NavBarMobileSubMenuPanel: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuPanelProps>
> = ({
  isOpen,
  title,
  links,
  parentNavigationItem,
  level,
  showBacknav = true,
}) => {
  const isArtistsMenu = title === "Artists"

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

      {links.map((link, i) => {
        return (
          <NavBarMobileSubMenuItem
            key={i}
            link={link}
            parentNavigationItem={parentNavigationItem}
            level={level}
          />
        )
      })}

      {isArtistsMenu && (
        <>
          <Separator my={1} />

          <Flex flexWrap="wrap" justifyContent="center">
            {LETTERS.map(letter => {
              return (
                <NavBarMobileMenuItemLink
                  key={letter}
                  width={60}
                  px={0}
                  justifyContent="center"
                  to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
                  title={`View artists starting with “${letter}”`}
                >
                  {letter}
                </NavBarMobileMenuItemLink>
              )
            })}
          </Flex>
        </>
      )}
    </NavBarMobileMenuTransition>
  )
}

export const NavBarMobileSubMenuBack: React.FC<
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
  link: LinkData
  parentNavigationItem: string
  level: number
}

export const NavBarMobileSubMenuItem: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuItemProps>
> = ({ link, parentNavigationItem, level }) => {
  const { trackEvent } = useTracking()
  const contextModule = useTrackingContextModule()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  if (isMenuLinkData(link)) {
    return (
      <>
        <NavBarMobileSubMenu menu={link.menu} level={level + 1}>
          {link.text}
        </NavBarMobileSubMenu>

        {link.dividerBelow && <Separator my={1} />}
      </>
    )
  }

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
      subject: link.text,
      destination_path: link.href,
    })

    link.onClick?.(event)
  }

  return (
    <>
      <NavBarMobileMenuItemLink to={link.href} onClick={handleClick}>
        {link.text}
      </NavBarMobileMenuItemLink>

      {link.dividerBelow && <Separator my={1} />}
    </>
  )
}
