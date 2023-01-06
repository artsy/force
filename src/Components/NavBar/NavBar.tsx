import { useEffect, useState } from "react"
import * as React from "react"
import {
  Button,
  Flex,
  themeProps,
  Text,
  Dropdown,
  Box,
  BellIcon,
  SoloIcon,
  Clickable,
  CloseIcon,
  Spacer,
} from "@artsy/palette"
import { useSystemContext } from "System/SystemContext"
import { SearchBarQueryRenderer } from "Components/Search/SearchBar"
import { NavBarSubMenu } from "./Menus"
import {
  NavBarMobileMenu,
  NavBarMobileMenuIcon,
} from "./NavBarMobileMenu/NavBarMobileMenu"

import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "Components/NavBar/menuData"

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
import { useFeatureFlag } from "System/useFeatureFlag"
import { useRouter } from "System/Router/useRouter"
import { NavBarLoggedOutActions } from "Components/NavBar/NavBarLoggedOutActions"

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
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const { user, isEigen } = useSystemContext()

  const { jumpTo } = useJump({ behavior: "smooth" })
  const { trackEvent } = useTracking()
  const { t } = useTranslation()
  const { router } = useRouter()
  const [showMobileMenu, toggleMobileNav] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
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

  if (isEigen) {
    return null
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
              <Flex display={["flex", "none"]} py={1}>
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

              <Flex
                flex={1}
                alignItems="center"
                onFocus={() => {
                  setSearchFocused(true)
                }}
                // update only on mobile
                position={[
                  `${searchFocused ? "absolute" : "relative"}`,
                  "relative",
                ]}
                width={[`${searchFocused ? "90%" : "auto"}`, "auto"]}
                zIndex={9}
              >
                <SearchBarQueryRenderer width="100%" />

                {searchFocused && (
                  <Clickable
                    onClick={() => {
                      setSearchFocused(false)
                    }}
                    // show only on mobile
                    display={["flex", "none"]}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CloseIcon width={22} height={22} />
                  </Clickable>
                )}
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
                  <>
                    <Spacer x={1} />

                    <NavBarLoggedOutActions />
                  </>
                )}
              </Flex>

              {/* Mobile. Triggers at the `xs` breakpoint. */}
              <Flex display={["flex", "none"]}>
                {isLoggedIn && isCollectorProfileEnabled && (
                  <>
                    <NavBarItemButton
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      onClick={() => router.push("/notifications")}
                    >
                      <BellIcon aria-hidden="true" height={22} width={22} />
                      {renderNotificationsIndicator()}
                    </NavBarItemButton>

                    <NavBarItemButton
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      onClick={() =>
                        router.push("/collector-profile/my-collection")
                      }
                    >
                      <SoloIcon aria-hidden="true" height={22} width={22} />
                    </NavBarItemButton>
                  </>
                )}
                <NavBarItemButton
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
                  {!isCollectorProfileEnabled && renderNotificationsIndicator()}
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
