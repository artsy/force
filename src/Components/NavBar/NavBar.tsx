import { ActionType } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import PersonIcon from "@artsy/icons/PersonIcon"
import { Box, Clickable, Flex, Spacer, THEME, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NavBarLoggedOutActions } from "Components/NavBar/NavBarLoggedOutActions"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
  WHATS_NEW_SUBMENU_DATA,
} from "Components/NavBar/menuData"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useNavigationData } from "System/Contexts/NavigationDataContext"
import Events from "Utils/Events"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import type * as React from "react"
import { useEffect, useState } from "react"
import {
  NavBarMobileMenu,
  NavBarMobileMenuIcon,
} from "./NavBarMobileMenu/NavBarMobileMenu"

import { AppDownloadBanner } from "Components/AppDownloadBanner"
import { NavBarMobileMenuProfile } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuProfile"
import { ProgressiveOnboardingAlertFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertFind"
import { ProgressiveOnboardingFollowFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
import { ProgressiveOnboardingSaveFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind"
import { SearchBar } from "Components/Search/SearchBar"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { Media } from "Utils/Responsive"
import { track, useTracking } from "react-tracking"
import styled from "styled-components"
import { NavBarDropdownPanel } from "./NavBarDropdownPanel"
import { NavBarDynamicContent } from "./NavBarDynamicContent"
import { NavBarItemButton, NavBarItemLink } from "./NavBarItem"
import { NavBarLoggedInActionsQueryRenderer } from "./NavBarLoggedInActions"
import { NavBarMobileMenuNotificationsIndicatorQueryRenderer } from "./NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { useNavBarHeight } from "./useNavBarHeight"

/**
 * NOTE: Fresnel doesn't work correctly here because this is included
 * on older CoffeeScript pages. Hence the `display={["none", "flex"]}` usage
 * (FIXME: Can use Fresnel now)
 */

export const NavBar: React.FC<React.PropsWithChildren<unknown>> = track(
  {
    flow: DeprecatedAnalyticsSchema.Flow.Header,
    context_module: DeprecatedAnalyticsSchema.ContextModule.Header,
  },
  {
    dispatch: data => Events.postEvent(data),
  },
)(() => {
  const { user, isEigen } = useSystemContext()

  const { prefetch } = usePrefetchRoute()

  const { trackEvent } = useTracking()

  const { router } = useRouter()

  // Get navigation data from context (provided by buildAppRoutes query)
  const navigationData = useNavigationData()

  const shouldUseServerNav =
    typeof window !== "undefined" &&
    (window as any).sd?.ENABLE_SERVER_DRIVEN_NAVIGATION

  const [mode, setMode] = useState<"Idle" | "Search" | "Profile" | "More">(
    "Idle",
  )

  const xs = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const sm = __internal__useMatchMedia(THEME.mediaQueries.sm)

  const isMobile = xs || sm
  const isLoggedIn = Boolean(user)
  const showNotificationCount = isLoggedIn && mode !== "More"

  const [transitionCount, setTransitionCount] = useState(0)

  const shouldTransition = transitionCount <= 1

  const GALLERY_PARTNERSHIPS_URL =
    "https://partners.artsy.net/gallery-partnerships/?utm_medium=internal-banner&utm_source=artsy&utm_campaign=b2b-2025-gallery-partnerships-application-banner-link&utm_sfc=701Hu000001jeLjIAI"

  // Close mobile menu if dragging window from small size to desktop
  useEffect(() => {
    if (!isMobile) {
      setMode("Idle")
    }
  }, [isMobile])

  // Prefetch most clicked links.
  // See: https://artsy.slack.com/archives/C05EEBNEF71/p1726074422149369?thread_ts=1726073316.088559&cid=C05EEBNEF71
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const PREFETCH_NAVBAR_LINKS = ["/artists", "/collect"]

    PREFETCH_NAVBAR_LINKS.forEach(prefetch)
  }, [])

  const handleMobileNavClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    let target = event.target as HTMLElement

    // Only close MobileNav if the underlying tapped element is a link.
    // Because event.target is the most nested element in the tree we lookup to
    // see if it's wrapped in a link.
    while (target !== event.currentTarget) {
      if (target instanceof HTMLAnchorElement) {
        setMode("Idle")
        return
      }
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      target = target.parentElement
    }
  }

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const link = event.currentTarget
    const text = (link.getAttribute("data-label") || link.textContent) ?? ""
    const href = link.getAttribute("href") as string

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      destination_path: href,
      subject: text,
    })
  }

  const { height } = useNavBarHeight()

  const handleNotificationsClick = () => {
    router.push("/notifications")

    trackEvent({
      action: ActionType.clickedNotificationsBell,
    })
  }

  const handleMobileSearchBarClose = () => {
    setMode("Idle")
  }

  const handleMenuEnter = () => {
    setTransitionCount(count => count + 1)
  }

  const handleMenuLeave = () => {
    // Reset the counter when leaving the navigation area completely
    setTransitionCount(0)
  }

  if (isEigen) {
    return null
  }

  return (
    <>
      <NavBarSkipLink />

      <Box
        as="header"
        bg="mono0"
        borderBottom="1px solid"
        borderColor="mono30"
        height={height}
      >
        <Media at="xs">
          <AppDownloadBanner />
        </Media>

        <AppContainer height={[null, "100%"]}>
          <HorizontalPadding
            as="nav"
            display="flex"
            flexDirection="column"
            height="100%"
          >
            {/* Top-tier */}
            <Flex pt={1} pb={[1, 0]} alignItems="stretch" flex={1}>
              <NavBarPrimaryLogo mr={[1, 2]} />

              <Flex
                flex={1}
                alignItems="center"
                // Update only on mobile
                position={[
                  `${mode === "Search" ? "absolute" : "relative"}`,
                  "relative",
                ]}
                width={[`${mode === "Search" ? "90%" : "auto"}`, "auto"]}
                zIndex={9}
              >
                <SearchBar onClose={handleMobileSearchBarClose} />

                {mode === "Search" && (
                  <Clickable
                    onClick={() => {
                      setMode("Idle")
                    }}
                    // Show only on mobile
                    display={["flex", "none"]}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CloseIcon width={22} height={22} />
                  </Clickable>
                )}
              </Flex>

              {/* Desktop. Collapses into mobile at `xs` breakpoint. */}
              <Flex display={["none", "flex"]} ml={2} alignItems="stretch">
                <Text variant="sm" lineHeight={1} display={["none", "flex"]}>
                  <Flex alignItems="center" display={["none", "flex"]}>
                    <NavBarItemLink
                      href="/collect"
                      onMouseOver={() => prefetch("/collect")}
                      textDecoration="none"
                      onClick={handleClick}
                      data-label="Buy"
                    >
                      Buy
                    </NavBarItemLink>
                  </Flex>

                  <NavBarItemLink
                    href={GALLERY_PARTNERSHIPS_URL}
                    textDecoration="none"
                    onClick={handleClick}
                    data-label="Artsy for Galleries"
                  >
                    Artsy for Galleries
                  </NavBarItemLink>

                  <NavBarItemLink
                    href="/price-database"
                    onMouseOver={() => prefetch("/price-database")}
                    textDecoration="none"
                    onClick={handleClick}
                    data-label="Price Database"
                  >
                    Price Database
                  </NavBarItemLink>

                  <Flex alignItems="center" display={["none", "flex"]}>
                    <NavBarItemLink
                      href="/articles"
                      onMouseOver={() => prefetch("/articles")}
                      textDecoration="none"
                      onClick={handleClick}
                      data-label="Articles"
                    >
                      Editorial
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
                {isLoggedIn ? (
                  <>
                    <NavBarItemButton
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      onClick={handleNotificationsClick}
                      aria-label="Notifications"
                    >
                      <BellStrokeIcon
                        aria-hidden="true"
                        height={22}
                        width={22}
                      />

                      {showNotificationCount && (
                        <NavBarMobileMenuNotificationsIndicatorQueryRenderer />
                      )}
                    </NavBarItemButton>

                    <ProgressiveOnboardingAlertFind>
                      <ProgressiveOnboardingFollowFind>
                        <ProgressiveOnboardingSaveFind>
                          <NavBarItemButton
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            aria-label="My Collection"
                            onClick={() => {
                              setMode("Profile")
                            }}
                          >
                            <PersonIcon
                              aria-hidden="true"
                              height={22}
                              width={22}
                            />
                          </NavBarItemButton>
                        </ProgressiveOnboardingSaveFind>
                      </ProgressiveOnboardingFollowFind>
                    </ProgressiveOnboardingAlertFind>
                  </>
                ) : (
                  <NavBarItemLink
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    aria-label="Login"
                    href="/login"
                  >
                    <PersonIcon aria-hidden="true" height={22} width={22} />
                  </NavBarItemLink>
                )}

                <NavBarItemButton
                  mr={-1}
                  width={40}
                  height={40}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  aria-label="Menu"
                  aria-expanded={mode === "More"}
                  onClick={event => {
                    event.preventDefault()

                    setMode("More")

                    trackEvent({
                      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                      subject:
                        DeprecatedAnalyticsSchema.Subject
                          .SmallScreenMenuSandwichIcon,
                    })
                  }}
                >
                  <NavBarMobileMenuIcon open={mode === "More"} />
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
              <Flex
                alignItems="stretch"
                minWidth={0}
                onMouseLeave={handleMenuLeave}
              >
                {shouldUseServerNav ? (
                  <NavBarDynamicContent
                    navigationData={navigationData}
                    onMenuEnter={handleMenuEnter}
                    handleClick={handleClick}
                    shouldTransition={shouldTransition}
                  />
                ) : (
                  <>
                    <NavBarDropdownPanel
                      href="/collection/new-this-week"
                      label={WHATS_NEW_SUBMENU_DATA.text}
                      menu={WHATS_NEW_SUBMENU_DATA.menu}
                      contextModule={
                        DeprecatedAnalyticsSchema.ContextModule
                          .HeaderWhatsNewDropdown
                      }
                      onMenuEnter={handleMenuEnter}
                      handleClick={handleClick}
                      shouldTransition={shouldTransition}
                    />

                    <NavBarDropdownPanel
                      href="/artists"
                      label="Artists"
                      menu={ARTISTS_SUBMENU_DATA.menu}
                      contextModule={
                        DeprecatedAnalyticsSchema.ContextModule
                          .HeaderArtistsDropdown
                      }
                      onMenuEnter={handleMenuEnter}
                      handleClick={handleClick}
                      shouldTransition={shouldTransition}
                    />

                    <NavBarDropdownPanel
                      href="/collect"
                      label="Artworks"
                      menu={ARTWORKS_SUBMENU_DATA.menu}
                      contextModule={
                        DeprecatedAnalyticsSchema.ContextModule
                          .HeaderArtworksDropdown
                      }
                      onMenuEnter={handleMenuEnter}
                      handleClick={handleClick}
                      shouldTransition={shouldTransition}
                    />
                  </>
                )}

                <NavBarItemLink
                  href="/auctions"
                  onMouseOver={() => prefetch("/auctions")}
                  onClick={handleClick}
                  data-label="Auctions"
                >
                  Auctions
                </NavBarItemLink>

                <NavBarItemLink
                  href="/viewing-rooms"
                  onMouseOver={() => prefetch("/viewing-rooms")}
                  onClick={handleClick}
                  data-label="Viewing Rooms"
                >
                  Viewing Rooms
                </NavBarItemLink>

                <NavBarItemLink
                  href="/galleries"
                  onMouseOver={() => prefetch("/galleries")}
                  onClick={handleClick}
                  data-label="Galleries"
                >
                  Galleries
                </NavBarItemLink>

                <NavBarItemFairsLink
                  href="/art-fairs"
                  onMouseOver={() => prefetch("/art-fairs")}
                  onClick={handleClick}
                  data-label="Fairs & Events"
                >
                  Fairs & Events
                </NavBarItemFairsLink>

                <NavBarItemLink
                  href="/shows"
                  onMouseOver={() => prefetch("/shows")}
                  onClick={handleClick}
                  data-label="Shows"
                >
                  Shows
                </NavBarItemLink>

                <NavBarItemInstitutionsLink
                  href="/institutions"
                  onMouseOver={() => prefetch("/institutions")}
                  onClick={handleClick}
                  data-label="Institutions"
                >
                  Museums
                </NavBarItemInstitutionsLink>

                <NavBarItemLink
                  href="/feature/how-to-buy-art"
                  onMouseOver={() => prefetch("/feature/how-to-buy-art")}
                  onClick={handleClick}
                  data-label="Collecting 101"
                >
                  Collecting 101
                </NavBarItemLink>
              </Flex>
            </Text>
          </HorizontalPadding>
        </AppContainer>
      </Box>

      {mode === "More" && (
        <NavBarMobileMenu
          onClose={() => setMode("Idle")}
          isOpen
          onNavButtonClick={handleMobileNavClick}
          shouldUseServerNav={shouldUseServerNav}
        />
      )}

      {mode === "Profile" && (
        <NavBarMobileMenuProfile
          onClose={() => setMode("Idle")}
          onNavButtonClick={handleMobileNavClick}
        />
      )}
    </>
  )
})

// Hide these links earlier to ensure "Collecting 101" has space on smaller widths

const NavBarItemFairsLink = styled(NavBarItemLink)`
  @media (max-width: 1000px) {
    display: none;
  }
`
const NavBarItemInstitutionsLink = styled(NavBarItemLink)`
  // Can no longer fit on screen @ 900px
  @media (max-width: 900px) {
    display: none;
  }
`
