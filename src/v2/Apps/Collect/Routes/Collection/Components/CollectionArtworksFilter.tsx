import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { usePathnameComplete } from "v2/Utils/Hooks/usePathnameComplete"
import { useRouter } from "v2/System/Router/useRouter"
import { CollectionArtworksFilter_collection } from "v2/__generated__/CollectionArtworksFilter_collection.graphql"

interface CollectionArtworksFilterProps {
  relay: RelayRefetchProp
  collection: CollectionArtworksFilter_collection
  aggregations?: SharedArtworkFilterContextProps["aggregations"]
  counts?: Counts
}

export const CollectionArtworksFilter: React.FC<CollectionArtworksFilterProps> = props => {
  const { relay, collection, aggregations, counts } = props
  const { slug } = collection

  const { match } = useRouter()
  const { pathname } = usePathnameComplete()

  return (
    <ArtworkFilterContextProvider
      // Reset state of filter context without calling reset; which would
      // affect analytics.
      key={pathname}
      filters={match.location.query}
      sortOptions={[
        { text: "Default", value: "-decayed_merch" },
        {
          text: "Price (desc.)",
          value: "sold,-has_price,-prices",
        },
        {
          text: "Price (asc.)",
          value: "sold,-has_price,prices",
        },
        {
          text: "Recently updated",
          value: "-partner_updated_at",
        },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
      counts={counts}
      aggregations={aggregations}
      onChange={updateUrl}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={collection}
        relayVariables={{
          slug,
        }}
      />
    </ArtworkFilterContextProvider>
  )
}

export const CollectionArtworksFilterRefetchContainer = createRefetchContainer(
  CollectionArtworksFilter,
  {
    collection: graphql`
      fragment CollectionArtworksFilter_collection on MarketingCollection
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        slug
        filtered_artworks: artworksConnection(input: $input) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query CollectionArtworksFilterQuery(
      $input: FilterArtworksInput
      $slug: String!
    ) {
      collection: marketingCollection(slug: $slug) {
        ...CollectionArtworksFilter_collection @arguments(input: $input)
      }
    }
  `
)
