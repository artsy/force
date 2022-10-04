import { Column, GridColumns, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { TagApp_tag$data } from "__generated__/TagApp_tag.graphql"
import { TagMetaFragmentContainer } from "./Components/TagMeta"
import { TagArtworkFilterRefetchContainer } from "./Components/TagArtworkFilter"

interface TagAppProps {
  tag: TagApp_tag$data
}

const TagApp: React.FC<TagAppProps> = ({ tag }) => {
  return (
    <>
      <TagMetaFragmentContainer tag={tag} />

      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={2}>
            {tag.name}
          </Text>
        </Column>
      </GridColumns>

      <TagArtworkFilterRefetchContainer tag={tag} />
    </>
  )
}

export const TagAppFragmentContainer = createFragmentContainer(TagApp, {
  tag: graphql`
    fragment TagApp_tag on Tag
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        aggregations: { type: "[ArtworkAggregation]" }
        shouldFetchCounts: { type: "Boolean!", defaultValue: false }
      ) {
      ...TagArtworkFilter_tag
        @arguments(
          input: $input
          aggregations: $aggregations
          shouldFetchCounts: $shouldFetchCounts
        )
      ...TagMeta_tag
      name
    }
  `,
})
