import React from "react"
import { Clickable, Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import { useTransitionPanel } from "Components/TransitionPanel"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { AddFiltersRarity } from "Components/SavedSearchAlert/Components/AddFiltersScreenRarity"

export const AddFiltersScreen: React.FC = () => {
  const { navigateTo } = useTransitionPanel()
  return (
    <Flex flexDirection="column" width={345} height={464}>
      <Clickable onClick={() => navigateTo(0)}>
        <Flex justifyContent="flex-start" alignItems="center">
          <ChevronLeftIcon />
          <Text variant="sm">Back</Text>
        </Flex>
      </Clickable>
      <Separator my={2} />
      <Text variant="lg">Filters</Text>
      <Separator my={2} />
      <Join separator={<Spacer y={2} />}>
        <AddFiltersRarity />
      </Join>
    </Flex>
  )
}
