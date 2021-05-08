import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/Artsy/Router/Route"
import { graphql } from "relay-runtime"
import { initialArtworkFilterState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"

const TagApp = loadable(() => import("./TagApp"), {
  resolveComponent: component => component.TagAppFragmentContainer,
})

export const tagRoutes: AppRouteConfig[] = [
  {
    path: "/tag/:slug",
    getComponent: () => TagApp,
    theme: "v3",
    prepare: () => {
      TagApp.preload()
    },
    prepareVariables: ({ slug }, props) => {
      const urlFilterState = props.location ? props.location.query : {}

      const filters = {
        ...initialArtworkFilterState,
        ...paramsToCamelCase(urlFilterState),
      }

      return {
        input: allowedFilters(filters),
        slug,
      }
    },
    query: graphql`
      query tagRoutes_TagQuery($slug: String!, $input: FilterArtworksInput) {
        tag(id: $slug) @principalField {
          ...TagApp_tag @arguments(input: $input)
        }
      }
    `,
  },
]
