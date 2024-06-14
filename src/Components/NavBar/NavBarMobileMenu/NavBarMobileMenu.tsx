import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { ModalBase, Separator, Text } from "@artsy/palette"
import {
  WHATS_NEW_SUBMENU_DATA,
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "Components/NavBar/menuData"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { logout } from "Utils/auth"
import * as React from "react"
import { useTracking } from "react-tracking"
import { NavBarMobileMenuAuthentication } from "./NavBarMobileMenuAuthentication"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { NavBarMobileMenuNavigationProvider } from "./NavBarMobileMenuNavigation"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import { NavBarMobileSubMenu } from "./NavBarMobileSubMenu"
import CloseIcon from "@artsy/icons/CloseIcon"
import MenuIcon from "@artsy/icons/MenuIcon"

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
  const { isLoggedIn } = useSystemContext()

  const { downloadAppUrl } = useDeviceDetection()
  const { trackEvent } = useTracking()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => {
    const node = event.currentTarget
    const text = node.textContent ?? ""
    const href = node.getAttribute("href")

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.Header,
      flow: "Header",
      subject: text,
      destination_path: href,
    })
  }

  const handleLogout = async () => {
    await logout()
    window.location.reload()
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
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <NavBarMobileMenuIcon open />
          </NavBarMobileMenuItemButton>

          <NavBarMobileMenuTransition isOpen={isOpen} py={2}>
            <NavBarMobileMenuItemLink
              to="/collect"
              color="black100"
              onClick={handleClick}
            >
              Buy
            </NavBarMobileMenuItemLink>

            <NavBarMobileSubMenu menu={WHATS_NEW_SUBMENU_DATA.menu}>
              {WHATS_NEW_SUBMENU_DATA.text}
            </NavBarMobileSubMenu>

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
              Fairs & Events
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

            {isLoggedIn && (
              <NavBarMobileMenuItemButton
                aria-label="Log out of your account"
                onClick={handleLogout}
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
