import { getArtworkFilterInputArgs } from "Apps/Auction/Components/getArtworkFilterInputArgs"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  type Aggregations,
  ArtworkFilterContextProvider,
  type Counts,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { SaleArtworksFilter_viewer$data } from "__generated__/SaleArtworksFilter_viewer.graphql"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"

interface SaleArtworkFilterProps {
  relay: RelayRefetchProp
  viewer: SaleArtworksFilter_viewer$data
  featuredKeywords?: readonly string[]
}

const SaleArtworkFilter: React.FC<
  React.PropsWithChildren<SaleArtworkFilterProps>
> = ({ relay, viewer, featuredKeywords, ...rest }) => {
  const { user, userPreferences } = useSystemContext()
  const { match } = useRouter()

  if (!viewer.sidebarAggregations) return null

  const { aggregations, counts } = viewer.sidebarAggregations

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      sortOptions={[
        { text: "Curated", value: "sale_position" },
        { text: "Price (High to Low)", value: "-has_price,-prices" },
        { text: "Price (Low to High)", value: "-has_price,prices" },
        { text: "Recently Updated", value: "-partner_updated_at" },
        { text: "Recently Added", value: "-published_at" },
      ]}
      onChange={updateUrl}
      aggregations={aggregations as Aggregations}
      counts={counts as Counts}
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter
        mt={0}
        relay={relay}
        viewer={viewer}
        featuredKeywords={featuredKeywords}
        relayRefetchInputVariables={{
          ...getArtworkFilterInputArgs(user),
          saleID: match && match.params.slug,
        }}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
        {...rest}
      />
    </ArtworkFilterContextProvider>
  )
}

export const SaleArtworkFilterRefetchContainer = createRefetchContainer(
  SaleArtworkFilter,
  {
    viewer: graphql`
      fragment SaleArtworksFilter_viewer on Viewer
      @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        filtered_artworks: artworksConnection(input: $input) {
          id
          counts {
            total(format: "0,0")
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }

        sidebarAggregations: artworksConnection(input: $input, first: 1) {
          counts {
            followedArtists
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
    `,
  },
  graphql`
    query SaleArtworksFilterQuery($input: FilterArtworksInput) {
      viewer {
        ...SaleArtworksFilter_viewer @arguments(input: $input)
      }
    }
  `,
)
