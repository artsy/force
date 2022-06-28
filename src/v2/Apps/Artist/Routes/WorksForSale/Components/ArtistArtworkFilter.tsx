import { ArtistArtworkFilter_artist } from "v2/__generated__/ArtistArtworkFilter_artist.graphql"
import { ArtistArtworkFilter_me } from "v2/__generated__/ArtistArtworkFilter_me.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { getDefaultSort } from "v2/Apps/Artist/Routes/WorksForSale/Utils/getDefaultSort"
import { Match } from "found"
import { useEffect } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { SavedSearchEntity } from "v2/Components/SavedSearchAlert/types"
import { getSupportedMetric } from "v2/Components/ArtworkFilter/Utils/metrics"
import { OwnerType } from "@artsy/cohesion"
import { ZeroState } from "./ZeroState"
import {
  useFeatureVariant,
  useTrackFeatureVariant,
} from "v2/System/useFeatureFlag"
import type RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { ColorFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SizeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { AttributionClassFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ArtworkLocationFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { ArtistNationalityFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { PartnersFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { ArtistsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { KeywordFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/KeywordFilter"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

interface ArtistArtworkFilterProps {
  aggregations: SharedArtworkFilterContextProps["aggregations"]
  artist: ArtistArtworkFilter_artist
  me: ArtistArtworkFilter_me | null
  relay: RelayRefetchProp
  match?: Match
  user?: User
  relayEnvironment?: RelayModernEnvironment
}

const ArtistArtworkFilter: React.FC<ArtistArtworkFilterProps> = props => {
  const { match } = useRouter()
  const { relay, aggregations, artist, me, user, relayEnvironment } = props
  const { filtered_artworks } = artist
  const hasFilter = filtered_artworks && filtered_artworks.id
  const trendingSortVariant = useFeatureVariant(
    "trending-sort-for-artist-artwork-grids"
  )
  const { trackFeatureVariant } = useTrackFeatureVariant({
    experimentName: "trending-sort-for-artist-artwork-grids",
    variantName: trendingSortVariant?.name!,
  })

  const showKeywordFilter = useFeatureFlag("artist-artwork-grid-keyword-search")

  useEffect(() => {
    trackFeatureVariant()
  })

  if (!hasFilter) {
    return null
  }

  const artistEntity = {
    id: artist.internalID,
    name: artist.name ?? "",
    slug: artist.slug,
  }
  const savedSearchEntity: SavedSearchEntity = {
    placeholder: artistEntity.name,
    artists: [artistEntity],
    owner: {
      type: OwnerType.artist,
      ...artistEntity,
    },
  }

  const metric = getSupportedMetric(me?.lengthUnitPreference)
  const filters: ArtworkFiltersState = {
    metric,
    ...match.location.query,
  }

  const defaultSortValue = getDefaultSort(
    filters.sort ?? "-decayed_merch",
    trendingSortVariant
  )

  const Filters = (
    <>
      {showKeywordFilter && <KeywordFilter />}
      <ArtistsFilter relayEnvironment={relayEnvironment} user={user} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter />
      <ArtistNationalityFilter />
      <ArtworkLocationFilter />
      <TimePeriodFilter />
      <ColorFilter />
      <PartnersFilter />
    </>
  )

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
        Filters={Filters}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
        enableCreateAlert
        savedSearchEntity={savedSearchEntity}
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
