import CloseIcon from "@artsy/icons/CloseIcon"
import MenuIcon from "@artsy/icons/MenuIcon"
import { ModalBase, Separator, Text } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { logout } from "Utils/auth"
import type * as React from "react"
import { NavBarMobileMenuAuthentication } from "./NavBarMobileMenuAuthentication"
import { useNavBarTracking } from "../useNavBarTracking"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { NavBarMobileMenuNavigationProvider } from "./NavBarMobileMenuNavigation"
import { NavBarMobileSubMenu } from "Components/NavBar/NavBarMobileMenu/NavBarMobileSubMenu"
import { NavBarMobileMenuTransition } from "./NavBarMobileMenuTransition"
import type { buildAppRoutesQuery } from "__generated__/buildAppRoutesQuery.graphql"

interface NavBarMobileMenuProps {
  navigationData?: buildAppRoutesQuery["response"] | null
  isOpen: boolean
  onClose: () => void
  onNavButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const NavBarMobileMenu: React.FC<
  React.PropsWithChildren<NavBarMobileMenuProps>
> = ({ navigationData, isOpen, onNavButtonClick, onClose }) => {
  const { isLoggedIn } = useSystemContext()

  const { downloadAppUrl } = useDeviceDetection()
  const tracking = useNavBarTracking()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
  ) => {
    const node = event.currentTarget
    const text = node.textContent ?? ""
    const href = node.getAttribute("href")

    tracking.clickedMobileNavLink({
      subject: text,
      destinationPath: href,
    })
  }

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  return (
    <NavBarMobileMenuNavigationProvider>
      <div data-testid="NavBarMobileMenu">
        <ModalBase dialogProps={{ width: "100%", height: "100%", bg: "mono0" }}>
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
                color="mono100"
                onClick={handleClick}
              >
                Buy
              </NavBarMobileMenuItemLink>

              {navigationData?.whatsNewNavigation && (
                <NavBarMobileSubMenu
                  navigationVersion={navigationData.whatsNewNavigation}
                  menuType="whatsNew"
                >
                  What’s New
                </NavBarMobileSubMenu>
              )}

              {navigationData?.artistsNavigation && (
                <NavBarMobileSubMenu
                  navigationVersion={navigationData.artistsNavigation}
                  menuType="artists"
                >
                  Artists
                </NavBarMobileSubMenu>
              )}

              {navigationData?.artworksNavigation && (
                <NavBarMobileSubMenu
                  navigationVersion={navigationData.artworksNavigation}
                  menuType="artworks"
                >
                  Artworks
                </NavBarMobileSubMenu>
              )}

              <NavBarMobileMenuItemLink to="/auctions" onClick={handleClick}>
                Auctions
              </NavBarMobileMenuItemLink>

              <NavBarMobileMenuItemLink
                to="/viewing-rooms"
                onClick={handleClick}
              >
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

              <NavBarMobileMenuItemLink
                to="/institutions"
                onClick={handleClick}
              >
                Museums
              </NavBarMobileMenuItemLink>

              <Separator my={1} />

              <NavBarMobileMenuItemLink
                to="/price-database"
                color="mono100"
                onClick={handleClick}
              >
                Price Database
              </NavBarMobileMenuItemLink>

              <NavBarMobileMenuItemLink
                to="/articles"
                color="mono100"
                onClick={handleClick}
              >
                Editorial
              </NavBarMobileMenuItemLink>

              <Separator my={1} />

              <NavBarMobileMenuAuthentication />

              <NavBarMobileMenuItemLink
                to={downloadAppUrl}
                onClick={handleClick}
              >
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
      </div>
    </NavBarMobileMenuNavigationProvider>
  )
}

export const NavBarMobileMenuIcon: React.FC<
  React.PropsWithChildren<{ open: boolean }>
> = ({ open }) => {
  // TODO: Should be able to scale these using width & height props
  return open ? (
    <CloseIcon style={{ transform: "scale(1.5)" }} />
  ) : (
    <MenuIcon style={{ transform: "scale(1.5)" }} />
  )
}
