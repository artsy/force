import { FC } from "react"
import { Button } from "@artsy/palette/dist/elements/Button"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

export const FiltersFooter: FC = () => {
  const { goToDetails, state } = useAlertContext()

  return (
    <Button
      disabled={!state.formIsValid}
      data-testid="setFilters"
      onClick={() => {
        goToDetails()
      }}
      width="100%"
    >
      Set Filters
    </Button>
  )
}
