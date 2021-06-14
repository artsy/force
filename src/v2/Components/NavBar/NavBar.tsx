import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Button, Flex, FlexProps, color, themeProps } from "@artsy/palette"
import { useSystemContext } from "v2/System/SystemContext"
import { SearchBarQueryRenderer as SearchBar } from "v2/Components/Search/SearchBar"
import { DropDownNavMenu, MobileNavMenu, MobileToggleIcon } from "./Menus"
import { InboxNotificationCountQueryRenderer as InboxNotificationCount } from "./Menus/MobileNavMenu/InboxNotificationCount"
import { ModalType } from "v2/Components/Authentication/Types"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "v2/Components/NavBar/menuData"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { NavItem } from "./NavItem"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AnalyticsSchema } from "v2/System"
import { track, useTracking } from "v2/System/Analytics"
import Events from "v2/Utils/Events"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { LoggedInActionsQueryRenderer as LoggedInActions } from "./LoggedInActions"
import {
  NAV_BAR_TOP_TIER_HEIGHT,
  NAV_BAR_BOTTOM_TIER_HEIGHT,
} from "./constants"
import { ScrollIntoView } from "v2/Utils"
import { Sticky } from "v2/Components/Sticky"

/**
 * Old Force pages have the navbar height hardcoded in several places. If
 * you're modifying the navbar you may need to update these files:
 *
 * src/desktop/apps/articles/stylesheets/articles.styl
 * src/desktop/apps/fair_organizer/stylesheets/index.styl
 * src/desktop/components/stylus_lib/index.styl
 *
 * Additional context:
 * https://github.com/artsy/force/pull/6991
 */

export const NavBar: React.FC = track(
  {
    flow: AnalyticsSchema.Flow.Header,
    context_module: AnalyticsSchema.ContextModule.Header,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)(() => {
  const { mediator, user, isEigen } = useSystemContext()
  if (isEigen) {
    return null
  }
  const { trackEvent } = useTracking()
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
      // @ts-expect-error STRICT_NULL_CHECK
      target = target.parentElement
    }
  }

  return (
    <Sticky zIndex={2}>
      <header>
        <NavBarContainer as="nav">
          <NavBarTier height={NAV_BAR_TOP_TIER_HEIGHT}>
            <NavSection ml={[0.5, 2]} mr={0.5}>
              <NavBarPrimaryLogo />
            </NavSection>

            <NavSection flex={1}>
              <SearchBar width="100%" />
            </NavSection>

            {/* Desktop. Collapses into mobile at `xs` breakpoint. */}
            <NavSection display={["none", "flex"]}>
              <NavSection alignItems="center" ml={2}>
                <NavItem href="/collect">Buy</NavItem>
                <NavItem href="/consign">Sell</NavItem>
                <NavItem href="/articles">Editorial</NavItem>
              </NavSection>

              <NavSection mr={2}>
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
                        // @ts-expect-error STRICT_NULL_CHECK
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
                        // @ts-expect-error STRICT_NULL_CHECK
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
                <NavItem href="/viewing-rooms">Viewing&nbsp;Rooms</NavItem>
                <NavItem href="/galleries">Galleries</NavItem>
                <NavItem href="/fairs">Fairs</NavItem>
                <NavItem href="/Shows">Shows</NavItem>
                <NavItem
                  // Hide link at smaller viewports — corresponding display inside of `MoreNavMenu`
                  // If we need to do this again, consider a more abstract solution
                  display={["none", "none", "flex", "flex"]}
                  href="/institutions"
                >
                  Museums
                </NavItem>
              </NavSection>
              <NavSection alignItems="right" mr={2}>
                <ScrollIntoView
                  selector="#download-app-banner"
                  behavior="smooth"
                >
                  <NavItem
                    href="#download-app-banner"
                    onClick={event => event.preventDefault()}
                  >
                    Download App
                  </NavItem>
                </ScrollIntoView>
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
    </Sticky>
  )
})

const NavBarContainer = styled(Flex)`
  position: relative;
  background-color: ${color("white100")};
  flex-direction: column;
`

export const NavBarTier = styled(Flex)`
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
