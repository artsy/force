import { Box, Text } from "@artsy/palette"
import { MenuLinkData } from "v2/Components/NavBar/menuData"
import React from "react"
import { TwoColumnDropDownSection } from "./TwoColumnDropDownSection"
import { MenuItem } from "v2/Components/Menu"

interface DropDownSectionProps {
  section: MenuLinkData
}

export const DropDownSection: React.FC<DropDownSectionProps> = ({
  section,
}) => {
  if (!section) return null

  return (
    <>
      {section.text === "Artist Nationality & Region" ? (
        <TwoColumnDropDownSection section={section} />
      ) : (
        <Box width={[110, 110, 110, 135, 170]} py={4} mr={[1, 1, 2, 2]}>
          <Text variant="small" mb={1} px={1}>
            {section.text}
          </Text>

          {section.menu &&
            section.menu.links.map(menuItem => {
              return (
                !("menu" in menuItem) && (
                  <MenuItem
                    key={menuItem.text}
                    px={1}
                    py={0.5}
                    href={menuItem.href}
                    color="black60"
                    variant="text"
                    hasLighterTextColor
                  >
                    {menuItem.text}
                  </MenuItem>
                )
              )
            })}
        </Box>
      )}
    </>
  )
}
