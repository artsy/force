import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Flex, Separator, Text } from "@artsy/palette"
import {
  type LinkData,
  type MenuData,
  isMenuLinkData,
} from "Components/NavBar/menuData"
import type * as React from "react"
import { useEffect, useRef } from "react"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import { useTrackingContextModule } from "./useTrackingContextModule"
import { useNavBarTracking } from "../useNavBarTracking"

interface NavBarMobileSubMenuProps {
  menu: MenuData
  level?: number
}

export const NavBarMobileSubMenu: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuProps>
> = ({ children, menu, level = 0 }) => {
  const tracking = useNavBarTracking()
  const { path, push } = useNavBarMobileMenuNavigation()
  const contextModule = useTrackingContextModule()

  const hasTrackedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isOpen = !!path?.includes(menu.title)

  // Track when drilldown menu becomes visible (once per page load, with 500ms delay)
  // biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
    useEffect(() => {
    if (isOpen && !hasTrackedRef.current) {
      // Only fire if menu stays open for at least 500ms
      timeoutRef.current = setTimeout(() => {
        tracking.navigationDropdownViewed({
          navigationItem: menu.title,
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
          push(menu.title)

          tracking.clickedMobileSubMenuOpen({
            contextModule,
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

interface NavBarMobileSubMenuItemProps {
  link: LinkData
  parentNavigationItem: string
  level: number
}

export const NavBarMobileSubMenuItem: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuItemProps>
> = ({ link, parentNavigationItem, level }) => {
  const tracking = useNavBarTracking()
  const contextModule = useTrackingContextModule()

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

  // Skip visual components (like articles) in mobile menu
  if ("type" in link) {
    return null
  }

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    tracking.clickedNavigationDropdownItem({
      contextModule,
      parentNavigationItem,
      subject: link.text,
      destinationPath: link.href,
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
