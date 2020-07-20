import { Box, Flex, Sans } from "@artsy/palette"
import { MenuLinkData, SimpleLinkData } from "v2/Components/NavBar/menuData"
import React from "react"

import { MenuItem } from "v2/Components/Menu"

interface TwoColumnDropDownSectionProps {
  section: MenuLinkData
}

export const TwoColumnDropDownSection: React.FC<TwoColumnDropDownSectionProps> = ({
  section,
}) => {
  // The data for nationality and region are represented in a single array, but
  // visually they should be shown as two distinct columns. This is the only
  // section that behaves this way so we've created a separate component for it.
  const nationalities = section.menu.links.slice(0, 8)
  const regions = section.menu.links.slice(-8)

  return (
    <Flex>
      <Box width={[110, 110, 110, 135, 170]} py={4} mr={[1, 1, 2, 2]}>
        <Box width={[110, 110, 180, 180, 190]}>
          <Sans size="2" mb={1} px={1}>
            {section.text}
          </Sans>
        </Box>
        {section.menu &&
          nationalities.map((menuItem: SimpleLinkData) => {
            return (
              <MenuItem
                key={menuItem.text}
                px={1}
                py={0.5}
                href={menuItem.href}
                color="black60"
                hasLighterTextColor
              >
                {menuItem.text}
              </MenuItem>
            )
          })}
      </Box>
      <Box width={[110, 110, 110, 135, 170]} pt="66px" pb={4} mr={[1, 1, 2, 2]}>
        {section.menu &&
          regions.map((menuItem: SimpleLinkData) => {
            return (
              <MenuItem
                key={menuItem.text}
                px={1}
                py={0.5}
                href={menuItem.href}
                color="black60"
                hasLighterTextColor
              >
                {menuItem.text}
              </MenuItem>
            )
          })}
      </Box>
    </Flex>
  )
}
