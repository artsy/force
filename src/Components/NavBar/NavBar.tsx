import {
  Box,
  Button,
  Clickable,
  Dropdown,
  Flex,
  Spacer,
  Text,
  THEME,
} from "@artsy/palette"
import CloseIcon from "@artsy/icons/CloseIcon"
import PersonIcon from "@artsy/icons/PersonIcon"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { useSystemContext } from "System/Hooks/useSystemContext"
import * as React from "react"
import { useEffect, useState } from "react"
import { NavBarSubMenu } from "./Menus"
import {
  NavBarMobileMenu,
  NavBarMobileMenuIcon,
} from "./NavBarMobileMenu/NavBarMobileMenu"
import {
  WHATS_NEW_SUBMENU_DATA,
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
} from "Components/NavBar/menuData"
import { ActionType } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Z } from "Apps/Components/constants"
import { NavBarLoggedOutActions } from "Components/NavBar/NavBarLoggedOutActions"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import Events from "Utils/Events"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { useTranslation } from "react-i18next"
import { track, useTracking } from "react-tracking"
import {
  NavBarItemButton,
  NavBarItemLink,
  NavBarItemUnfocusableAnchor,
} from "./NavBarItem"
import { NavBarLoggedInActionsQueryRenderer } from "./NavBarLoggedInActions"
import { NavBarMobileMenuNotificationsIndicatorQueryRenderer } from "./NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"
import { NavBarPrimaryLogo } from "./NavBarPrimaryLogo"
import { NavBarSkipLink } from "./NavBarSkipLink"
import { useNavBarHeight } from "./useNavBarHeight"
import { ProgressiveOnboardingFollowFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
import { ProgressiveOnboardingSaveFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind"
import { ProgressiveOnboardingAlertFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertFind"
import { SearchBar } from "Components/Search/SearchBar"
import { NavBarMobileMenuProfile } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuProfile"
import styled from "styled-components"

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
  const { user, isEigen } = useSystemContext()

  const { trackEvent } = useTracking()
  const { t } = useTranslation()
  const { router } = useRouter()

  const [mode, setMode] = useState<"Idle" | "Search" | "Profile" | "More">(
    "Idle"
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

  const handleMobileNavClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
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
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
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
                {isLoggedIn && (
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
              <Flex alignItems="stretch" minWidth={0}>
                <Dropdown
                  zIndex={Z.dropdown}
                  keepInDOM
                  placement="bottom"
                  offset={0}
                  dropdown={({ setVisible }) => (
                    <NavBarSubMenu
                      menu={WHATS_NEW_SUBMENU_DATA.menu}
                      contextModule={
                        DeprecatedAnalyticsSchema.ContextModule
                          .HeaderWhatsNewDropdown
                      }
                      onClick={() => setVisible(false)}
                    />
                  )}
                >
                  {({ anchorRef, anchorProps, visible, setVisible }) => (
                    <NavBarItemButton
                      ref={anchorRef as any}
                      px={0}
                      pr={1}
                      active={visible}
                      {...anchorProps}
                    >
                      <NavBarItemUnfocusableAnchor
                        href="/collection/new-this-week"
                        onClick={event => {
                          handleClick(event)

                          // Small timeout to avoid transition race condition
                          setTimeout(() => {
                            setVisible(false)
                          }, 100)
                        }}
                        data-label={WHATS_NEW_SUBMENU_DATA.text}
                      />
                      {WHATS_NEW_SUBMENU_DATA.text}
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
                      menu={ARTISTS_SUBMENU_DATA.menu}
                      contextModule={
                        DeprecatedAnalyticsSchema.ContextModule
                          .HeaderArtistsDropdown
                      }
                      onClick={() => setVisible(false)}
                    />
                  )}
                >
                  {({ anchorRef, anchorProps, visible, setVisible }) => (
                    <NavBarItemButton
                      ref={anchorRef as any}
                      active={visible}
                      {...anchorProps}
                    >
                      <NavBarItemUnfocusableAnchor
                        href="/artists"
                        onClick={event => {
                          handleClick(event)

                          // Small timeout to avoid transition race condition
                          setTimeout(() => {
                            setVisible(false)
                          }, 100)
                        }}
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
                  {({ anchorRef, anchorProps, visible, setVisible }) => (
                    <NavBarItemButton
                      ref={anchorRef as any}
                      active={visible}
                      {...anchorProps}
                    >
                      <NavBarItemUnfocusableAnchor
                        href="/collect"
                        onClick={event => {
                          handleClick(event)

                          // Small timeout to avoid transition race condition
                          setTimeout(() => {
                            setVisible(false)
                          }, 100)
                        }}
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
                  data-label="Fairs & Events"
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

                <NavBarItemInstitutionsLink
                  href="/institutions"
                  onClick={handleClick}
                  data-label="Institutions"
                >
                  {t`navbar.museums`}
                </NavBarItemInstitutionsLink>
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

const NavBarItemInstitutionsLink = styled(NavBarItemLink)`
  // Can no longer fit on screen @ 900px
  @media (max-width: 900px) {
    display: none;
  }
`
