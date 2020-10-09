import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Button, Flex, FlexProps, color, themeProps } from "@artsy/palette"
import { SearchBarQueryRenderer as SearchBar } from "../Search/SearchBar"
import { ARTISTS_SUBMENU_DATA, ARTWORKS_SUBMENU_DATA } from "./menuData"
import { NavItem } from "./NavItem"
import { ContextModule, Intent } from "@artsy/cohesion"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { NAV_BAR_HEIGHT } from "./constants"

const NavBarContainer = styled(Flex)`
  position: relative;
  height: ${NAV_BAR_HEIGHT}px;
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
`

const NavSection: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex alignItems="stretch" height="100%" bg={rest.bg} {...rest}>
      <Flex width="100%" height="100%" alignItems="center">
        {children}
      </Flex>
    </Flex>
  )
}

export const NavBar: React.FC = () => {
  const [showMobileMenu, toggleMobileNav] = useState(false)
  const isMobile = false
  const isLoggedIn = Boolean(false)
  const showNotificationCount = isLoggedIn && !showMobileMenu

  // Close mobile menu if dragging window from small size to desktop
  useEffect(() => {
    if (!isMobile) {
      toggleMobileNav(false)
    }
  }, [isMobile])

  const handleMobileNavClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    let target = event.target as HTMLElement

    // Only close MobileNav if the underlying tapped element is a link.
    // Because event.target is the most nested element in the tree we lookup to
    // see if it's wrapped in a link.
    while (target !== event.currentTarget) {
      if (target instanceof HTMLAnchorElement) {
        toggleMobileNav(false)
        return
      }
      target = target.parentElement
    }
  }

  return (
    <>
      <NavBarSkipLink />

      <header>
        <NavBarContainer as="nav">
          <NavSection mx={0.5}>
            <NavBarPrimaryLogo />
          </NavSection>

          <NavSection flex={1}>
            <SearchBar width="100%" />
          </NavSection>

          {/* Desktop. Collapses into mobile at `sm` breakpoint. */}
          <NavSection display={["none", "none", "flex"]}>
            <NavSection alignItems="center" ml={2}>
              <NavItem
                label="Artists"
                href="/artists"
                menuAnchor="full"
                Menu={({ setIsVisible }) => {
                  return <div>hi</div>
                }}
              >
                Artists
              </NavItem>

              <NavItem
                label="Artworks"
                href="/collect"
                menuAnchor="full"
                Menu={({ setIsVisible }) => {
                  return <div>hi</div>
                }}
              >
                Artworks
              </NavItem>

              <NavItem href="/auctions">Auctions</NavItem>

              <NavItem
                // Hide link at smaller viewports — corresponding display inside of `MoreNavMenu`
                // If we need to do this again, consider a more abstract solution
                display={["none", "none", "none", "flex"]}
                href="/viewing-rooms"
              >
                Viewing&nbsp;Rooms
              </NavItem>

              <NavItem href="/articles">Editorial</NavItem>

              <NavItem
                label="More"
                menuAnchor="center"
                Menu={() => {
                  return <div>hik</div>
                }}
              >
                More
              </NavItem>
            </NavSection>

            <NavSection mr={1}>
              {false ? null : (
                <>
                  <Button
                    ml={2}
                    mr={1}
                    variant="secondaryOutline"
                    onClick={() => {
                      //
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      //
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </NavSection>
          </NavSection>

          {/* Mobile. Triggers at the `sm` breakpoint. */}
          <NavSection display={["flex", "flex", "none"]}>
            <NavItem
              className="mobileHamburgerButton"
              borderLeft="1px solid"
              borderColor="black10"
              ml={1}
              tabIndex={0}
              role="button"
              onClick={() => {
                const showMenu = !showMobileMenu
                if (showMenu) {
                  //
                }

                toggleMobileNav(showMenu)
              }}
            >
              <Box
                px={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              ></Box>
            </NavItem>
          </NavSection>
        </NavBarContainer>
      </header>
    </>
  )
}
