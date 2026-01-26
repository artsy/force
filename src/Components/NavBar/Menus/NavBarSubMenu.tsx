import type { ClickedNavigationDropdownItem } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { MenuData } from "Components/NavBar/menuData"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type * as React from "react"
import { useTracking } from "react-tracking"
import { NavBarMenuItemLink } from "./NavBarMenuItem"
import { NavBarMenuItemFeaturedLinkWithColumn } from "./NavBarMenuItemFeaturedLink"

interface NavBarSubMenuProps {
  menu: MenuData
  contextModule: DeprecatedAnalyticsSchema.ContextModule
  parentNavigationItem: string
  /** Detect any click to possibly close the menu */
  onClick(): void
}

/** Component for full-width sub-menus (Artworks, Artists) */
export const NavBarSubMenu: React.FC<
  React.PropsWithChildren<NavBarSubMenuProps>
> = ({ menu, contextModule, parentNavigationItem, onClick }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

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

    trackEvent({
      action: "click",
      flow: "Header",
      // @ts-expect-error - ContextModule types between deprecated and new schema
      context_module: contextModule,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      parent_navigation_item: parentNavigationItem,
      dropdown_group: dropdownGroup,
      subject: text || "",
      destination_path: href || "",
    } satisfies ClickedNavigationDropdownItem)
  }

  const isArtistsDropdown =
    contextModule ===
    DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown

  // Find featured link and non-menu items
  const featuredLinkItem = menu.links.find(
    item => "type" in item && item.type === "FeaturedLink",
  )
  const lastMenuLinkIndex = menu.links.length - 1
  const lastMenuItem = menu.links[lastMenuLinkIndex]
  const viewAllMenuItem =
    !("links" in lastMenuItem) && "href" in lastMenuItem ? lastMenuItem : null

  // When there's NO featured link, use span=3 for normal layout
  // When there IS a featured link, use span=3 for nav columns within the nested grid
  const columnSpan = 3

  return (
    <Text width="100vw" variant={["xs", "xs", "sm"]} onClick={onClick}>
      <AppContainer>
        <HorizontalPadding>
          <GridColumns py={6} gridColumnGap={0} gridAutoRows="1fr">
            {featuredLinkItem ? (
              <>
                {/* Left outer column: contains nav columns and bottom elements */}
                <Column span={8}>
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

                          <Text variant="sm" mx={1}>
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
                {"type" in featuredLinkItem && (
                  <NavBarMenuItemFeaturedLinkWithColumn
                    setKey={featuredLinkItem.setKey}
                    headerText={featuredLinkItem.headerText}
                    contextModule={contextModule}
                    parentNavigationItem={parentNavigationItem}
                  />
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

                    <Text variant="sm" mx={1}>
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
