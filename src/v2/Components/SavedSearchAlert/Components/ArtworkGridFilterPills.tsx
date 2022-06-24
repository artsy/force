import React from "react"
import { Flex } from "@artsy/palette"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

interface ArtworkGridFilterPillsProps {
  renderFilterPills?: () => JSX.Element
  renderCreateAlertButton?: () => JSX.Element
}

export const ArtworkGridFilterPills: React.FC<ArtworkGridFilterPillsProps> = props => {
  const { renderFilterPills, renderCreateAlertButton } = props

  return (
    <Flex flexWrap="wrap" mx={-PILL_HORIZONTAL_MARGIN_SIZE}>
      {renderFilterPills?.()}
      {renderCreateAlertButton?.()}
    </Flex>
  )
}
