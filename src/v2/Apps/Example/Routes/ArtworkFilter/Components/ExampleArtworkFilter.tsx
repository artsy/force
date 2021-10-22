import * as React from "react";
import { createRefetchContainer, RelayRefetchProp, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { ExampleArtworkFilter_tag } from "v2/__generated__/ExampleArtworkFilter_tag.graphql"

interface ExampleArtworkFilteProps {
  tag: ExampleArtworkFilter_tag
  relay: RelayRefetchProp
}

const ExampleArtworkFilter: React.FC<ExampleArtworkFilteProps> = ({
  tag,
  relay,
}) => {
  const { match } = useRouter()

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      onChange={updateUrl}
      sortOptions={[
        { text: "Default", value: "-decayed_merch" },
        { text: "Price (desc.)", value: "-has_price,-prices" },
        { text: "Price (asc.)", value: "-has_price,prices" },
        { text: "Recently updated", value: "-partner_updated_at" },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={tag as any} // TODO
      />
    </ArtworkFilterContextProvider>
  )
}

export const ExampleArtworkFilterRefetchContainer = createRefetchContainer(
  ExampleArtworkFilter,
  {
    tag: graphql`
      fragment ExampleArtworkFilter_tag on Tag
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        slug
        internalID
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ExampleArtworkFilterQuery(
      $slug: String!
      $input: FilterArtworksInput
    ) {
      tag(id: $slug) {
        ...TagArtworkFilter_tag @arguments(input: $input)
      }
    }
  `
)
