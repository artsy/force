import { Box, Text } from "@artsy/palette"
import React, { FC } from "react"
import { graphql, createFragmentContainer } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SavedSearchPreviewPillsQuery } from "v2/__generated__/SavedSearchPreviewPillsQuery.graphql"
import { SavedSearchPreviewPills_previewSavedSearch } from "v2/__generated__/SavedSearchPreviewPills_previewSavedSearch.graphql"
import { FilterPill, SearchCriteriaAttributes } from "../types"
import {
  convertLabelsToPills,
  LabelEntity,
} from "../Utils/convertLabelsToPills"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"

interface SavedSearchPreviewPillsQueryRendererProps {
  attributes: SearchCriteriaAttributes
  onRemovePillPress: (pill: FilterPill) => void
}

interface SavedSearchPreviewPillsProps {
  previewSavedSearch: SavedSearchPreviewPills_previewSavedSearch
  onRemovePillPress: (pill: FilterPill) => void
}

const Placeholder = () => {
  return (
    <Box>
      <Text>Placeholder</Text>
    </Box>
  )
}

const SavedSearchPreviewPills: FC<SavedSearchPreviewPillsProps> = ({
  previewSavedSearch,
  onRemovePillPress,
}) => {
  const labels = (previewSavedSearch?.labels as LabelEntity[]) ?? []
  const pills = convertLabelsToPills(labels)

  return (
    <SavedSearchAlertPills items={pills} onDeletePress={onRemovePillPress} />
  )
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
  onRemovePillPress,
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

        if (props?.previewSavedSearch) {
          return (
            <SavedSearchPreviewPillsFragmentContainer
              previewSavedSearch={props.previewSavedSearch}
              onRemovePillPress={onRemovePillPress}
            />
          )
        }

        return <Placeholder />
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
