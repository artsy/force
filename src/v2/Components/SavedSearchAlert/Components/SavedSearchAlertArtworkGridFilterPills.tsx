import React from "react"
import { Flex } from "@artsy/palette"
import { isArray } from "lodash"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { getSearchCriteriaFromFilters } from "../Utils/savedSearchCriteria"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import { FilterPill, SavedSearchEntity } from "../types"
import { SavedSearchCreateAlertButton } from "./SavedSearchCreateAlertButton"
import { DEFAULT_METRIC } from "v2/Components/ArtworkFilter/Utils/metrics"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AuthModalOptions } from "v2/Utils/openAuthModal"
import { SavedSearchPreviewPillsQueryRenderer } from "./SavedSearchPreviewPills"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { extractPills } from "../Utils/extractPills"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

interface SavedSearchAlertArtworkGridFilterPillsProps {
  savedSearchEntity: SavedSearchEntity
}

export const SavedSearchAlertArtworkGridFilterPills: React.FC<SavedSearchAlertArtworkGridFilterPillsProps> = props => {
  const { savedSearchEntity } = props
  const { filters, aggregations, setFilter } = useArtworkFilterContext()
  const shouldFetchLabelsFromMetaphysics = useFeatureFlag(
    "force-fetch-alert-labels-from-metaphysics"
  )
  const criteria = getSearchCriteriaFromFilters(
    savedSearchEntity,
    filters ?? {}
  )
  const metric = filters?.metric ?? DEFAULT_METRIC

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

  if (!shouldFetchLabelsFromMetaphysics) {
    const pills = extractPills({
      criteria,
      aggregations,
      entity: savedSearchEntity,
      metric,
    })

    return (
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
    )
  }

  return (
    <Flex flexWrap="wrap" mx={-PILL_HORIZONTAL_MARGIN_SIZE}>
      <SavedSearchPreviewPillsQueryRenderer
        attributes={criteria}
        renderContent={({ pills, isFetching }) => (
          <>
            <SavedSearchAlertPills items={pills} onDeletePress={removePill} />
            <SavedSearchCreateAlertButton
              entity={savedSearchEntity}
              criteria={criteria}
              metric={metric}
              aggregations={aggregations}
              getAuthModalOptions={getAuthModalOptions}
              buttonProps={{
                ml: PILL_HORIZONTAL_MARGIN_SIZE,
                loading: isFetching,
              }}
            />
          </>
        )}
      />
    </Flex>
  )
}
