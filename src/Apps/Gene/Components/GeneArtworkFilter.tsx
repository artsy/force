import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  type SharedArtworkFilterContextProps,
  initialArtworkFilterState,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { GeneArtworkFilterQuery } from "__generated__/GeneArtworkFilterQuery.graphql"
import type { GeneArtworkFilter_gene$data } from "__generated__/GeneArtworkFilter_gene.graphql"
import type * as React from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"

interface GeneArtworkFilterProps {
  gene: GeneArtworkFilter_gene$data
  relay: RelayRefetchProp
}

const GeneArtworkFilter: React.FC<
  React.PropsWithChildren<GeneArtworkFilterProps>
> = ({ gene, relay }) => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const { sidebar } = gene

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      onChange={updateUrl}
      sortOptions={[
        { text: "Recommended", value: "-decayed_merch" },
        { text: "Price (High to Low)", value: "-has_price,-prices" },
        { text: "Price (Low to High)", value: "-has_price,prices" },
        { text: "Recently Updated", value: "-partner_updated_at" },
        { text: "Recently Added", value: "-published_at" },
        { text: "Artwork Year (Descending)", value: "-year" },
        { text: "Artwork Year (Ascending)", value: "year" },
      ]}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter relay={relay} viewer={gene} />
    </ArtworkFilterContextProvider>
  )
}

export const GeneArtworkFilterRefetchContainer = createRefetchContainer(
  GeneArtworkFilter,
  {
    gene: graphql`
      fragment GeneArtworkFilter_gene on Gene
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        aggregations: { type: "[ArtworkAggregation]" }
      ) {
        slug
        internalID
        sidebar: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          counts {
            total(format: "0,0")
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
          ...ImmersiveView_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query GeneArtworkFilterRefetchQuery(
      $slug: String!
      $input: FilterArtworksInput
    ) @cacheable {
      gene(id: $slug) {
        ...GeneArtworkFilter_gene @arguments(input: $input)
      }
    }
  `,
)

type GeneArtworkFilterQueryRendererProps = {}

export const GeneArtworkFilterQueryRenderer: React.FC<
  React.PropsWithChildren<GeneArtworkFilterQueryRendererProps>
> = rest => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<GeneArtworkFilterQuery>
        environment={relayEnvironment}
        query={graphql`
          query GeneArtworkFilterQuery(
            $slug: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) @cacheable {
            gene(id: $slug) {
              ...GeneArtworkFilter_gene
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `}
        variables={initializeVariablesWithFilterState(match.params, match)}
        fetchPolicy="store-and-network"
        placeholder={<ArtworkFilterPlaceholder />}
        render={({ error, props }) => {
          if (error || !props?.gene) {
            return <ArtworkFilterPlaceholder />
          }

          return (
            <GeneArtworkFilterRefetchContainer gene={props.gene} {...rest} />
          )
        }}
      />
    </LazyArtworkGrid>
  )
}

const initializeVariablesWithFilterState = (params, props) => {
  const aggregations = [
    "TOTAL",
    "ARTIST",
    "MEDIUM",
    "LOCATION_CITY",
    "MATERIALS_TERMS",
    "PARTNER",
    "ARTIST_NATIONALITY",
  ]

  const urlFilterState = props.location ? props.location.query : {}

  const filters = {
    ...initialArtworkFilterState,
    ...paramsToCamelCase(urlFilterState),
  }

  const geneSlug = params.slug

  return {
    aggregations,
    input: allowedFilters(filters),
    slug: geneSlug,
  }
}
