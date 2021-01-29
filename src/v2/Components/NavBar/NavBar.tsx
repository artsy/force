import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Button, Flex, FlexProps, color, themeProps } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy/SystemContext"
import { SearchBarQueryRenderer as SearchBar } from "v2/Components/Search/SearchBar"
import { DropDownNavMenu, MobileNavMenu, MobileToggleIcon } from "./Menus"
import { InboxNotificationCountQueryRenderer as InboxNotificationCount } from "./Menus/MobileNavMenu/InboxNotificationCount"
import { ModalType } from "v2/Components/Authentication/Types"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "v2/Components/NavBar/menuData"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { NavItem, NavItemProps } from "./NavItem"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AnalyticsSchema } from "v2/Artsy"
import { track, useTracking } from "v2/Artsy/Analytics"
import Events from "v2/Utils/Events"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { LoggedInActionsQueryRenderer as LoggedInActions } from "./LoggedInActions"
import {
  NAV_BAR_TOP_TIER_HEIGHT,
  NAV_BAR_BOTTOM_TIER_HEIGHT,
} from "./constants"

const NavBarContainer = styled(Flex)`
  position: relative;
  background-color: ${color("white100")};
  flex-direction: column;
`

const NavBarTier = styled(Flex)`
  position: relative;
  border-bottom: 1px solid ${color("black10")};
`

const NavSection: React.FC<FlexProps> = ({
  children,
  justifyContent,
  ...rest
}) => {
  return (
    <Flex alignItems="stretch" height="100%" bg={rest.bg} {...rest}>
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent={justifyContent}
      >
        {children}
      </Flex>
    </Flex>
  )
}

const PrimaryNavItem: React.FC<NavItemProps> = ({ children, ...rest }) => (
  <NavItem linkColor="black100" {...rest}>
    {children}
  </NavItem>
)

const SecondaryNavItem: React.FC<NavItemProps> = ({ children, ...rest }) => (
  <NavItem linkColor="black60" {...rest}>
    {children}
  </NavItem>
)

export const NavBar: React.FC = track(
  {
    flow: AnalyticsSchema.Flow.Header,
    context_module: AnalyticsSchema.ContextModule.Header,
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
          <NavBarTier height={NAV_BAR_TOP_TIER_HEIGHT}>
            <NavSection mx={0.5}>
              <NavBarPrimaryLogo />
            </NavSection>

            <NavSection flex={1}>
              <SearchBar width="100%" />
            </NavSection>

            {/* Desktop. Collapses into mobile at `xs` breakpoint. */}
            <NavSection display={["none", "flex"]}>
              <NavSection alignItems="center" ml={2}>
                <PrimaryNavItem href="/collect">Buy Artwork</PrimaryNavItem>
                <PrimaryNavItem href="/consign">Sell with Artsy</PrimaryNavItem>
                <PrimaryNavItem href="/articles">Editorial</PrimaryNavItem>
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
                      size="medium"
                      onClick={() => {
                        openAuthModal(mediator, {
                          mode: ModalType.login,
                          intent: Intent.login,
                          contextModule: ContextModule.header,
                        })
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      size="medium"
                      onClick={() => {
                        openAuthModal(mediator, {
                          mode: ModalType.signup,
                          intent: Intent.signup,
                          contextModule: ContextModule.header,
                        })
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </NavSection>
            </NavSection>

            {/* Mobile. Triggers at the `xs` breakpoint. */}
            <NavSection display={["flex", "none"]}>
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
          </NavBarTier>

          {/* Desktop. Collapses into mobile at `xs` breakpoint. */}
          <NavBarTier
            height={NAV_BAR_BOTTOM_TIER_HEIGHT}
            display={["none", "flex"]}
          >
            <NavSection
              width="100%"
              justifyContent="space-between"
              display={["none", "flex"]}
            >
              <NavSection alignItems="center" ml={2}>
                <SecondaryNavItem
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
                </SecondaryNavItem>

                <SecondaryNavItem
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
                </SecondaryNavItem>

                <SecondaryNavItem href="/auctions">Auctions</SecondaryNavItem>
                <SecondaryNavItem href="/viewing-rooms">
                  Viewing&nbsp;Rooms
                </SecondaryNavItem>
                <SecondaryNavItem href="/galleries">Galleries</SecondaryNavItem>
                <SecondaryNavItem href="/fairs">Fairs</SecondaryNavItem>
                <SecondaryNavItem href="/Shows">Shows</SecondaryNavItem>
                <SecondaryNavItem
                  // Hide link at smaller viewports — corresponding display inside of `MoreNavMenu`
                  // If we need to do this again, consider a more abstract solution
                  display={["none", "none", "flex", "flex"]}
                  href="/institutions"
                >
                  Museums
                </SecondaryNavItem>
              </NavSection>
              <NavSection alignItems="right">
                <PrimaryNavItem href="#">Download App</PrimaryNavItem>
              </NavSection>
            </NavSection>
          </NavBarTier>

          {showMobileMenu && (
            <>
              <MobileNavMenu
                onClose={() => toggleMobileNav(false)}
                isOpen={showMobileMenu}
                onNavButtonClick={handleMobileNavClick}
              />
            </>
          )}
        </NavBarContainer>
      </header>
    </>
  )
})
