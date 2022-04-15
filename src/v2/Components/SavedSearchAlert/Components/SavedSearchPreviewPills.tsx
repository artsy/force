import React, { FC, useEffect, useState } from "react"
import { graphql, createFragmentContainer } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SavedSearchPreviewPillsQuery } from "v2/__generated__/SavedSearchPreviewPillsQuery.graphql"
import { SavedSearchPreviewPills_previewSavedSearch } from "v2/__generated__/SavedSearchPreviewPills_previewSavedSearch.graphql"
import { FilterPill, SearchCriteriaAttributes } from "../types"
import {
  convertLabelsToPills,
  LabelEntity,
} from "../Utils/convertLabelsToPills"

interface RenderContentProps {
  pills: FilterPill[]
  isFetching: boolean
}

interface SavedSearchPreviewPillsQueryRendererProps {
  attributes: SearchCriteriaAttributes
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
  renderContent,
}) => {
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
