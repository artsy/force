import { Confirmation } from "Components/Alert/Components/Steps/Confirmation"
import { Details } from "Components/Alert/Components/Steps/Details"
import { Filters } from "Components/Alert/Components/Steps/Filters"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import type { FC } from "react"

export const Steps: FC<React.PropsWithChildren<unknown>> = () => {
  const { current } = useAlertContext()

  switch (current) {
    case "ALERT_DETAILS":
      return <Details />
    case "ALERT_FILTERS":
      return <Filters />
    case "ALERT_CONFIRMATION":
      return <Confirmation />
    default:
      console.warn("no matching case is found in AlertContext")
      return null
  }
}
