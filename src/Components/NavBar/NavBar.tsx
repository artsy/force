import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import PersonIcon from "@artsy/icons/PersonIcon"
import { Box, Clickable, Flex, Spacer, THEME, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NavBarLoggedOutActions } from "Components/NavBar/NavBarLoggedOutActions"
import { useNavigationData } from "System/Contexts/NavigationDataContext"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import Events from "Utils/Events"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import type * as React from "react"
import { useEffect, useState } from "react"
import {
  NavBarDropdownProvider,
  useNavBarDropdown,
} from "./NavBarDropdownContext"
import {
  NavBarMobileMenu,
  NavBarMobileMenuIcon,
} from "./NavBarMobileMenu/NavBarMobileMenu"

import { AppDownloadBanner } from "Components/AppDownloadBanner"
import { NavBarDesktopItem } from "Components/NavBar/NavBarDesktopItem"
import {
  DESKTOP_SECOND_TIER,
  DESKTOP_TOP_TIER,
  NAV_ITEMS,
} from "Components/NavBar/navItems"
import { NavBarMobileMenuProfile } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuProfile"
import { ProgressiveOnboardingAlertFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertFind"
import { ProgressiveOnboardingFollowFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
import { ProgressiveOnboardingSaveFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind"
import { SearchBar } from "Components/Search/SearchBar"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { Media } from "Utils/Responsive"
import { track } from "react-tracking"
import { NavBarItemButton, NavBarItemLink } from "./NavBarItem"
import { NavBarLoggedInActionsQueryRenderer } from "./NavBarLoggedInActions"
import { NavBarMobileMenuNotificationsIndicatorQueryRenderer } from "./NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { useNavBarHeight } from "./useNavBarHeight"
import { useNavBarTracking } from "./useNavBarTracking"

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

  const tracking = useNavBarTracking()

  const { router } = useRouter()

  // Get navigation data from context (provided by buildAppRoutes query)
  const navigationData = useNavigationData()

  const [mode, setMode] = useState<"Idle" | "Search" | "Profile" | "More">(
    "Idle",
  )

  const xs = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const sm = __internal__useMatchMedia(THEME.mediaQueries.sm)

  const isMobile = xs || sm
  const isLoggedIn = Boolean(user)
  const showNotificationCount = isLoggedIn && mode !== "More"

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

    tracking.clickedNavLink({
      subject: text,
      destinationPath: href,
    })
  }

  const { height } = useNavBarHeight()

  const handleNotificationsClick = () => {
    router.push("/notifications")

    tracking.clickedNotificationsBell()
  }

  const handleMobileSearchBarClose = () => {
    setMode("Idle")
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
                  {DESKTOP_TOP_TIER.map(id => {
                    return (
                      <NavBarDesktopItem
                        key={id}
                        item={NAV_ITEMS[id]}
                        navigationData={navigationData}
                        handleClick={handleClick}
                      />
                    )
                  })}
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

                    tracking.clickedMobileMenuHamburger()
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
              <NavBarDropdownProvider>
                <NavBarDropdownArea>
                  {DESKTOP_SECOND_TIER.map(id => {
                    return (
                      <NavBarDesktopItem
                        key={id}
                        item={NAV_ITEMS[id]}
                        navigationData={navigationData}
                        handleClick={handleClick}
                      />
                    )
                  })}
                </NavBarDropdownArea>
              </NavBarDropdownProvider>
            </Text>
          </HorizontalPadding>
        </AppContainer>
      </Box>

      {mode === "More" && (
        <NavBarMobileMenu
          navigationData={navigationData}
          onClose={() => setMode("Idle")}
          isOpen
          onNavButtonClick={handleMobileNavClick}
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

const NavBarDropdownArea: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { handleMenuLeave } = useNavBarDropdown()

  return (
    <Flex alignItems="stretch" minWidth={0} onMouseLeave={handleMenuLeave}>
      {children}
    </Flex>
  )
}
