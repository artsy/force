import { ShowArtworks_show } from "v2/__generated__/ShowArtworks_show.graphql"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { MediumFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { SizeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ColorFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ColorFilter"
import { Box, BoxProps } from "@artsy/palette"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { getENV } from "v2/Utils/getENV"
import { ArtistNationalityFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { omit } from "lodash"

interface ShowArtworksFilterProps extends BoxProps {
  show: ShowArtworks_show
  relay: RelayRefetchProp
}

const ShowArtworksFilter: React.FC<ShowArtworksFilterProps> = ({
  relay,
  show,
  ...rest
}) => {
  const { match } = useRouter()
  const { filtered_artworks } = show

  const hasFilter = filtered_artworks && filtered_artworks.id

  if (!hasFilter) return null

  const Filters = () => (
    <Box pr={2}>
      <MediumFilter />
      {getENV("ENABLE_NEW_ARTWORK_FILTERS") && <MaterialsFilter />}
      <PriceRangeFilter />
      <WaysToBuyFilter />
      {getENV("ENABLE_NEW_ARTWORK_FILTERS") && <ArtistNationalityFilter />}
      <SizeFilter />
      <TimePeriodFilter />
      <ColorFilter />
    </Box>
  )

  // Inject custom default sort into artwork filter.
  const filters = omit(
    {
      sort: "partner_show_position",
      ...(match && match.location.query),
    },
    "from_show_guide" // TODO: Investigate if we need this param.
  )

  return (
    <ArtworkFilterContextProvider
      filters={filters}
      sortOptions={[
        { text: "Gallery Curated", value: "partner_show_position" },
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
        mt={0}
        relay={relay}
        viewer={show}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
        Filters={Filters}
        {...rest}
      />
    </ArtworkFilterContextProvider>
  )
}

export const ShowArtworksRefetchContainer = createRefetchContainer(
  ShowArtworksFilter,
  {
    show: graphql`
      fragment ShowArtworks_show on Show
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        filtered_artworks: filterArtworksConnection(first: 20, input: $input) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ShowArtworksQuery($slug: String!, $input: FilterArtworksInput) {
      show(id: $slug) {
        ...ShowArtworks_show @arguments(input: $input)
      }
    }
  `
)
