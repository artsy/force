import { useRouter } from "System/Hooks/useRouter"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  Aggregations,
  ArtworkFilterContextProvider,
  Counts,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { SaleArtworksFilter_viewer$data } from "__generated__/SaleArtworksFilter_viewer.graphql"

interface SaleArtworkFilterProps {
  relay: RelayRefetchProp
  viewer: SaleArtworksFilter_viewer$data
}

const SaleArtworkFilter: React.FC<SaleArtworkFilterProps> = ({
  relay,
  viewer,
  ...rest
}) => {
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
  `
)

export const getArtworkFilterInputArgs = (user?: User) => {
  const aggregations = ["ARTIST", "MEDIUM", "TOTAL"]

  if (user) {
    aggregations.push("FOLLOWED_ARTISTS")
  }

  // Shared with saleRoutes
  return {
    aggregations,
    first: 39,
  }
}
