import { FC } from "react"
import { Clickable, Flex, Text } from "@artsy/palette"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

export const FiltersHeader: FC = () => {
  const { goToDetails } = useAlertContext()

  return (
    <Clickable
      onClick={() => {
        goToDetails()
      }}
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <ChevronLeftIcon />
        <Text variant="sm">Create Alert</Text>
      </Flex>
    </Clickable>
  )
}
