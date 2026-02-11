import { OwnerType } from "@artsy/cohesion"
import { ArtistWorksForSaleEmptyFragmentContainer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistWorksForSaleEmpty"
import { getWorksForSaleRouteVariables } from "Apps/Artist/Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import { ArtworkFilterAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterAlertContextProvider"
import {
  ArtworkFilterContextProvider,
  type Counts,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { ArtworkFilterSavedSearchAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterSavedSearchAlertContextProvider"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import type { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSectionReady } from "Utils/Hooks/useSectionReadiness"
import type { ArtistArtworkFilterQueryRendererQuery } from "__generated__/ArtistArtworkFilterQueryRendererQuery.graphql"
import type { ArtistArtworkFilter_artist$data } from "__generated__/ArtistArtworkFilter_artist.graphql"
import type { Match } from "found"
import type { FC } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import { ArtistArtworkFilters } from "./ArtistArtworkFilters"
import { ZeroState } from "./ZeroState"

interface ArtistArtworkFilterProps {
  aggregations: SharedArtworkFilterContextProps["aggregations"]
  artist: ArtistArtworkFilter_artist$data
  relay: RelayRefetchProp
  match?: Match
}

const FALLBACK_COUNTS: Counts = {
  for_sale_artworks: 0,
  ecommerce_artworks: 0,
  auction_artworks: 0,
  artworks: 0,
  has_make_offer_artworks: false,
}

const FALLBACK_RELAY = {
  // The fallback never executes refetches; this is only to satisfy BaseArtworkFilter’s relay contract.
  refetch: (_variables, _renderVariables, _observerOrCallback) => {
    return {
      dispose: () => {},
    }
  },
} as RelayRefetchProp

export const ArtistArtworkFilter: React.FC<
  React.PropsWithChildren<ArtistArtworkFilterProps>
> = props => {
  const { userPreferences } = useSystemContext()
  const { match } = useRouter()
  const { relay, aggregations, artist } = props
  const counts = (artist.counts as Counts | null | undefined) ?? FALLBACK_COUNTS

  const savedSearchEntity: SavedSearchEntity = {
    owner: {
      type: OwnerType.artist,
      id: artist.internalID,
      name: artist.name ?? "Unknown",
      slug: artist.slug,
    },
    defaultCriteria: {
      artistIDs: [
        {
          displayValue: artist.name ?? "Unknown",
          value: artist.internalID,
        },
      ],
    },
  }

  return (
    <>
      <ArtworkFilterContextProvider
        aggregations={aggregations}
        counts={counts}
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
        <ArtworkFilterAlertContextProvider
          initialCriteria={{ artistIDs: [artist.internalID] }}
          nodeId={artist.id}
        >
          <ArtworkFilterSavedSearchAlertContextProvider
            entity={savedSearchEntity}
          >
            <ArtworkGridContextProvider>
              <BaseArtworkFilter
                relay={relay}
                viewer={artist}
                Filters={<ArtistArtworkFilters />}
                relayVariables={{
                  aggregations: ["TOTAL"],
                }}
              />
            </ArtworkGridContextProvider>
          </ArtworkFilterSavedSearchAlertContextProvider>
        </ArtworkFilterAlertContextProvider>
      </ArtworkFilterContextProvider>
    </>
  )
}

const ArtistArtworkFilterErrorFallback: FC<{ id: string }> = ({ id }) => {
  const { match } = useRouter()

  const artistSlug =
    typeof match.params.artistID === "string" ? match.params.artistID : ""

  const fallbackArtist = {
    id: `artist-artwork-filter-fallback:${id}`,
    internalID: id,
    name: "Unknown",
    slug: artistSlug,
    counts: FALLBACK_COUNTS,
    filtered_artworks: null,
  } as ArtistArtworkFilter_artist$data

  // Keep the filter shell mounted on API validation errors so the user can still
  // see/clear the invalid URL-driven filter state instead of hitting a null render.
  return (
    <ArtistArtworkFilter
      artist={fallbackArtist}
      aggregations={[]}
      relay={FALLBACK_RELAY}
    />
  )
}

export const ArtistArtworkFilterRefetchContainer = createRefetchContainer(
  ArtistArtworkFilter,
  {
    artist: graphql`
      fragment ArtistArtworkFilter_artist on Artist
      @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
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
          ...ImmersiveView_filtered_artworks
        }
        id
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
  `,
)

type ArtistArtworkFilterQueryRendererProps = {
  id: string
  lazyLoad?: boolean
  onReady?: () => void
}

export const ArtistArtworkFilterQueryRenderer: FC<
  ArtistArtworkFilterQueryRendererProps
> = ({ id, lazyLoad, onReady }) => {
  const { match } = useRouter()
  const { handleReady } = useSectionReady({ onReady })

  return (
    <SystemQueryRenderer<ArtistArtworkFilterQueryRendererQuery>
      lazyLoad={lazyLoad}
      query={graphql`
        query ArtistArtworkFilterQueryRendererQuery(
          $artistID: String!
          $aggregations: [ArtworkAggregation]
          $input: FilterArtworksInput!
        ) @cacheable {
          artist(id: $artistID) {
            ...ArtistWorksForSaleEmpty_artist
            ...ArtistArtworkFilter_artist @arguments(input: $input)
            sidebarAggregations: filterArtworksConnection(
              aggregations: $aggregations
              first: 1
            ) {
              counts {
                total
              }
              aggregations {
                slice
                counts {
                  name
                  value
                  count
                }
              }
            }
          }
        }
      `}
      variables={{
        ...getWorksForSaleRouteVariables(
          match.params as { artistID: string },
          match,
        ),
        artistID: id,
      }}
      placeholder={<ArtworkFilterPlaceholder showCreateAlert />}
      render={({ error, props }) => {
        if (error) {
          console.error(
            "[ArtistArtworkFilter]: Error loading artwork grid",
            error,
          )

          return <ArtistArtworkFilterErrorFallback id={id} />
        }

        if (!props || !props.artist) {
          return <ArtworkFilterPlaceholder showCreateAlert />
        }

        handleReady()

        const { artist } = props

        return (
          <>
            {artist.sidebarAggregations?.counts?.total === 0 ? (
              <ArtistWorksForSaleEmptyFragmentContainer artist={artist} />
            ) : (
              <ArtistArtworkFilterRefetchContainer
                artist={artist}
                aggregations={
                  artist.sidebarAggregations
                    ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
                }
              />
            )}
          </>
        )
      }}
    />
  )
}
