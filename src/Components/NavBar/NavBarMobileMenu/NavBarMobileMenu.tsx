import { CloseIcon, MenuIcon, ModalBase, Separator, Text } from "@artsy/palette"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "Components/NavBar/menuData"
import * as React from "react"
import { NavBarMobileMenuAuthentication } from "./NavBarMobileMenuAuthentication"
import {
  NavBarMobileMenuItemLink,
  NavBarMobileMenuItemButton,
} from "./NavBarMobileMenuItem"
import { NavBarMobileMenuNavigationProvider } from "./NavBarMobileMenuNavigation"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import { NavBarMobileSubMenu } from "./NavBarMobileSubMenu"
import { useSystemContext } from "System"
import { NavBarMobileMenuNotificationsQueryRenderer } from "./NavBarMobileMenuNotifications"
import { useFeatureFlag } from "System/useFeatureFlag"

interface NavBarMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const NavBarMobileMenu: React.FC<NavBarMobileMenuProps> = ({
  isOpen,
  onNavButtonClick,
  onClose,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const { isLoggedIn, mediator } = useSystemContext()

  const { downloadAppUrl } = useDeviceDetection()
  const { trackEvent } = useTracking()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => {
    const node = event.currentTarget
    const text = node.textContent ?? ""
    const href = node.getAttribute("href")!

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.Header,
      flow: "Header",
      subject: text,
      destination_path: href,
    })
  }

  return (
    <NavBarMobileMenuNavigationProvider>
      <ModalBase
        dialogProps={{ width: "100%", height: "100%", bg: "white100" }}
      >
        <Text variant="sm-display" onClick={onNavButtonClick}>
          <NavBarMobileMenuItemButton
            position="absolute"
            top={0}
            right={0}
            width={60}
            height={60}
            px={0}
            py={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={onClose}
            zIndex={2}
            bg="transparent"
          >
            <NavBarMobileMenuIcon open />
          </NavBarMobileMenuItemButton>

          <NavBarMobileMenuTransition isOpen={isOpen} py={2}>
            {isLoggedIn && !isCollectorProfileEnabled && (
              <NavBarMobileMenuNotificationsQueryRenderer />
            )}

            <NavBarMobileMenuItemLink
              to="/collect"
              color="black100"
              onClick={handleClick}
            >
              Buy
            </NavBarMobileMenuItemLink>

            <NavBarMobileSubMenu menu={ARTISTS_SUBMENU_DATA.menu}>
              {ARTISTS_SUBMENU_DATA.menu.title}
            </NavBarMobileSubMenu>

            <NavBarMobileSubMenu menu={ARTWORKS_SUBMENU_DATA.menu}>
              {ARTWORKS_SUBMENU_DATA.menu.title}
            </NavBarMobileSubMenu>

            <NavBarMobileMenuItemLink to="/auctions" onClick={handleClick}>
              Auctions
            </NavBarMobileMenuItemLink>

            <NavBarMobileMenuItemLink to="/viewing-rooms" onClick={handleClick}>
              Viewing Rooms
            </NavBarMobileMenuItemLink>

            <NavBarMobileMenuItemLink to="/galleries" onClick={handleClick}>
              Galleries
            </NavBarMobileMenuItemLink>

            <NavBarMobileMenuItemLink to="/art-fairs" onClick={handleClick}>
              Fairs
            </NavBarMobileMenuItemLink>

            <NavBarMobileMenuItemLink to="/shows" onClick={handleClick}>
              Shows
            </NavBarMobileMenuItemLink>

            <NavBarMobileMenuItemLink to="/institutions" onClick={handleClick}>
              Museums
            </NavBarMobileMenuItemLink>

            <Separator my={1} />

            <NavBarMobileMenuItemLink
              to="/sell"
              color="black100"
              onClick={handleClick}
            >
              Sell
            </NavBarMobileMenuItemLink>

            <NavBarMobileMenuItemLink
              to="/price-database"
              color="black100"
              onClick={handleClick}
            >
              Price Database
            </NavBarMobileMenuItemLink>

            <NavBarMobileMenuItemLink
              to="/articles"
              color="black100"
              onClick={handleClick}
            >
              Editorial
            </NavBarMobileMenuItemLink>

            <Separator my={1} />

            <NavBarMobileMenuAuthentication />

            <NavBarMobileMenuItemLink to={downloadAppUrl} onClick={handleClick}>
              Get the app
            </NavBarMobileMenuItemLink>

            {isLoggedIn && isCollectorProfileEnabled && (
              <NavBarMobileMenuItemButton
                aria-label="Log out of your account"
                onClick={() => {
                  mediator?.trigger("auth:logout")
                }}
              >
                Log out
              </NavBarMobileMenuItemButton>
            )}
          </NavBarMobileMenuTransition>
        </Text>
      </ModalBase>
    </NavBarMobileMenuNavigationProvider>
  )
}

export const NavBarMobileMenuIcon: React.FC<{ open: boolean }> = ({ open }) => {
  // TODO: Should be able to scale these using width & height props
  return open ? (
    <CloseIcon style={{ transform: "scale(1.5)" }} />
  ) : (
    <MenuIcon style={{ transform: "scale(1.5)" }} />
  )
}
