import { ArtistArtworkFilter_artist } from "v2/__generated__/ArtistArtworkFilter_artist.graphql"
import { ArtistArtworkFilter_me } from "v2/__generated__/ArtistArtworkFilter_me.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { Match } from "found"
import { useEffect } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import {
  FilterPill,
  SavedSearchEntity,
} from "v2/Components/SavedSearchAlert/types"
import { getSupportedMetric } from "v2/Components/ArtworkFilter/Utils/metrics"
import { OwnerType } from "@artsy/cohesion"
import { ZeroState } from "./ZeroState"
import {
  useFeatureVariant,
  useTrackFeatureVariant,
} from "v2/System/useFeatureFlag"
import { ArtistArtworkFilters } from "./ArtistArtworkFilters"
import { ActiveFilterPillsAndCreateAlert } from "v2/Components/SavedSearchAlert/Components/ActiveFilterPillsAndCreateAlert"

interface ArtistArtworkFilterProps {
  aggregations: SharedArtworkFilterContextProps["aggregations"]
  artist: ArtistArtworkFilter_artist
  me: ArtistArtworkFilter_me | null
  relay: RelayRefetchProp
  match?: Match
}

const ArtistArtworkFilter: React.FC<ArtistArtworkFilterProps> = props => {
  const { match } = useRouter()
  const { relay, aggregations, artist, me } = props
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

  const metric = getSupportedMetric(me?.lengthUnitPreference)
  const filters: ArtworkFiltersState = {
    metric,
    ...match.location.query,
  }

  let defaultSortValue = "-decayed_merch"

  if (trendingSortVariant?.name === "experiment") {
    defaultSortValue = "-default_trending_score"
  }

  return (
    <ArtworkFilterContextProvider
      aggregations={aggregations}
      counts={artist.counts as Counts}
      filters={filters}
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
    me: graphql`
      fragment ArtistArtworkFilter_me on Me {
        lengthUnitPreference
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
