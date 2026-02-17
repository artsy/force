import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Column, GridColumns, Spacer, Text, useDidMount } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { MenuData } from "Components/NavBar/menuData"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"
import { useState } from "react"
import { NavBarMenuItemLink } from "./NavBarMenuItem"
import { NavBarMenuItemFeaturedLinkWithColumn } from "./NavBarMenuItemFeaturedLink"
import { useNavBarTracking } from "../useNavBarTracking"

interface NavBarSubMenuProps {
  menu: MenuData
  contextModule: DeprecatedAnalyticsSchema.ContextModule
  parentNavigationItem: string
  /** Detect any click to possibly close the menu */
  onClick(): void
  /** Whether the dropdown is currently visible */
  isVisible?: boolean
}

/** Component for full-width sub-menus (Artworks, Artists) */
export const NavBarSubMenu: React.FC<
  React.PropsWithChildren<NavBarSubMenuProps>
> = ({ menu, contextModule, parentNavigationItem, onClick, isVisible }) => {
  const tracking = useNavBarTracking()
  const isMounted = useDidMount()
  const enableVisualComponents = useFlag("onyx_nav-submenu-visual-component")
  const [hasVisualComponentData, setHasVisualComponentData] = useState<
    boolean | null
  >(null)

  // Only show visual components after client mount and when flag is enabled
  // (useFlag is not isomorphic, so we need to wait for client-side mount)
  const shouldEnableVisualComponents = isMounted && enableVisualComponents

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const link = event.currentTarget
    const text = link.textContent?.trim() || link.innerText
    const href = link.getAttribute("href") || ""

    // Find the dropdown group by checking which submenu this link belongs to
    let dropdownGroup: string | undefined
    for (const item of menu.links) {
      if ("menu" in item && item.menu) {
        const isInSubmenu = item.menu.links.some(
          menuItem =>
            !("menu" in menuItem) &&
            "href" in menuItem &&
            menuItem.href === href,
        )
        if (isInSubmenu) {
          dropdownGroup = item.text
          break
        }
      }
    }

    tracking.clickedNavigationDropdownItem({
      contextModule,
      parentNavigationItem,
      dropdownGroup,
      subject: text || "",
      destinationPath: href || "",
    })
  }

  const isArtistsDropdown =
    contextModule ===
    DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown

  // Find featured link and non-menu items
  const featuredLinkItem = menu.links.find(
    item => "type" in item && item.type === "FeaturedLink",
  )

  // Only show featured link if feature flag is enabled, component is mounted, and data loaded successfully
  const shouldShowFeaturedLink =
    shouldEnableVisualComponents &&
    featuredLinkItem &&
    hasVisualComponentData === true

  const lastMenuLinkIndex = menu.links.length - 1
  const lastMenuItem = menu.links[lastMenuLinkIndex]
  const viewAllMenuItem =
    !("links" in lastMenuItem) && "href" in lastMenuItem ? lastMenuItem : null

  const columnSpan = 3

  // Decide whether to try loading visual component
  const shouldTryVisualComponent =
    shouldEnableVisualComponents && featuredLinkItem

  return (
    <Text width="100vw" variant={["xs", "xs", "sm"]} onClick={onClick}>
      <AppContainer>
        <HorizontalPadding>
          <GridColumns
            py={6}
            gridColumnGap={0}
            gridAutoRows={shouldShowFeaturedLink ? "1fr" : "auto"}
          >
            {shouldTryVisualComponent ? (
              <>
                {/* Left outer column: contains nav columns and bottom elements */}
                <Column span={shouldShowFeaturedLink ? 8 : 12}>
                  <GridColumns gridColumnGap={0}>
                    {menu.links.map(subMenu => {
                      if ("menu" in subMenu) {
                        return (
                          <Column key={subMenu.text} span={columnSpan}>
                            <Text variant="xs" px={2} color="mono60">
                              {subMenu.text}
                            </Text>

                            <Spacer y={1} />

                            {subMenu.menu &&
                              subMenu.menu.links.map(menuItem => {
                                return (
                                  !("menu" in menuItem) &&
                                  "href" in menuItem && (
                                    <NavBarMenuItemLink
                                      key={menuItem.text}
                                      to={menuItem.href}
                                      onClick={handleClick}
                                    >
                                      {menuItem.text}
                                    </NavBarMenuItemLink>
                                  )
                                )
                              })}
                          </Column>
                        )
                      }
                      return null
                    })}

                    {isArtistsDropdown ? (
                      <>
                        {viewAllMenuItem && (
                          <Column span={3}>
                            <NavBarMenuItemLink
                              to={viewAllMenuItem.href}
                              onClick={handleClick}
                            >
                              {viewAllMenuItem.text}
                            </NavBarMenuItemLink>
                          </Column>
                        )}
                        <Column span={8}>
                          <Text variant="xs" py={1} px={2} color="mono60">
                            Browse by name
                          </Text>

                          <Text variant="sm" lineHeight="16px" mx={1}>
                            {LETTERS.map(letter => {
                              return (
                                <RouterLink
                                  key={letter}
                                  to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
                                  title={`View artists starting with "${letter}"`}
                                  display="inline-block"
                                  textDecoration="none"
                                  p={1}
                                  onClick={handleClick}
                                >
                                  {letter}
                                </RouterLink>
                              )
                            })}
                          </Text>
                        </Column>
                      </>
                    ) : (
                      viewAllMenuItem && (
                        <Column span={9}>
                          <NavBarMenuItemLink
                            to={viewAllMenuItem.href}
                            onClick={handleClick}
                          >
                            {viewAllMenuItem.text}
                          </NavBarMenuItemLink>
                        </Column>
                      )
                    )}
                  </GridColumns>
                </Column>

                {/* Right outer column: visual component */}
                {shouldShowFeaturedLink && "type" in featuredLinkItem && (
                  <NavBarMenuItemFeaturedLinkWithColumn
                    setKey={featuredLinkItem.setKey}
                    headerText={featuredLinkItem.headerText}
                    contextModule={contextModule}
                    parentNavigationItem={parentNavigationItem}
                    onDataLoaded={setHasVisualComponentData}
                    isVisible={isVisible}
                  />
                )}
                {/* Hidden query to check if data exists */}
                {!shouldShowFeaturedLink && "type" in featuredLinkItem && (
                  <div style={{ position: "absolute", visibility: "hidden" }}>
                    <NavBarMenuItemFeaturedLinkWithColumn
                      setKey={featuredLinkItem.setKey}
                      headerText={featuredLinkItem.headerText}
                      contextModule={contextModule}
                      parentNavigationItem={parentNavigationItem}
                      onDataLoaded={setHasVisualComponentData}
                      isVisible={isVisible}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Normal layout without featured link */}
                {menu.links.map(subMenu => {
                  if ("menu" in subMenu) {
                    return (
                      <Column key={subMenu.text} span={columnSpan}>
                        <Text variant="xs" px={2} color="mono60">
                          {subMenu.text}
                        </Text>

                        <Spacer y={1} />

                        {subMenu.menu &&
                          subMenu.menu.links.map(menuItem => {
                            return (
                              !("menu" in menuItem) &&
                              "href" in menuItem && (
                                <NavBarMenuItemLink
                                  key={menuItem.text}
                                  to={menuItem.href}
                                  onClick={handleClick}
                                >
                                  {menuItem.text}
                                </NavBarMenuItemLink>
                              )
                            )
                          })}
                      </Column>
                    )
                  }
                  return null
                })}

                {viewAllMenuItem && (
                  <Column span={columnSpan}>
                    <NavBarMenuItemLink
                      to={viewAllMenuItem.href}
                      onClick={handleClick}
                    >
                      {viewAllMenuItem.text}
                    </NavBarMenuItemLink>
                  </Column>
                )}

                {isArtistsDropdown && (
                  <Column span={9}>
                    <Text variant="xs" py={1} px={2} color="mono60">
                      Browse by name
                    </Text>

                    <Text variant="sm" lineHeight="16px" mx={1}>
                      {LETTERS.map(letter => {
                        return (
                          <RouterLink
                            key={letter}
                            to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
                            title={`View artists starting with "${letter}"`}
                            display="inline-block"
                            textDecoration="none"
                            p={1}
                            onClick={handleClick}
                          >
                            {letter}
                          </RouterLink>
                        )
                      })}
                    </Text>
                  </Column>
                )}
              </>
            )}
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </Text>
  )
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
