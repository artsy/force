import React from "react"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import { FilterPill, SavedSearchEntity } from "../types"
import { useActiveFilterPills } from "../useActiveFilterPills"
import { Flex, Spacer } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { usePrepareFiltersForPills } from "Components/ArtworkFilter/Utils/usePrepareFiltersForPills"
import { getSearchCriteriaFromFilters } from "../Utils/savedSearchCriteria"
import { DEFAULT_METRIC } from "Utils/metrics"
import { AuthModalOptions } from "Utils/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { SavedSearchCreateAlertButton } from "./SavedSearchCreateAlertButton"

export interface ActiveFilterPillsAndCreateAlertProps {
  savedSearchEntity: SavedSearchEntity
  defaultPills?: FilterPill[]
}

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

export const ActiveFilterPillsAndCreateAlert: React.FC<ActiveFilterPillsAndCreateAlertProps> = props => {
  const { defaultPills = [], savedSearchEntity } = props
  const { pills, removePill } = useActiveFilterPills(defaultPills)
  const { aggregations } = useArtworkFilterContext()
  const filters = usePrepareFiltersForPills()
  const criteria = getSearchCriteriaFromFilters(savedSearchEntity, filters)
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
      copy: "Sign up to create an alert",
      intent: Intent.createAlert,
      redirectTo: location.href,
    }
  }

  return (
    <Flex
      flexWrap="wrap"
      mx={-PILL_HORIZONTAL_MARGIN_SIZE}
      mb={4}
      data-testid="artworkGridFilterPills"
    >
      <SavedSearchAlertPills items={pills} onDeletePress={removePill} />

      <Spacer x={PILL_HORIZONTAL_MARGIN_SIZE} />

      <SavedSearchCreateAlertButton
        entity={savedSearchEntity}
        criteria={criteria}
        metric={metric}
        aggregations={aggregations}
        getAuthModalOptions={getAuthModalOptions}
      />
    </Flex>
  )
}
