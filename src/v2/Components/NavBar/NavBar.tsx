import { useEffect, useState } from "react"
import * as React from "react"
import {
  Button,
  Flex,
  themeProps,
  Text,
  Dropdown,
  ThemeProviderV3,
  Box,
} from "@artsy/palette"
import { useSystemContext } from "v2/System/SystemContext"
import { SearchBarQueryRenderer } from "v2/Components/Search/SearchBar"
import { NavBarSubMenu } from "./Menus"
import {
  NavBarMobileMenu,
  NavBarMobileMenuIcon,
} from "./NavBarMobileMenu/NavBarMobileMenu"
import { NavBarMobileMenuInboxNotificationCountQueryRenderer } from "./NavBarMobileMenu/NavBarMobileMenuInboxNotificationCount"
import { ModalType } from "v2/Components/Authentication/Types"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "v2/Components/NavBar/menuData"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AnalyticsSchema } from "v2/System"
import { track } from "v2/System/Analytics"
import Events from "v2/Utils/Events"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { NavBarLoggedInActionsQueryRenderer } from "./NavBarLoggedInActions"
import {
  NavBarItemButton,
  NavBarItemLink,
  NavBarItemUnfocusableAnchor,
} from "./NavBarItem"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { useNavBarHeight } from "./useNavBarHeight"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import { Z } from "v2/Apps/Components/constants"

/**
 * Old Force pages have the navbar height hardcoded in several places. If
 * you're modifying the navbar you may need to update these files:
 *
 * src/desktop/apps/articles/stylesheets/articles.styl
 * src/desktop/components/stylus_lib/index.styl
 *
 * Additional context:
 * https://github.com/artsy/force/pull/6991
 *
 * NOTE: Fresnel doesn't work correctly here because this is included
 * on older CoffeeScript pages. Hence the `display={["none", "flex"]}` usage
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
  const xs = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  const sm = __internal__useMatchMedia(themeProps.mediaQueries.sm)
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
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      target = target.parentElement
    }
  }

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const link = event.currentTarget
    const text = (link.textContent || link.getAttribute("data-label")) ?? ""
    const href = link.getAttribute("href")!

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      destination_path: href,
      subject: text,
    })
  }

  const { height } = useNavBarHeight()

  return (
    <ThemeProviderV3>
      <NavBarSkipLink />

      <Box
        as="header"
        bg="white100"
        borderBottom="1px solid"
        borderColor="black30"
        height={height}
      >
        <AppContainer height="100%">
          <HorizontalPadding
            as="nav"
            display="flex"
            flexDirection="column"
            height="100%"
          >
            {/* Mobile authentication banner */}
            {!isLoggedIn && (
              <Flex display={["flex", "none"]} pt={1}>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  to="/signup"
                  variant="secondaryOutline"
                  flex={1}
                  size="small"
                >
                  Sign Up
                </Button>

                <Button
                  // @ts-ignore
                  as={RouterLink}
                  to="/login"
                  flex={1}
                  ml={1}
                  size="small"
                >
                  Log In
                </Button>
              </Flex>
            )}

            {/* Top-tier */}
            <Flex pt={1} pb={[1, 0]} alignItems="stretch" flex={1}>
              <NavBarPrimaryLogo mr={1} />

              <Flex flex={1} alignItems="center">
                <SearchBarQueryRenderer width="100%" />
              </Flex>

              {/* Desktop. Collapses into mobile at `xs` breakpoint. */}
              <Flex display={["none", "flex"]} ml={1} alignItems="stretch">
                <Text variant="sm" lineHeight={1} display={["none", "flex"]}>
                  <Flex alignItems="center" display={["none", "none", "flex"]}>
                    <NavBarItemLink
                      href="/collect"
                      textDecoration="none"
                      onClick={handleClick}
                    >
                      Buy
                    </NavBarItemLink>
                  </Flex>

                  <NavBarItemLink
                    href="/consign"
                    textDecoration="none"
                    onClick={handleClick}
                  >
                    Sell
                  </NavBarItemLink>

                  <NavBarItemLink
                    href="/price-database"
                    textDecoration="none"
                    onClick={handleClick}
                  >
                    Price Database
                  </NavBarItemLink>

                  <Flex alignItems="center" display={["none", "none", "flex"]}>
                    <NavBarItemLink
                      href="/articles"
                      textDecoration="none"
                      onClick={handleClick}
                    >
                      Editorial
                    </NavBarItemLink>
                  </Flex>
                </Text>

                {isLoggedIn ? (
                  <NavBarLoggedInActionsQueryRenderer />
                ) : (
                  <Flex alignItems="center">
                    <Button
                      mx={1}
                      variant="secondaryOutline"
                      size="small"
                      onClick={() => {
                        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                        openAuthModal(mediator, {
                          mode: ModalType.login,
                          intent: Intent.login,
                          contextModule: ContextModule.header,
                        })
                      }}
                    >
                      Log In
                    </Button>

                    <Button
                      size="small"
                      onClick={() => {
                        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                        openAuthModal(mediator, {
                          mode: ModalType.signup,
                          intent: Intent.signup,
                          contextModule: ContextModule.header,
                        })
                      }}
                    >
                      Sign Up
                    </Button>
                  </Flex>
                )}
              </Flex>

              {/* Mobile. Triggers at the `xs` breakpoint. */}
              <Flex display={["flex", "none"]}>
                <NavBarItemButton
                  ml={1}
                  mr={-1}
                  width={40}
                  height={40}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={event => {
                    event.preventDefault()

                    const showMenu = !showMobileMenu

                    toggleMobileNav(showMenu)

                    if (showMenu) {
                      trackEvent({
                        action_type: AnalyticsSchema.ActionType.Click,
                        subject:
                          AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
                      })
                    }
                  }}
                >
                  <NavBarMobileMenuIcon open={showMobileMenu} />

                  {showNotificationCount && (
                    <NavBarMobileMenuInboxNotificationCountQueryRenderer />
                  )}
                </NavBarItemButton>
              </Flex>
            </Flex>

            {/* Second-tier */}
            {/* Desktop. Collapses into mobile at `xs` breakpoint. */}
            <Text
              display={["none", "flex"]}
              justifyContent="space-between"
              alignItems="stretch"
              flex={1}
              variant="sm"
              lineHeight={1}
            >
              <Flex alignItems="stretch">
                <Dropdown
                  zIndex={Z.dropdown}
                  keepInDOM
                  placement="bottom"
                  offset={0}
                  dropdown={({ setVisible }) => (
                    <NavBarSubMenu
                      menu={ARTISTS_SUBMENU_DATA.menu}
                      contextModule={
                        AnalyticsSchema.ContextModule.HeaderArtistsDropdown
                      }
                      onClick={() => setVisible(false)}
                    />
                  )}
                >
                  {({ anchorRef, anchorProps, visible }) => (
                    <NavBarItemButton
                      ref={anchorRef as any}
                      px={0}
                      pr={1}
                      active={visible}
                      {...anchorProps}
                    >
                      <NavBarItemUnfocusableAnchor
                        href="/artists"
                        onClick={handleClick}
                        data-label="Artists"
                      />
                      Artists
                    </NavBarItemButton>
                  )}
                </Dropdown>

                <Dropdown
                  zIndex={Z.dropdown}
                  keepInDOM
                  placement="bottom"
                  offset={0}
                  dropdown={({ setVisible }) => (
                    <NavBarSubMenu
                      menu={ARTWORKS_SUBMENU_DATA.menu}
                      contextModule={
                        AnalyticsSchema.ContextModule.HeaderArtworksDropdown
                      }
                      onClick={() => setVisible(false)}
                    />
                  )}
                >
                  {({ anchorRef, anchorProps, visible }) => (
                    <NavBarItemButton
                      ref={anchorRef as any}
                      active={visible}
                      {...anchorProps}
                    >
                      <NavBarItemUnfocusableAnchor
                        href="/collect"
                        onClick={handleClick}
                        data-label="Artworks"
                      />
                      Artworks
                    </NavBarItemButton>
                  )}
                </Dropdown>

                <NavBarItemLink href="/auctions" onClick={handleClick}>
                  Auctions
                </NavBarItemLink>

                <NavBarItemLink href="/viewing-rooms" onClick={handleClick}>
                  Viewing&nbsp;Rooms
                </NavBarItemLink>

                <NavBarItemLink href="/galleries" onClick={handleClick}>
                  Galleries
                </NavBarItemLink>

                <NavBarItemLink href="/art-fairs" onClick={handleClick}>
                  Fairs
                </NavBarItemLink>

                <NavBarItemLink href="/shows" onClick={handleClick}>
                  Shows
                </NavBarItemLink>

                <NavBarItemLink href="/institutions" onClick={handleClick}>
                  Museums
                </NavBarItemLink>

                <NavBarItemLink href="/nft" onClick={handleClick}>
                  NFTs
                </NavBarItemLink>
              </Flex>

              <Flex alignItems="stretch" display={["none", "none", "flex"]}>
                <NavBarItemButton
                  display={["none", "none", "flex", "flex"]}
                  px={0}
                  pl={1}
                  onClick={() => {
                    scrollIntoView({
                      selector: "#download-app-banner",
                      behavior: "smooth",
                    })
                  }}
                >
                  Download App
                </NavBarItemButton>
              </Flex>
            </Text>
          </HorizontalPadding>
        </AppContainer>
      </Box>

      {showMobileMenu && (
        <>
          <NavBarMobileMenu
            onClose={() => toggleMobileNav(false)}
            isOpen={showMobileMenu}
            onNavButtonClick={handleMobileNavClick}
          />
        </>
      )}
    </ThemeProviderV3>
  )
})
