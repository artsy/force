import type { FC } from "react"
import { Button } from "@artsy/palette/dist/elements/Button"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

export const FiltersFooter: FC<React.PropsWithChildren<unknown>> = () => {
  const { goToDetails } = useAlertContext()

  return (
    <Button
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
