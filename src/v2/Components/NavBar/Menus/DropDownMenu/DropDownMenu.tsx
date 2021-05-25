import { Box, Flex, color, breakpoints, Text } from "@artsy/palette"
import { AnalyticsSchema, ContextModule } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import React from "react"
import styled from "styled-components"
import { DropDownSection } from "./DropDownSection"
import { Menu, MenuItem } from "v2/Components/Menu"
import { MenuData, SimpleLinkData } from "../../menuData"
import { ArtistsLetterNav } from "v2/Apps/Artists/Components/ArtistsLetterNav"

interface DropDownNavMenuProps {
  width?: string
  menu: MenuData
  contextModule: ContextModule
  onClick?: () => void
}

export const DropDownNavMenu: React.FC<DropDownNavMenuProps> = ({
  width = "100%",
  menu,
  contextModule,
  onClick,
}) => {
  const { trackEvent } = useTracking()

  const handleClick = event => {
    const link = event.target
    const text = link.textContent
    const href = link.parentNode.parentNode.getAttribute("href")

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: contextModule,
      subject: text,
      destination_path: href,
    })

    if (onClick) {
      onClick()
    }
  }

  const isArtistsDropdown =
    contextModule === AnalyticsSchema.ContextModule.HeaderArtistsDropdown

  const lastMenuLinkIndex = menu.links.length - 1
  const lastMenuItem = menu.links[lastMenuLinkIndex] as SimpleLinkData

  return (
    <Menu onClick={handleClick} width={width} py={0}>
      <Flex
        justifyContent={[
          "space-evenly",
          "space-evenly",
          "space-evenly",
          "center",
        ]}
      >
        <Flex width={breakpoints.xl} px={3}>
          <Links>
            <Box
              flexGrow={1}
              display="flex"
              flexDirection="column"
              mr={[1, 1, 2, 2]}
              width={[110, 135, 135, 170, 170]}
            >
              {menu.links.map((menuItem, i) => {
                if (!("menu" in menuItem)) {
                  const isLast = lastMenuLinkIndex === i

                  return (
                    !isLast && (
                      <LinkMenuItem key={menuItem.text} href={menuItem.href}>
                        {menuItem.text}
                      </LinkMenuItem>
                    )
                  )
                }
              })}
            </Box>
            <Box height={isArtistsDropdown ? "90px" : "auto"}>
              <ViewAllMenuItem key={lastMenuItem.text} href={lastMenuItem.href}>
                {lastMenuItem.text}
              </ViewAllMenuItem>
            </Box>
          </Links>

          <Flex flexDirection="column" pb={3}>
            <Flex>
              {menu.links.map(subMenu => {
                if ("menu" in subMenu) {
                  return (
                    <DropDownSection key={subMenu.text} section={subMenu} />
                  )
                }
              })}
            </Flex>
            {isArtistsDropdown && (
              <LettersWrap>
                <Text variant="small">Browse by name</Text>
                <Letters />
              </LettersWrap>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Menu>
  )
}

const LinkMenuItem = styled(MenuItem).attrs({
  px: 1,
  py: 0.5,
  color: "black60",
  variant: "text",
  hasLighterTextColor: true,
})``

LinkMenuItem.displayName = "LinkMenuItem"

const ViewAllMenuItem = styled(MenuItem).attrs({
  px: 1,
  py: 0.5,
  color: "black100",
  variant: "text",
  hasLighterTextColor: true,
})`
  margin-top: auto;
  text-decoration: underline;
`

ViewAllMenuItem.displayName = "ViewAllMenuItem"

const Links = styled(Flex).attrs({
  flexDirection: "column",
  py: 3,
  mr: [3, 3, 5, 5],
})`
  border-right: 1px solid ${color("black10")};
`

const LettersWrap = styled(Box).attrs({
  px: 1,
  height: "85px",
})``

LettersWrap.displayName = "LettersWrap"

const Letters = styled(ArtistsLetterNav).attrs({
  justifyContent: "flex-start",
})`
  margin-left: -6px;
  > div {
    width: 32px;
  }
`

Letters.displayName = "Letters"
