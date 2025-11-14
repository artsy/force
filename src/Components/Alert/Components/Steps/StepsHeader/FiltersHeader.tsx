import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { Clickable, Flex, Text } from "@artsy/palette"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import type { FC } from "react"

export const FiltersHeader: FC<React.PropsWithChildren<unknown>> = () => {
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
