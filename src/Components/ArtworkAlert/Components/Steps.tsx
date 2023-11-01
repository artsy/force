import { FC } from "react"

import { Confirmation } from "Components/ArtworkAlert/Components/Steps/Confirmation"
import { Details } from "Components/ArtworkAlert/Components/Steps/Details"
import { Filters } from "Components/ArtworkAlert/Components/Steps/Filters"
import { useArtworkAlertContext } from "Components/ArtworkAlert/Hooks/useArtworkAlertContext"

export const Steps: FC = () => {
  const { current } = useArtworkAlertContext()

  switch (current) {
    case "ALERT_DETAILS":
      return <Details />
    case "ALERT_FILTERS":
      return <Filters />
    case "ALERT_CONFIRMATION":
      return <Confirmation />
  }
}
