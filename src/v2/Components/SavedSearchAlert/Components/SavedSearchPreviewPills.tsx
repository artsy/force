import React, { FC, useEffect, useState } from "react"
import { graphql, createFragmentContainer } from "react-relay"
import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { Metric } from "v2/Components/ArtworkFilter/Utils/metrics"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { SavedSearchPreviewPillsQuery } from "v2/__generated__/SavedSearchPreviewPillsQuery.graphql"
import { SavedSearchPreviewPills_previewSavedSearch } from "v2/__generated__/SavedSearchPreviewPills_previewSavedSearch.graphql"
import {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "../types"
import {
  convertLabelsToPills,
  LabelEntity,
} from "../Utils/convertLabelsToPills"
import { extractPills } from "../Utils/extractPills"

interface RenderContentProps {
  pills: FilterPill[]
  isFetching: boolean
}

interface SavedSearchPreviewPillsQueryRendererProps {
  attributes: SearchCriteriaAttributes
  aggregations: Aggregations | undefined
  savedSearchEntity: SavedSearchEntity
  metric: Metric
  renderContent: (props: RenderContentProps) => JSX.Element
}

interface SavedSearchPreviewPillsProps {
  previewSavedSearch: SavedSearchPreviewPills_previewSavedSearch | null
  renderContent: (props: RenderContentProps) => JSX.Element
}

const SavedSearchPreviewPills: FC<SavedSearchPreviewPillsProps> = ({
  previewSavedSearch,
  renderContent,
}) => {
  const [pills, setPills] = useState<FilterPill[]>([])
  const labels = previewSavedSearch?.labels

  useEffect(() => {
    if (!!labels) {
      const formattedLabels = (labels as LabelEntity[]) ?? []
      const result = convertLabelsToPills(formattedLabels)

      setPills(result)
    }
  }, [labels])

  return renderContent({ pills, isFetching: labels === undefined })
}

const SavedSearchPreviewPillsFragmentContainer = createFragmentContainer(
  SavedSearchPreviewPills,
  {
    previewSavedSearch: graphql`
      fragment SavedSearchPreviewPills_previewSavedSearch on PreviewSavedSearch {
        labels {
          field
          displayValue
          value
        }
      }
    `,
  }
)

export const SavedSearchPreviewPillsQueryRenderer: FC<SavedSearchPreviewPillsQueryRendererProps> = ({
  attributes,
  aggregations,
  savedSearchEntity,
  metric,
  renderContent,
}) => {
  const shouldFetchLabelsFromMetaphysics = useFeatureFlag(
    "force-fetch-alert-labels-from-metaphysics"
  )

  if (!shouldFetchLabelsFromMetaphysics) {
    const pills = extractPills({
      criteria: attributes,
      aggregations,
      entity: savedSearchEntity,
      metric,
    })

    return renderContent({ pills, isFetching: false })
  }

  return (
    <SystemQueryRenderer<SavedSearchPreviewPillsQuery>
      query={SAVED_SEARCH_PREVIEW_PILLS_QUERY}
      variables={{
        attributes,
      }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        return (
          <SavedSearchPreviewPillsFragmentContainer
            previewSavedSearch={props?.previewSavedSearch ?? null}
            renderContent={renderContent}
          />
        )
      }}
    />
  )
}

const SAVED_SEARCH_PREVIEW_PILLS_QUERY = graphql`
  query SavedSearchPreviewPillsQuery(
    $attributes: PreviewSavedSearchAttributes
  ) {
    previewSavedSearch(attributes: $attributes) {
      ...SavedSearchPreviewPills_previewSavedSearch
    }
  }
`
