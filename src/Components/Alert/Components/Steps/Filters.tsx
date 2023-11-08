import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { Box, Clickable, Flex, Join, Separator, Text } from "@artsy/palette"
import { FC } from "react"

import { Rarity } from "Components/Alert/Components/Filters/Rarity"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { Price } from "Components/Alert/Components/Filters/PriceRange"

export const Filters: FC = () => {
  const { goToDetails } = useAlertContext()

  return (
    <>
      <Flex flexDirection="column" width="auto">
        <Clickable
          onClick={() => {
            goToDetails()
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
            <Price />
            <Rarity />
            <Medium />
          </Join>
        </Box>
      </Flex>
    </>
  )
}
