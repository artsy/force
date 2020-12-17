import { Box, Flex, color } from "@artsy/palette"
import { AnalyticsSchema, ContextModule } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import React from "react"
import styled from "styled-components"
import { DropDownSection } from "./DropDownSection"
import { Menu, MenuItem } from "v2/Components/Menu"
import { MenuData } from "../../menuData"

const LinkMenuItem = styled(MenuItem).attrs({
  color: "black60",
  hasLighterTextColor: true,
  px: 1,
  py: 0.5,
  variant: "text",
})``

LinkMenuItem.displayName = "LinkMenuItem"

const ViewAllMenuItem = styled(MenuItem).attrs({
  color: "black100",
  hasLighterTextColor: true,
  px: 1,
  py: 0.5,
  variant: "text",
})`
  margin-top: auto;
  text-decoration: underline;
`

ViewAllMenuItem.displayName = "ViewAllMenuItem"

const Links = styled(Box)`
  border-right: 1px solid ${color("black10")};
`

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
      destination_path: href,
      subject: text,
    })

    if (onClick) {
      onClick()
    }
  }

  return (
    <Menu onClick={handleClick} width={width} py={0}>
      <Flex justifyContent="center">
        <Links py={3} mr={[3, 3, 3, "50px"]}>
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            mr={[1, 1, 2, 2]}
            width={[110, 110, 110, 135, 170]}
          >
            {menu.links.map((menuItem, i) => {
              if (!("menu" in menuItem)) {
                const isLast = menu.links.length - 1 === i

                return isLast ? (
                  <ViewAllMenuItem key={menuItem.text} href={menuItem.href}>
                    {menuItem.text}
                  </ViewAllMenuItem>
                ) : (
                  <LinkMenuItem key={menuItem.text} href={menuItem.href}>
                    {menuItem.text}
                  </LinkMenuItem>
                )
              }
            })}
          </Box>
        </Links>

        {menu.links.map(subMenu => {
          if ("menu" in subMenu) {
            return <DropDownSection key={subMenu.text} section={subMenu} />
          }
        })}
      </Flex>
    </Menu>
  )
}
