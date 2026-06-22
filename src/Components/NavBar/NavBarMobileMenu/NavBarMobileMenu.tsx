import CloseIcon from "@artsy/icons/CloseIcon"
import MenuIcon from "@artsy/icons/MenuIcon"
import { ModalBase, Separator, Text } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { logout } from "Utils/auth"
import type * as React from "react"
import { MOBILE_NAV_LAYOUT, SEPARATOR } from "../navItems"
import { NavBarMobileItem } from "./NavBarMobileItem"
import { NavBarMobileMenuAuthentication } from "./NavBarMobileMenuAuthentication"
import { useNavBarTracking } from "../useNavBarTracking"
import {
  NavBarMobileMenuItemButton,
  NavBarMobileMenuItemLink,
} from "./NavBarMobileMenuItem"
import { NavBarMobileMenuNavigationProvider } from "./NavBarMobileMenuNavigation"
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
              {MOBILE_NAV_LAYOUT.map((entry, index) => {
                return (
                  <NavBarMobileItem
                    key={entry === SEPARATOR ? `separator-${index}` : entry}
                    entry={entry}
                    navigationData={navigationData}
                    handleClick={handleClick}
                  />
                )
              })}

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
