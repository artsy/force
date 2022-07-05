import React from "react"
import { Flex } from "@artsy/palette"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

interface ArtworkGridFilterPillsProps {
  FilterPills?: JSX.Element
  CreateAlertButton?: JSX.Element
}

export const ArtworkGridFilterPills: React.FC<ArtworkGridFilterPillsProps> = props => {
  const { FilterPills, CreateAlertButton } = props

  return (
    <Flex
      flexWrap="wrap"
      mx={-PILL_HORIZONTAL_MARGIN_SIZE}
      data-testid="artworkGridFilterPills"
    >
      {FilterPills}
      {CreateAlertButton}
    </Flex>
  )
}
