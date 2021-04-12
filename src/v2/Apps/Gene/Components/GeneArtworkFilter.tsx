import React from "react"
import { createRefetchContainer, RelayRefetchProp, graphql } from "react-relay"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { GeneArtworkFilter_gene } from "v2/__generated__/GeneArtworkFilter_gene.graphql"

interface GeneArtworkFilterProps {
  gene: GeneArtworkFilter_gene
  relay: RelayRefetchProp
}

const GeneArtworkFilter: React.FC<GeneArtworkFilterProps> = ({
  gene,
  relay,
}) => {
  const { match } = useRouter()

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
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
        viewer={gene as any} // TODO
      />
    </ArtworkFilterContextProvider>
  )
}

export const GeneArtworkFilterRefetchContainer = createRefetchContainer(
  GeneArtworkFilter,
  {
    gene: graphql`
      fragment GeneArtworkFilter_gene on Gene
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
    query GeneArtworkFilterQuery($slug: String!, $input: FilterArtworksInput) {
      gene(id: $slug) {
        ...GeneArtworkFilter_gene @arguments(input: $input)
      }
    }
  `
)
