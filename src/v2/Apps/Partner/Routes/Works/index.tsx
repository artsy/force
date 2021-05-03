import React from "react"
import { createRefetchContainer, RelayRefetchProp } from "react-relay"
import { graphql } from "relay-runtime"
import { Articles_partner } from "v2/__generated__/Articles_partner.graphql"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { useRouter } from "v2/Artsy/Router/useRouter"

interface PartnerArtworkFilterProps {
  partner: Articles_partner
  relay: RelayRefetchProp
}

export const Artworks: React.FC<PartnerArtworkFilterProps> = ({
  partner,
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
      <BaseArtworkFilter relay={relay} offset={200} viewer={partner as any} />
    </ArtworkFilterContextProvider>
  )
}

export const ArtworksRefetchContainer = createRefetchContainer(
  Artworks,
  {
    partner: graphql`
      fragment Works_partner on Partner
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
    query WorksQuery($partnerId: String!, $input: FilterArtworksInput) {
      partner(id: $partnerId) {
        ...Works_partner @arguments(input: $input)
      }
    }
  `
)
