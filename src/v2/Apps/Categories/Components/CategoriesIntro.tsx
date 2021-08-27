import { Box, Text } from "@artsy/palette"
import React from "react"

export const CategoriesIntro: React.FC = () => {
  return (
    <Box>
      <Text variant="xxl">The Art Genome Project</Text>
      <Text variant="md" mt={2}>
        The Art Genome Project is the classification system and technological
        framework that powers Artsy. It maps the characteristics (we call them
        "genes") that connect artists, artworks, architecture, and design
        objects across history. There are currently over 1,000 characteristics
        in The Art Genome Project, including art historical movements, subject
        matter, and formal qualities.
      </Text>
    </Box>
  )
}
