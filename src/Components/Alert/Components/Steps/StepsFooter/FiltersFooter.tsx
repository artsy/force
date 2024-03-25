import { FC } from "react"
import { Button } from "@artsy/palette/dist/elements/Button"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

export const FiltersFooter: FC = () => {
  const { goToDetails } = useAlertContext()

  return (
    <Button
      data-testid="setFilters"
      onClick={() => {
        goToDetails()
        // hack: scroll by 1 pixel to make edit alert form Sticky to re-appear on the screen
        window.scrollBy(0, -1)
      }}
      width="100%"
    >
      Set Filters
    </Button>
  )
}
