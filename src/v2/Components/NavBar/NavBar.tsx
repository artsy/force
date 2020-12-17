import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Button, Flex, FlexProps, color, themeProps } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy/SystemContext"
import { SearchBarQueryRenderer as SearchBar } from "v2/Components/Search/SearchBar"
import {
  DropDownNavMenu,
  MobileNavMenu,
  MobileToggleIcon,
  MoreNavMenu,
} from "./Menus"
import { InboxNotificationCountQueryRenderer as InboxNotificationCount } from "./Menus/MobileNavMenu/InboxNotificationCount"
import { ModalType } from "v2/Components/Authentication/Types"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "v2/Components/NavBar/menuData"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { NavItem } from "./NavItem"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AnalyticsSchema } from "v2/Artsy"
import { track, useTracking } from "v2/Artsy/Analytics"
import Events from "v2/Utils/Events"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { LoggedInActionsQueryRenderer as LoggedInActions } from "./LoggedInActions"
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

export const NavBar: React.FC = track(
  {
    context_module: AnalyticsSchema.ContextModule.Header,
    flow: AnalyticsSchema.Flow.Header,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)(() => {
  const { trackEvent } = useTracking()
  const { mediator, user } = useSystemContext()
  const [showMobileMenu, toggleMobileNav] = useState(false)
  const xs = useMatchMedia(themeProps.mediaQueries.xs)
  const sm = useMatchMedia(themeProps.mediaQueries.sm)
  const isMobile = xs || sm
  const isLoggedIn = Boolean(user)
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
                  return (
                    <DropDownNavMenu
                      width="100vw"
                      menu={ARTISTS_SUBMENU_DATA.menu}
                      contextModule={
                        AnalyticsSchema.ContextModule.HeaderArtistsDropdown
                      }
                      onClick={() => {
                        setIsVisible(false)
                      }}
                    />
                  )
                }}
              >
                Artists
              </NavItem>

              <NavItem
                label="Artworks"
                href="/collect"
                menuAnchor="full"
                Menu={({ setIsVisible }) => {
                  return (
                    <DropDownNavMenu
                      width="100vw"
                      menu={ARTWORKS_SUBMENU_DATA.menu}
                      contextModule={
                        AnalyticsSchema.ContextModule.HeaderArtworksDropdown
                      }
                      onClick={() => {
                        setIsVisible(false)
                      }}
                    />
                  )
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
                  return <MoreNavMenu width={160} />
                }}
              >
                More
              </NavItem>
            </NavSection>

            <NavSection mr={1}>
              {isLoggedIn ? (
                <LoggedInActions />
              ) : (
                <>
                  <Button
                    ml={2}
                    mr={1}
                    variant="secondaryOutline"
                    onClick={() => {
                      openAuthModal(mediator, {
                        contextModule: ContextModule.header,
                        intent: Intent.login,
                        mode: ModalType.login,
                      })
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      openAuthModal(mediator, {
                        contextModule: ContextModule.header,
                        intent: Intent.signup,
                        mode: ModalType.signup,
                      })
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
                  trackEvent({
                    action_type: AnalyticsSchema.ActionType.Click,
                    subject:
                      AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
                  })
                }

                toggleMobileNav(showMenu)
              }}
            >
              <Box
                px={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <MobileToggleIcon open={showMobileMenu} />
                {showNotificationCount && <InboxNotificationCount />}
              </Box>
            </NavItem>
          </NavSection>
        </NavBarContainer>

        {showMobileMenu && (
          <>
            <MobileNavMenu
              onClose={() => toggleMobileNav(false)}
              isOpen={showMobileMenu}
              onNavButtonClick={handleMobileNavClick}
            />
          </>
        )}
      </header>
    </>
  )
})
