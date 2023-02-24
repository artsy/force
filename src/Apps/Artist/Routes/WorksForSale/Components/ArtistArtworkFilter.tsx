import { ArtistArtworkFilter_artist$data } from "__generated__/ArtistArtworkFilter_artist.graphql"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { Match } from "found"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import {
  FilterPill,
  SavedSearchEntity,
} from "Components/SavedSearchAlert/types"
import { OwnerType } from "@artsy/cohesion"
import { ZeroState } from "./ZeroState"
import { ArtistArtworkFilters } from "./ArtistArtworkFilters"
import { ActiveFilterPillsAndCreateAlert } from "Components/SavedSearchAlert/Components/ActiveFilterPillsAndCreateAlert"
import { useSystemContext } from "System/useSystemContext"

interface ArtistArtworkFilterProps {
  aggregations: SharedArtworkFilterContextProps["aggregations"]
  artist: ArtistArtworkFilter_artist$data
  relay: RelayRefetchProp
  match?: Match
}

const ArtistArtworkFilter: React.FC<ArtistArtworkFilterProps> = props => {
  const { userPreferences } = useSystemContext()
  const { match } = useRouter()
  const { relay, aggregations, artist } = props
  const { filtered_artworks } = artist
  const hasFilter = filtered_artworks && filtered_artworks.id

  if (!hasFilter) {
    return null
  }

  const savedSearchEntity: SavedSearchEntity = {
    placeholder: artist.name ?? "",
    owner: {
      type: OwnerType.artist,
      id: artist.internalID,
      name: artist.name ?? "",
      slug: artist.slug,
    },
    defaultCriteria: {
      artistIDs: [
        {
          displayValue: artist.name ?? "",
          value: artist.internalID,
        },
      ],
    },
  }
  const defaultPills: FilterPill[] = [
    {
      isDefault: true,
      value: artist.internalID,
      displayValue: artist.name ?? "",
      field: "artistIDs",
    },
  ]

  return (
    <ArtworkFilterContextProvider
      aggregations={aggregations}
      counts={artist.counts as Counts}
      filters={match.location.query}
      sortOptions={[
        { value: "-decayed_merch", text: "Recommended" },
        { value: "-has_price,-prices", text: "Price (High to Low)" },
        { value: "-has_price,prices", text: "Price (Low to High)" },
        { value: "-partner_updated_at", text: "Recently Updated" },
        { value: "-published_at", text: "Recently Added" },
        { value: "-year", text: "Artwork Year (Descending)" },
        { value: "year", text: "Artwork Year (Ascending)" },
      ]}
      ZeroState={ZeroState}
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artist}
        Filters={<ArtistArtworkFilters relayEnvironment={relay.environment} />}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
        FilterPillsSection={
          <ActiveFilterPillsAndCreateAlert
            defaultPills={defaultPills}
            savedSearchEntity={savedSearchEntity}
          />
        }
      />
    </ArtworkFilterContextProvider>
  )
}

export const ArtistArtworkFilterRefetchContainer = createRefetchContainer(
  ArtistArtworkFilter,
  {
    artist: graphql`
      fragment ArtistArtworkFilter_artist on Artist
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        name
        counts {
          partner_shows: partnerShows
          for_sale_artworks: forSaleArtworks
          ecommerce_artworks: ecommerceArtworks
          auction_artworks: auctionArtworks
          artworks
          has_make_offer_artworks: hasMakeOfferArtworks
        }
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          counts {
            total(format: "0,0")
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
        internalID
        name
        slug
      }
    `,
  },
  graphql`
    query ArtistArtworkFilterQuery(
      $artistID: String!
      $input: FilterArtworksInput
    ) {
      artist(id: $artistID) {
        ...ArtistArtworkFilter_artist @arguments(input: $input)
      }
    }
  `
)
