import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { MediumFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { GalleryFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/GalleryFilter"
import { SizeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ColorFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ColorFilter"
import { Box } from "@artsy/palette"
import { ArtistsFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { useSystemContext } from "v2/Artsy"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { AttributionClassFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { getENV } from "v2/Utils/getENV"
import { PartnersFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { ArtworkLocationFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { ArtistNationalityFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/MaterialsFilter"

interface FairArtworksFilterProps {
  fair: FairArtworks_fair
  relay: RelayRefetchProp
}

const FairArtworksFilter: React.FC<FairArtworksFilterProps> = props => {
  const { relay, fair } = props
  const { match } = useRouter()
  const { filtered_artworks } = fair
  const { relayEnvironment, user } = useSystemContext()

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  const { counts } = filtered_artworks

  // TODO: You shouldn't have to pass `relayEnvironment` and `user` through below.
  // For some reason, they are undefined when `useSystemContext()` is referenced
  // in <ArtistsFilter />. So, pass as props for now.
  const Filters = () => (
    <Box pr={2}>
      <ArtistsFilter
        fairID={fair.internalID}
        relayEnvironment={relayEnvironment}
        user={user}
      />
      <MediumFilter />
      {getENV("ENABLE_NEW_ARTWORK_FILTERS") && <MaterialsFilter />}
      <AttributionClassFilter />
      <PriceRangeFilter />
      <WaysToBuyFilter />
      {getENV("ENABLE_NEW_ARTWORK_FILTERS") ? (
        <>
          <PartnersFilter />
          <ArtworkLocationFilter />
          <ArtistNationalityFilter />
        </>
      ) : (
        <>
          <GalleryFilter />
        </>
      )}
      <SizeFilter />
      <TimePeriodFilter />
      <ColorFilter />
    </Box>
  )

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      counts={counts}
      sortOptions={[
        { text: "Default", value: "-decayed_merch" },
        { text: "Price (desc.)", value: "-has_price,-prices" },
        { text: "Price (asc.)", value: "-has_price,prices" },
        { text: "Recently updated", value: "-partner_updated_at" },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
      onChange={updateUrl}
    >
      <BaseArtworkFilter
        mt={[0, "-1px"]}
        relay={relay}
        viewer={fair}
        relayVariables={{
          aggregations: ["TOTAL"],
          shouldFetchCounts: false, // We don't need to refetch counts.
        }}
        Filters={Filters}
      ></BaseArtworkFilter>
    </ArtworkFilterContextProvider>
  )
}

export const FairArtworksRefetchContainer = createRefetchContainer(
  FairArtworksFilter,
  {
    fair: graphql`
      fragment FairArtworks_fair on Fair
        @argumentDefinitions(
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
          input: { type: "FilterArtworksInput" }
        ) {
        slug
        internalID
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          counts @include(if: $shouldFetchCounts) {
            followedArtists
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query FairArtworksQuery(
      $slug: String!
      $input: FilterArtworksInput
      $shouldFetchCounts: Boolean!
    ) {
      fair(id: $slug) {
        ...FairArtworks_fair
          @arguments(input: $input, shouldFetchCounts: $shouldFetchCounts)
      }
    }
  `
)
