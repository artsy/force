import { Flex, Pill } from "@artsy/palette"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { FC } from "react"

export const SuggestedArtworksModalHeader: FC = () => {
  const { pills } = useSavedSearchAlertContext()

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
