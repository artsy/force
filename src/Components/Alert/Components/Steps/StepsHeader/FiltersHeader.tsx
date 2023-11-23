import { Clickable, Flex, Text } from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"

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
