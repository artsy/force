import { Box, color, Flex, Menu, MenuItem } from "@artsy/palette"
import { AnalyticsSchema, ContextModule } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import React from "react"
import styled from "styled-components"
import { DropDownSection } from "./DropDownSection"

interface DropDownNavMenuProps {
  width?: string
  menu: any
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
  const viewAllTopMargin = {
    HeaderArtworksDropdown: "120px",
    HeaderArtistsDropdown: "80px",
  }

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

  return (
    <Menu onClick={handleClick} width={width} m={0} py={0}>
      <Flex justifyContent="center">
        <SimpleLinksContainer
          mt={0.5}
          py={3}
          mr={[3, 3, 3, "50px"]}
          viewAllTopMargin={viewAllTopMargin[contextModule]}
        >
          <Box mr={[1, 1, 2, 2]} width={[110, 110, 110, 135, 170]}>
            {menu.links.map(menuItem => {
              if (!menuItem.menu) {
                return (
                  <MenuItemContainer key={menuItem.text}>
                    <MenuItem
                      px={1}
                      py={0.5}
                      href={menuItem.href}
                      textColor={color("black60")}
                      textWeight="regular"
                      fontSize="3t"
                      hasLighterTextColor
                    >
                      {menuItem.text}
                    </MenuItem>
                  </MenuItemContainer>
                )
              }
            })}
          </Box>
        </SimpleLinksContainer>

        {menu.links.map(subMenu => {
          if (subMenu.menu) {
            return <DropDownSection key={subMenu.text} section={subMenu} />
          }
        })}
      </Flex>
    </Menu>
  )
}

export const MenuItemContainer = styled(Box)``

const SimpleLinksContainer = styled(Box) <{ viewAllTopMargin: string }>`
  border-right: 1px solid ${color("black10")};
  ${MenuItemContainer} {
    &:last-child {
      margin-top: ${p => p.viewAllTopMargin};
      text-decoration: underline;
      div div {
        color: ${color("black100")};
      }
    }
  }
`
