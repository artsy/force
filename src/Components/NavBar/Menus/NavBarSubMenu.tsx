import { Box, Text, GridColumns, Column, Spacer } from "@artsy/palette"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import * as React from "react"
import { MenuData } from "Components/NavBar/menuData"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NavBarMenuItemLink } from "./NavBarMenuItem"
import { RouterLink } from "System/Components/RouterLink"

interface NavBarSubMenuProps {
  menu: MenuData
  contextModule: DeprecatedAnalyticsSchema.ContextModule
  /** Detect any click to possibly close the menu */
  onClick(): void
}

/** Component for full-width sub-menus (Artworks, Artists) */
export const NavBarSubMenu: React.FC<NavBarSubMenuProps> = ({
  menu,
  contextModule,
  onClick,
}) => {
  const { trackEvent } = useTracking()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const link = event.currentTarget
    const text = link.innerText
    const href = link.getAttribute("href")

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      subject: text,
      destination_path: href,
      // @ts-ignore
      context_module: contextModule,
    })
  }

  const isArtistsDropdown =
    contextModule ===
    DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown

  const lastMenuLinkIndex = menu.links.length - 1
  const lastMenuItem = menu.links[lastMenuLinkIndex]
  const viewAllMenuItem =
    !("links" in lastMenuItem) && "href" in lastMenuItem ? lastMenuItem : null

  return (
    <Text width="100vw" variant={["xs", "xs", "sm"]} onClick={onClick}>
      <AppContainer>
        <HorizontalPadding>
          <GridColumns py={6} gridColumnGap={0}>
            {menu.links.map(subMenu => {
              if ("menu" in subMenu) {
                return (
                  <Column key={subMenu.text} span={3}>
                    <Text variant="xs" px={2} color="black60">
                      {subMenu.text}
                    </Text>

                    <Spacer y={1} />

                    {subMenu.menu &&
                      subMenu.menu.links.map(menuItem => {
                        return (
                          !("menu" in menuItem) && (
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
            })}

            <>
              <Column
                span={3}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box>
                  {menu.links.map((menuItem, i) => {
                    if (!("menu" in menuItem)) {
                      const isLast = lastMenuLinkIndex === i

                      return (
                        !isLast && (
                          <NavBarMenuItemLink
                            key={menuItem.text}
                            to={menuItem.href}
                            onClick={handleClick}
                          >
                            {menuItem.text}
                          </NavBarMenuItemLink>
                        )
                      )
                    }
                  })}
                </Box>

                {viewAllMenuItem && (
                  <NavBarMenuItemLink to={viewAllMenuItem.href}>
                    {viewAllMenuItem.text}
                  </NavBarMenuItemLink>
                )}
              </Column>

              {isArtistsDropdown && (
                <Column span={9}>
                  <Text variant="xs" py={1} px={2} color="black60">
                    Browse by name
                  </Text>

                  <Text variant="sm" mx={1}>
                    {LETTERS.map(letter => {
                      return (
                        <RouterLink
                          key={letter}
                          to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
                          title={`View artists starting with “${letter}”`}
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
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </Text>
  )
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
