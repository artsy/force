import { useEffect, useState } from "react"
import * as React from "react"
import { Button, Flex, themeProps, Text, Dropdown, Box } from "@artsy/palette"
import { useSystemContext } from "System/SystemContext"
import { SearchBarQueryRenderer } from "Components/Search/SearchBar"
import { NavBarSubMenu } from "./Menus"
import {
  NavBarMobileMenu,
  NavBarMobileMenuIcon,
} from "./NavBarMobileMenu/NavBarMobileMenu"
import { ModalType } from "Components/Authentication/Types"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "Components/NavBar/menuData"
import { openAuthModal } from "Utils/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { track } from "react-tracking"
import Events from "Utils/Events"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { NavBarLoggedInActionsQueryRenderer } from "./NavBarLoggedInActions"
import {
  NavBarItemButton,
  NavBarItemLink,
  NavBarItemUnfocusableAnchor,
} from "./NavBarItem"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useNavBarHeight } from "./useNavBarHeight"
import { RouterLink } from "System/Router/RouterLink"
import { useTracking } from "react-tracking"
import { Z } from "Apps/Components/constants"
import { useTranslation } from "react-i18next"
import { NavBarMobileMenuNotificationsIndicatorQueryRenderer } from "./NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"
import { useJump } from "Utils/Hooks/useJump"

/**
 * NOTE: Fresnel doesn't work correctly here because this is included
 * on older CoffeeScript pages. Hence the `display={["none", "flex"]}` usage
 * (FIXME: Can use Fresnel now)
 */

export const NavBar: React.FC = track(
  {
    flow: DeprecatedAnalyticsSchema.Flow.Header,
    context_module: DeprecatedAnalyticsSchema.ContextModule.Header,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)(() => {
  const { mediator, user, isEigen } = useSystemContext()

  // FIXME: Doesn't follow rules of hooks
  if (isEigen) {
    return null
  }

  const { jumpTo } = useJump({ behavior: "smooth" })
  const { trackEvent } = useTracking()
  const { t } = useTranslation()
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
    const text = (link.getAttribute("data-label") || link.textContent) ?? ""
    const href = link.getAttribute("href")!

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      destination_path: href,
      subject: text,
    })
  }

  const { height } = useNavBarHeight()

  const renderNotificationsIndicator = () => {
    if (!showNotificationCount) {
      return null
    }

    return <NavBarMobileMenuNotificationsIndicatorQueryRenderer />
  }

  return (
    <>
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
                  variant="secondaryBlack"
                  flex={1}
                  size="small"
                >
                  {t`navbar.signup`}
                </Button>

                <Button
                  // @ts-ignore
                  as={RouterLink}
                  to="/login"
                  flex={1}
                  ml={1}
                  size="small"
                >
                  {t`navbar.login`}
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
                      data-label="Buy"
                    >
                      {t("navbar.buy")}
                    </NavBarItemLink>
                  </Flex>

                  <NavBarItemLink
                    href="/sell"
                    textDecoration="none"
                    onClick={handleClick}
                    data-label="Consign"
                  >
                    {t("navbar.sell")}
                  </NavBarItemLink>

                  <NavBarItemLink
                    href="/price-database"
                    textDecoration="none"
                    onClick={handleClick}
                    data-label="Price Database"
                  >
                    {t`navbar.priceDatabase`}
                  </NavBarItemLink>

                  <Flex alignItems="center" display={["none", "flex"]}>
                    <NavBarItemLink
                      href="/articles"
                      textDecoration="none"
                      onClick={handleClick}
                      data-label="Articles"
                    >
                      {t`navbar.editorial`}
                    </NavBarItemLink>
                  </Flex>
                </Text>

                {isLoggedIn ? (
                  <NavBarLoggedInActionsQueryRenderer />
                ) : (
                  <Flex alignItems="center">
                    <Button
                      mx={1}
                      variant="secondaryBlack"
                      size="small"
                      onClick={() => {
                        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                        openAuthModal(mediator, {
                          mode: ModalType.login,
                          intent: Intent.login,
                          contextModule: ContextModule.header,
                          copy:
                            "Log in to collect art by the world’s leading artists",
                        })
                      }}
                    >
                      {t`navbar.login`}
                    </Button>

                    <Button
                      size="small"
                      onClick={() => {
                        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                        openAuthModal(mediator, {
                          mode: ModalType.signup,
                          intent: Intent.signup,
                          contextModule: ContextModule.header,
                          copy:
                            "Sign up to collect art by the world’s leading artists",
                          redirectTo: window.location.href,
                        })
                      }}
                    >
                      {t`navbar.signup`}
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
                        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                        subject:
                          DeprecatedAnalyticsSchema.Subject
                            .SmallScreenMenuSandwichIcon,
                      })
                    }
                  }}
                >
                  <NavBarMobileMenuIcon open={showMobileMenu} />

                  {renderNotificationsIndicator()}
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
                        DeprecatedAnalyticsSchema.ContextModule
                          .HeaderArtistsDropdown
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
                      {t`navbar.artists`}
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
                        DeprecatedAnalyticsSchema.ContextModule
                          .HeaderArtworksDropdown
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
                      {t`navbar.artworks`}
                    </NavBarItemButton>
                  )}
                </Dropdown>

                <NavBarItemLink
                  href="/auctions"
                  onClick={handleClick}
                  data-label="Auctions"
                >
                  {t`navbar.auctions`}
                </NavBarItemLink>

                <NavBarItemLink
                  href="/viewing-rooms"
                  onClick={handleClick}
                  data-label="Viewing Rooms"
                >
                  {t`navbar.viewingRooms`}
                </NavBarItemLink>

                <NavBarItemLink
                  href="/galleries"
                  onClick={handleClick}
                  data-label="Galleries"
                >
                  {t`navbar.galleries`}
                </NavBarItemLink>

                <NavBarItemLink
                  href="/art-fairs"
                  onClick={handleClick}
                  data-label="Fairs"
                >
                  {t`navbar.fairs`}
                </NavBarItemLink>

                <NavBarItemLink
                  href="/shows"
                  onClick={handleClick}
                  data-label="Shows"
                >
                  {t`navbar.shows`}
                </NavBarItemLink>

                <NavBarItemLink
                  href="/institutions"
                  onClick={handleClick}
                  data-label="Institutions"
                >
                  {t`navbar.museums`}
                </NavBarItemLink>
              </Flex>

              <Flex alignItems="stretch" display={["none", "none", "flex"]}>
                <NavBarItemButton
                  display={["none", "none", "flex", "flex"]}
                  px={0}
                  pl={1}
                  onClick={() => {
                    jumpTo("download-app-banner")
                  }}
                >
                  {t`navbar.downloadApp`}
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
    </>
  )
})
