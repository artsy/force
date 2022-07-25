import { ArtistArtworkFilter_artist } from "__generated__/ArtistArtworkFilter_artist.graphql"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { Match } from "found"
import { useEffect } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import {
  FilterPill,
  SavedSearchEntity,
} from "Components/SavedSearchAlert/types"
import { OwnerType } from "@artsy/cohesion"
import { ZeroState } from "./ZeroState"
import {
  useFeatureVariant,
  useTrackFeatureVariant,
} from "System/useFeatureFlag"
import { ArtistArtworkFilters } from "./ArtistArtworkFilters"
import { ActiveFilterPillsAndCreateAlert } from "Components/SavedSearchAlert/Components/ActiveFilterPillsAndCreateAlert"
import { useSystemContext } from "System"

interface ArtistArtworkFilterProps {
  aggregations: SharedArtworkFilterContextProps["aggregations"]
  artist: ArtistArtworkFilter_artist
  relay: RelayRefetchProp
  match?: Match
}

const ArtistArtworkFilter: React.FC<ArtistArtworkFilterProps> = props => {
  const { userPreferences } = useSystemContext()
  const { match } = useRouter()
  const { relay, aggregations, artist } = props
  const { filtered_artworks } = artist
  const hasFilter = filtered_artworks && filtered_artworks.id
  const trendingSortVariant = useFeatureVariant(
    "trending-sort-for-artist-artwork-grids"
  )
  const { trackFeatureVariant } = useTrackFeatureVariant({
    experimentName: "trending-sort-for-artist-artwork-grids",
    variantName: trendingSortVariant?.name!,
  })

  useEffect(() => {
    trackFeatureVariant()
  })

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

  let defaultSortValue = "-decayed_merch"

  if (trendingSortVariant?.name === "experiment") {
    defaultSortValue = "-default_trending_score"
  }

  return (
    <ArtworkFilterContextProvider
      aggregations={aggregations}
      counts={artist.counts as Counts}
      filters={match.location.query}
      sortOptions={[
        { value: defaultSortValue, text: "Default" },
        { value: "-has_price,-prices", text: "Price (desc.)" },
        { value: "-has_price,prices", text: "Price (asc.)" },
        { value: "-partner_updated_at", text: "Recently updated" },
        { value: "-published_at", text: "Recently added" },
        { value: "-year", text: "Artwork year (desc.)" },
        { value: "year", text: "Artwork year (asc.)" },
      ]}
      ZeroState={() => <ZeroState my={1} />}
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
        ...FollowArtistButton_artist
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
        isFollowed
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
