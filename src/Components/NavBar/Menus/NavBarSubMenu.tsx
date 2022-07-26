import { Box, Text, GridColumns, Column, Flex } from "@artsy/palette"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import * as React from "react"
import { MenuData, SimpleLinkData } from "../menuData"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NavBarMenuItemLink } from "./NavBarMenuItem"
import { RouterLink } from "System/Router/RouterLink"

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
    const href = link.getAttribute("href")!

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
  const lastMenuItem = menu.links[lastMenuLinkIndex] as SimpleLinkData

  return (
    <Text width="100vw" variant={["xs", "xs", "sm"]} onClick={onClick}>
      <AppContainer>
        <HorizontalPadding>
          <GridColumns>
            <Column
              span={2}
              py={6}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              borderRight="1px solid"
              borderColor="black10"
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

              <NavBarMenuItemLink to={lastMenuItem.href}>
                {lastMenuItem.text}
              </NavBarMenuItemLink>
            </Column>

            <Column
              span={10}
              py={6}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Flex>
                {menu.links.map(subMenu => {
                  if ("menu" in subMenu) {
                    return (
                      <Box key={subMenu.text} flex={1}>
                        <Text variant="xs" mb={1} px={2} color="black60">
                          {subMenu.text}
                        </Text>

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
                      </Box>
                    )
                  }
                })}
              </Flex>

              {isArtistsDropdown && (
                <Box>
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
                </Box>
              )}
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </Text>
  )
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
