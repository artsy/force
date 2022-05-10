import { ShowArtworks_show } from "v2/__generated__/ShowArtworks_show.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { BoxProps } from "@artsy/palette"
import { useRouter } from "v2/System/Router/useRouter"
import { omit } from "lodash"

interface ShowArtworksFilterProps extends BoxProps {
  show: ShowArtworks_show
  relay: RelayRefetchProp
  aggregations: SharedArtworkFilterContextProps["aggregations"]
  counts?: Counts
}

const ShowArtworksFilter: React.FC<ShowArtworksFilterProps> = props => {
  const { match } = useRouter()
  const { relay, show, aggregations, counts, ...rest } = props
  const { filtered_artworks } = show

  const hasFilter = filtered_artworks && filtered_artworks.id

  if (!hasFilter) return null

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
      aggregations={aggregations}
      counts={counts}
    >
      <BaseArtworkFilter
        mt={0}
        relay={relay}
        viewer={show}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
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
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
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
