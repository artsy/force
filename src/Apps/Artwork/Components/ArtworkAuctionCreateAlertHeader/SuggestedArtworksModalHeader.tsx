import { Flex, Pill } from "@artsy/palette"
import { extractPills } from "Components/SavedSearchAlert/Utils/extractPills"
import {
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { FC } from "react"

interface SuggestedArtworksModalHeaderProps {
  criteria: SearchCriteriaAttributes
  entity: SavedSearchEntity
}

export const SuggestedArtworksModalHeader: FC<SuggestedArtworksModalHeaderProps> = ({
  criteria,
  entity,
}) => {
  const pills = extractPills({ criteria, entity })

  return (
    <Flex flexDirection="column">
      <Flex flexWrap="wrap">
        {pills.map(pill => {
          return (
            <Pill
              key={`filter-label-${pill.field}-${pill.value}`}
              variant="filter"
              mb={1}
              mr={1}
              disabled
            >
              {pill.displayValue}
            </Pill>
          )
        })}
      </Flex>
    </Flex>
  )
}
