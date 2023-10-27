import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { Box, Clickable, Flex, Join, Separator, Text } from "@artsy/palette"
import { AddFiltersMedium } from "Components/SavedSearchAlert/Components/AddFiltersMedium"

import { AddFiltersRarity } from "Components/SavedSearchAlert/Components/AddFiltersRarity"
import { AddFiltersWaysToBuy } from "Components/SavedSearchAlert/Components/AddFiltersWaysToBuy"
import { useCreateAlertFadeTransition } from "Components/SavedSearchAlert/Components/CreateAlertModalTransition"
import { PriceRangeFilter } from "Components/SavedSearchAlert/Components/PriceRangeFilter"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

import { FC } from "react"

interface CreateAlertFiltersStepProps {}

export const CreateAlertFiltersStep: FC<CreateAlertFiltersStepProps> = () => {
  const { steps } = useSavedSearchAlertContext()

  const { register } = useCreateAlertFadeTransition({
    next: () => {},
  })

  return (
    <Box ref={register(1)} height="730px">
      <Flex flexDirection="column" width="auto">
        <Clickable
          onClick={() => {
            steps.setStep("ALERT_DETAILS")
          }}
        >
          <Flex justifyContent="flex-start" alignItems="center" p={2}>
            <ChevronLeftIcon />
            <Text variant="sm">Create Alert</Text>
          </Flex>
        </Clickable>
        <Separator />
        <Box p={2}>
          <Text variant="lg">Filters</Text>
          <Separator my={2} />
          <Join separator={<Separator my={2} />}>
            <PriceRangeFilter />
            <AddFiltersRarity />
            <AddFiltersWaysToBuy />
            <AddFiltersMedium />
          </Join>
        </Box>
      </Flex>
    </Box>
  )
}
