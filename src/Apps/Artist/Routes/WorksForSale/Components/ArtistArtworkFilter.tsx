import { OwnerType } from "@artsy/cohesion"
import { ArtistMediumsTitle } from "Apps/Artist/Routes/WorksForSale/Components/ArtistMediumsTitle"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import { ArtworkFilterAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterAlertContextProvider"
import {
  ArtworkFilterContextProvider,
  type Counts,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterSavedSearchAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterSavedSearchAlertContextProvider"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import type { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { ArtistArtworkFilter_artist$data } from "__generated__/ArtistArtworkFilter_artist.graphql"
import type { Match } from "found"
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

const ArtistArtworkFilter: React.FC<
  React.PropsWithChildren<ArtistArtworkFilterProps>
> = props => {
  const { userPreferences } = useSystemContext()
  const { match } = useRouter()
  const { relay, aggregations, artist } = props
  const { filtered_artworks } = artist
  const hasFilter = filtered_artworks && filtered_artworks.id

  if (!hasFilter) {
    return null
  }

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
        <ArtistMediumsTitle
          defaultTitle={artist.meta.title}
          name={artist.name ?? "Unknown Artist"}
        />

        <ArtworkFilterAlertContextProvider
          initialCriteria={{ artistIDs: [artist.internalID] }}
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
          ...Immerse_filtered_artworks
        }
        internalID
        name
        slug
        meta(page: ARTWORKS) {
          title
        }
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
