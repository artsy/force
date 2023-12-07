import { FC } from "react"
import { Clickable, Flex, Text } from "@artsy/palette"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

export const FiltersHeader: FC = () => {
  const { goToDetails, state } = useAlertContext()

  return (
    <Clickable
      onClick={() => {
        goToDetails()
      }}
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <ChevronLeftIcon />
        <Text variant="sm">
          {state.isEditMode ? "Edit Alert" : "Create Alert"}
        </Text>
      </Flex>
    </Clickable>
  )
}
