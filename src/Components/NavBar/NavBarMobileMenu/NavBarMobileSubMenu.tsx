import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Flex, Separator, Text } from "@artsy/palette"
import {
  type LinkData,
  type MenuData,
  isMenuLinkData,
} from "Components/NavBar/menuData"
import type * as React from "react"
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
}

export const NavBarMobileSubMenu: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuProps>
> = ({ children, menu }) => {
  const { trackEvent } = useTracking()
  const { path, push } = useNavBarMobileMenuNavigation()
  const contextModule = useTrackingContextModule()

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
        isOpen={!!path?.includes(menu.title)}
        title={menu.title}
        links={menu.links}
      />
    </>
  )
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

interface NavBarMobileSubMenuPanelProps {
  isOpen: boolean
  title: string
  links: LinkData[]
  showBacknav?: boolean
}

const NavBarMobileSubMenuPanel: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuPanelProps>
> = ({ isOpen, title, links, showBacknav = true }) => {
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
        return <NavBarMobileSubMenuItem key={i} link={link} />
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
}

export const NavBarMobileSubMenuItem: React.FC<
  React.PropsWithChildren<NavBarMobileSubMenuItemProps>
> = ({ link }) => {
  const { trackEvent } = useTracking()
  const contextModule = useTrackingContextModule()

  if (isMenuLinkData(link)) {
    return (
      <>
        <NavBarMobileSubMenu menu={link.menu}>{link.text}</NavBarMobileSubMenu>

        {link.dividerBelow && <Separator my={1} />}
      </>
    )
  }

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: contextModule,
      flow: "Header",
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
