import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"
import { initialArtworkFilterState } from "Components/ArtworkFilter/ArtworkFilterContext"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/urlBuilder"

const TagApp = loadable(
  () => import(/* webpackChunkName: "tagBundle" */ "./TagApp"),
  {
    resolveComponent: component => component.TagAppFragmentContainer,
  }
)

export const tagRoutes: RouteProps[] = [
  {
    path: "/tag/:slug",
    getComponent: () => TagApp,
    onClientSideRender: () => {
      TagApp.preload()
    },
    prepareVariables: ({ slug }, props) => {
      const aggregations = [
        "TOTAL",
        "MEDIUM",
        "LOCATION_CITY",
        "MATERIALS_TERMS",
        "PARTNER",
        "ARTIST_NATIONALITY",
        "MAJOR_PERIOD",
        "ARTIST",
      ]

      if (!!props.context.user) {
        aggregations.push("FOLLOWED_ARTISTS")
      }

      const urlFilterState = props.location ? props.location.query : {}

      const filters = {
        ...initialArtworkFilterState,
        ...paramsToCamelCase(urlFilterState),
      }

      return {
        aggregations,
        input: allowedFilters(filters),
        slug,
        shouldFetchCounts: !!props.context.user,
      }
    },
    query: graphql`
      query tagRoutes_TagQuery(
        $slug: String!
        $aggregations: [ArtworkAggregation]
        $input: FilterArtworksInput
        $shouldFetchCounts: Boolean!
      ) {
        tag(id: $slug) @principalField {
          ...TagApp_tag
            @arguments(
              input: $input
              aggregations: $aggregations
              shouldFetchCounts: $shouldFetchCounts
            )
        }
      }
    `,
  },
]
