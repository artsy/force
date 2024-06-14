import { Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkFilter } from "Components/ArtworkFilter"
import { useRouter } from "System/Hooks/useRouter"
import { ExampleArtworkFilterRoute_viewer$data } from "__generated__/ExampleArtworkFilterRoute_viewer.graphql"

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
        { text: "Recommended", value: "-decayed_merch" },
        { text: "Price (High to Low)", value: "-has_price,-prices" },
        { text: "Price (Low to High)", value: "-has_price,prices" },
        { text: "Recently Updated", value: "-partner_updated_at" },
        { text: "Recently Added", value: "-published_at" },
        { text: "Artwork Year (Descending)", value: "-year" },
        { text: "Artwork Year (Ascending)", value: "year" },
      ]}
      ZeroState={CustomZeroState}
    />
  )
}

const CustomZeroState = () => {
  return <Text variant="sm-display">No Results.</Text>
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
