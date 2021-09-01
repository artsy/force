import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import React from "react"

export const CategoriesIntro: React.FC = () => {
  return (
    <>
      <GridColumns>
        <Column span={6}>
          <Text variant="xl">The Art Genome Project</Text>
        </Column>
        <Column span={6}>
          <Text variant="md">
            The Art Genome Project is the classification system and
            technological framework that powers Artsy. It maps the
            characteristics (we call them "genes") that connect artists,
            artworks, architecture, and design objects across history. There are
            currently over 1,000 characteristics in The Art Genome Project,
            including art historical movements, subject matter, and formal
            qualities.
          </Text>
        </Column>
      </GridColumns>
      <Spacer mt={[6, 12]} />
    </>
  )
}
