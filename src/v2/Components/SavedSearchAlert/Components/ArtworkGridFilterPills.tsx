import React from "react"
import { Flex } from "@artsy/palette"
import { isArray } from "lodash"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { extractPills } from "../Utils/extractPills"
import { getSearchCriteriaFromFilters } from "../Utils/savedSearchCriteria"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import { FilterPill, SavedSearchEntity } from "../types"
import { SavedSearchCreateAlertButton } from "./SavedSearchCreateAlertButton"
import { DEFAULT_METRIC } from "v2/Components/ArtworkFilter/Utils/metrics"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AuthModalOptions } from "v2/Utils/openAuthModal"
import { ArtworkGridFilterPillsContextProvider } from "./ArtworkGridFilterPillsContext"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

interface ArtworkGridFilterPillsProps {
  savedSearchEntity: SavedSearchEntity
}

export const ArtworkGridFilterPills: React.FC<ArtworkGridFilterPillsProps> = props => {
  const { savedSearchEntity } = props
  const { filters, aggregations, setFilter } = useArtworkFilterContext()
  const criteria = getSearchCriteriaFromFilters(
    savedSearchEntity,
    filters ?? {}
  )
  const metric = filters?.metric ?? DEFAULT_METRIC
  const pills = extractPills({
    criteria,
    aggregations,
    entity: savedSearchEntity,
    metric,
  })

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    let filterValue = filters![pill.field]

    if (isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.value)
    } else {
      filterValue = initialArtworkFilterState[pill.field]
    }

    setFilter(pill.field as keyof ArtworkFilters, filterValue)
  }

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
    <ArtworkGridFilterPillsContextProvider criteria={criteria} metric={metric}>
      <Flex flexWrap="wrap" mx={-PILL_HORIZONTAL_MARGIN_SIZE}>
        <SavedSearchAlertPills items={pills} onDeletePress={removePill} />
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
      </Flex>
    </ArtworkGridFilterPillsContextProvider>
  )
}
