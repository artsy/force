import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { Flex, Pill, Text } from "@artsy/palette"
import type { FC } from "react"

export const SuggestedArtworksModalHeader: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { pills } = useSavedSearchAlertContext()

  return (
    <Flex flexDirection="column">
      <Text variant="sm-display" textColor="mono60" mb={2}>
        Available works you may have missed based on similar filters listed
        below.
      </Text>

      <Flex flexWrap="wrap" gap={1}>
        {pills.map(pill => {
          return (
            <Pill
              key={`filter-label-${pill.field}-${pill.value}`}
              variant="filter"
              mb={1}
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
