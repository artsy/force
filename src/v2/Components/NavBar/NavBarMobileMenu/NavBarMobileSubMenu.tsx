import { Box, ChevronIcon, Flex, Separator, Text } from "@artsy/palette"
import React from "react"
import { useTracking } from "v2/System/Analytics"
import { AnalyticsSchema } from "v2/System"
import { isMenuLinkData, LinkData, MenuData } from "../menuData"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"
import { useTrackingContextModule } from "./useTrackingContextModule"

interface NavBarMobileSubMenuProps {
  menu: MenuData
}

export const NavBarMobileSubMenu: React.FC<NavBarMobileSubMenuProps> = ({
  children,
  menu,
}) => {
  const { trackEvent } = useTracking()
  const { path, push } = useNavBarMobileMenuNavigation()
  const contextModule = useTrackingContextModule()

  return (
    <>
      <NavBarMobileMenuItemButton
        onClick={() => {
          push(menu.title)

          trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            context_module: contextModule,
            flow: "Header",
            subject: menu.title,
          })
        }}
        aria-expanded={false}
      >
        {children}

        <ChevronIcon
          direction="right"
          fill="black60"
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

const NavBarMobileSubMenuPanel: React.FC<NavBarMobileSubMenuPanelProps> = ({
  isOpen,
  title,
  links,
  showBacknav = true,
}) => {
  const isArtistsMenu = title === "Artists"
  const lastLinkIndex = links.length - 1

  return (
    <NavBarMobileMenuTransition isOpen={isOpen}>
      <Flex position="relative" alignItems="stretch" height={60}>
        {showBacknav && <NavBarMobileSubMenuBack />}

        <Text variant="sm" color="black100" display="flex" m="auto">
          {title}
        </Text>

        {/* Spacer for close button */}
        {showBacknav && <Box size={60} />}
      </Flex>

      {links.map((link, i) => {
        const isLast = lastLinkIndex === i

        return (
          <NavBarMobileSubMenuItem
            key={i}
            link={link}
            isLast={isLast}
            isArtistsMenu={isArtistsMenu}
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

export const NavBarMobileSubMenuBack: React.FC = () => {
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
          action_type: AnalyticsSchema.ActionType.Click,
          context_module: contextModule,
          flow: "Header",
          subject: "Back link",
        })

        pop()
      }}
    >
      <ChevronIcon
        direction="left"
        fill="black100"
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
  isLast: boolean
  isArtistsMenu: boolean
}

export const NavBarMobileSubMenuItem: React.FC<NavBarMobileSubMenuItemProps> = ({
  link,
  isLast,
  isArtistsMenu,
}) => {
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
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
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

        {isArtistsMenu && isLast && <> A – Z</>}
      </NavBarMobileMenuItemLink>

      {link.dividerBelow && <Separator my={1} />}
    </>
  )
}
