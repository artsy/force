import { Box, color, MenuItem, Sans } from "@artsy/palette"
import { MenuLinkData, SimpleLinkData } from "v2/Components/NavBar/menuData"
import React from "react"
import { TwoColumnDropDownSection } from "./TwoColumnDropDownSection"

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
            <Sans size="2" mb={1} px={1}>
              {section.text}
            </Sans>
            {section.menu &&
              section.menu.links.map((menuItem: SimpleLinkData) => {
                return (
                  <MenuItem
                    key={menuItem.text}
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
                )
              })}
          </Box>
        )}
    </>
  )
}
