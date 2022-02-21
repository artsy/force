import { Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkFilter } from "v2/Components/ArtworkFilter"
import { useRouter } from "v2/System/Router/useRouter"
import { ExampleArtworkFilterRoute_viewer$data } from "v2/__generated__/ExampleArtworkFilterRoute_viewer.graphql"

interface ExampleArtworkFilterProps {
  viewer: ExampleArtworkFilterRoute_viewer$data
}

const ExampleArtworkFilterRoute: React.FC<ExampleArtworkFilterProps> = ({
  viewer,
}) => {
  const { match } = useRouter()

  return (
    <ArtworkFilter
      viewer={viewer}
      filters={match.location.query}
      relayRefetchInputVariables={{
        first: 5,
      }}
      sortOptions={[
        { text: "Default", value: "-decayed_merch" },
        { text: "Price (desc.)", value: "-has_price,-prices" },
        { text: "Price (asc.)", value: "-has_price,prices" },
        { text: "Recently updated", value: "-partner_updated_at" },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
      ZeroState={() => <Text variant="md">No Results.</Text>}
    />
  )
}

export const ExampleArtworkFilterFragmentContainer = createFragmentContainer(
  ExampleArtworkFilterRoute,
  {
    viewer: graphql`
      fragment ExampleArtworkFilterRoute_viewer on Viewer
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        ...ArtworkFilter_viewer @arguments(input: $input)
      }
    `,
  }
)
