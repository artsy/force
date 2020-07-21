import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  Box,
  Button,
  ChevronIcon,
  Flex,
  FlexProps,
  color,
  themeProps,
} from "@artsy/palette"
import { useSystemContext } from "v2/Artsy/SystemContext"
import { SearchBarQueryRenderer as SearchBar } from "v2/Components/Search/SearchBar"
import {
  DropDownNavMenu,
  MobileNavMenu,
  MobileToggleIcon,
  MoreNavMenu,
} from "./Menus"
import { InboxNotificationCountQueryRenderer as InboxNotificationCount } from "./Menus/MobileNavMenu/InboxNotificationCount"
import { userHasLabFeature } from "v2/Utils/user"
import { ModalType } from "v2/Components/Authentication/Types"
import { MenuLinkData, menuData } from "v2/Components/NavBar/menuData"
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
  const conversationsEnabled = userHasLabFeature(
    user,
    "User Conversations View"
  )
  // ToDo: replace check for conversationsEnabled with check for user when ready to launch
  const showNotificationCount =
    isLoggedIn && !showMobileMenu && conversationsEnabled

  const {
    links: [artworks, artists],
  } = menuData

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

          <NavSection width="100%">
            <Box width="100%">
              <SearchBar />
            </Box>
          </NavSection>

          {/* Desktop. Collapses into mobile at `sm` breakpoint. */}
          <NavSection display={["none", "none", "flex"]}>
            <NavSection alignItems="center" ml={2}>
              <NavItem
                label="Artworks"
                menuAnchor="full"
                Menu={({ setIsVisible }) => {
                  return (
                    <DropDownNavMenu
                      width="100vw"
                      menu={(artworks as MenuLinkData).menu}
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
                <Flex>
                  Artworks
                  <ChevronIcon
                    direction="down"
                    color={color("black100")}
                    height="15px"
                    width="15px"
                    top="5px"
                    left="4px"
                  />
                </Flex>
              </NavItem>

              <NavItem
                label="Artists"
                menuAnchor="full"
                Menu={({ setIsVisible }) => {
                  return (
                    <DropDownNavMenu
                      width="100vw"
                      menu={(artists as MenuLinkData).menu}
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
                <Flex>
                  Artists
                  <ChevronIcon
                    direction="down"
                    color={color("black100")}
                    height="15px"
                    width="15px"
                    top="5px"
                    left="4px"
                  />
                </Flex>
              </NavItem>

              <NavItem href="/auctions">Auctions</NavItem>
              <NavItem href="/articles">Editorial</NavItem>
              <NavItem
                label="More"
                menuAnchor="center"
                Menu={() => {
                  return <MoreNavMenu width={160} />
                }}
              >
                <Flex>
                  More
                  <ChevronIcon
                    direction="down"
                    color={color("black100")}
                    height="15px"
                    width="15px"
                    top="5px"
                    left="4px"
                  />
                </Flex>
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
                        mode: ModalType.login,
                        intent: Intent.login,
                        contextModule: ContextModule.header,
                      })
                    }}
                  >
                    Log in
                  </Button>
                  <Button
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

          {/* Mobile. Triggers at the `sm` breakpoint. */}
          <NavSection display={["flex", "flex", "none"]}>
            <NavItem
              className="mobileHamburgerButton"
              borderLeft="1px solid"
              borderColor="black10"
              px={1}
              ml={1}
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
              <MobileToggleIcon open={showMobileMenu} />
              {showNotificationCount && <InboxNotificationCount />}
            </NavItem>
          </NavSection>
        </NavBarContainer>

        {showMobileMenu && (
          <>
            <MobileNavMenu
              onClose={() => toggleMobileNav(false)}
              isOpen={showMobileMenu}
              menuData={menuData}
              onNavButtonClick={handleMobileNavClick}
            />
          </>
        )}
      </header>
    </>
  )
})

const NavSection: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex alignItems="stretch" height="100%" bg={rest.bg} {...rest}>
      <Flex width="100%" height="100%" alignItems="center">
        {children}
      </Flex>
    </Flex>
  )
}

const NavBarContainer = styled(Flex)`
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
  position: relative;
  z-index: 3;
  height: ${NAV_BAR_HEIGHT}px;
`
