import React from "react"
import { useArtworkFilterContext } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { getSearchCriteriaFromFilters } from "../Utils/savedSearchCriteria"
import { SavedSearchEntity } from "../types"
import { SavedSearchCreateAlertButton } from "./SavedSearchCreateAlertButton"
import { DEFAULT_METRIC } from "v2/Components/ArtworkFilter/Utils/metrics"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AuthModalOptions } from "v2/Utils/openAuthModal"
import { usePrepareFiltersForPills } from "v2/Components/ArtworkFilter/Utils/usePrepareFiltersForPills"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

interface ArtworkGridFilterPillsProps {
  savedSearchEntity: SavedSearchEntity
}

export const DefaultCreateAlertButton: React.FC<ArtworkGridFilterPillsProps> = props => {
  const { savedSearchEntity } = props
  const { aggregations } = useArtworkFilterContext()
  const filters = usePrepareFiltersForPills()
  const criteria = getSearchCriteriaFromFilters(
    savedSearchEntity,
    filters ?? {}
  )
  const metric = filters?.metric ?? DEFAULT_METRIC

  const getAuthModalOptions = (): AuthModalOptions => {
    return {
      entity: {
        name: savedSearchEntity.owner.name,
        slug: savedSearchEntity.owner.slug,
      },
      afterSignUpAction: {
        action: "createAlert",
        kind: "artist",
        objectId: savedSearchEntity.owner.slug,
      },
      contextModule: ContextModule.artworkGrid,
      intent: Intent.createAlert,
      redirectTo: location.href,
    }
  }

  return (
    <SavedSearchCreateAlertButton
      entity={savedSearchEntity}
      criteria={criteria}
      metric={metric}
      aggregations={aggregations}
      getAuthModalOptions={getAuthModalOptions}
      buttonProps={{
        ml: PILL_HORIZONTAL_MARGIN_SIZE,
      }}
    />
  )
}
