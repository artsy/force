import { Box, Separator, Spacer, Text, Flex } from "@artsy/palette"
import StaticContainer from "found/StaticContainer"
import { Match, Router } from "found"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { buildUrlForCollectApp } from "Apps/Collect/Utils/urlBuilder"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { getMetadata, Medium, Color } from "./Utils/getMetadata"
import { Collect_marketingCollections$data } from "__generated__/Collect_marketingCollections.graphql"
import { CollectArtworkFilterQuery } from "__generated__/CollectArtworkFilterQuery.graphql"
import { CollectionsHubsNavFragmentContainer as CollectionsHubsNav } from "Components/CollectionsHubsNav"
import { ArtworkFilter } from "Components/ArtworkFilter"
import { RouterLink } from "System/Components/RouterLink"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { MetaTags } from "Components/MetaTags"
import { initializeVariablesWithFilterState } from "Apps/Collect/collectRoutes"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"

export interface CollectAppProps {
  match: Match
  router: Router
  marketingCollections: Collect_marketingCollections$data
}

export const CollectApp: React.FC<CollectAppProps> = ({
  marketingCollections,
  match: { location, params },
}) => {
  const { silentReplace, match } = useRouter()
  const { userPreferences } = useSystemContext()

  const medium = params?.medium as Medium
  const color = params?.color as Color
  const { description, title } = getMetadata({
    medium,
    color,
  })

  let canonicalHref

  if (medium) {
    canonicalHref = `collect/${medium}`
  } else if (color) {
    canonicalHref = `collect/color/${color}`
  } else {
    canonicalHref = `collect`
  }

  return (
    <>
      <FrameWithRecentlyViewed>
        <MetaTags
          title={title}
          description={description}
          pathname={canonicalHref}
        />

        <Box mt={4}>
          <Flex
            justifyContent="space-between"
            alignItems={["left", "center"]}
            flexDirection={["column", "row"]}
          >
            <Text variant={["lg-display", "xl"]}>
              <h1>Collect art and design online</h1>
            </Text>
            <Spacer y={1} />
            <Text variant="sm-display">
              <RouterLink to="/collections">Browse by collection</RouterLink>
            </Text>
          </Flex>

          <Separator my={4} />

          <CollectionsHubsNav marketingCollections={marketingCollections} />

          <Spacer y={6} />
        </Box>

        <Box>
          {/* Prevent layout jank when transitioning routes, because that
              generates new params from `match` and causes rerenders */}
          <StaticContainer shouldUpdate={!!match.elements}>
            <SystemQueryRenderer<CollectArtworkFilterQuery>
              query={graphql`
                query CollectArtworkFilterQuery(
                  $input: FilterArtworksInput
                  $aggregations: [ArtworkAggregation]
                  $shouldFetchCounts: Boolean!
                ) {
                  viewer {
                    ...ArtworkFilter_viewer @arguments(input: $input)
                    artworksConnection(
                      aggregations: $aggregations
                      input: $input
                    ) {
                      counts @include(if: $shouldFetchCounts) {
                        followedArtists
                      }
                      aggregations {
                        slice
                        counts {
                          value
                          name
                          count
                        }
                      }
                    }
                  }
                }
              `}
              variables={initializeVariablesWithFilterState(
                match.params,
                match
              )}
              fetchPolicy="store-and-network"
              placeholder={<ArtworkFilterPlaceholder />}
              render={({ props }) => {
                if (!props?.viewer) {
                  return <ArtworkFilterPlaceholder />
                }

                return (
                  <ArtworkFilter
                    viewer={props.viewer}
                    aggregations={
                      props.viewer?.artworksConnection
                        ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
                    }
                    counts={props.viewer?.artworksConnection?.counts as Counts}
                    filters={location.query as any}
                    sortOptions={[
                      { text: "Recommended", value: "-decayed_merch" },
                      {
                        text: "Recently Updated",
                        value: "-partner_updated_at",
                      },
                      { text: "Recently Added", value: "-published_at" },
                      { text: "Artwork Year (Descending)", value: "-year" },
                      { text: "Artwork Year (Ascending)", value: "year" },
                    ]}
                    onChange={filters => {
                      const url = buildUrlForCollectApp(filters)

                      silentReplace(url)
                    }}
                    userPreferredMetric={userPreferences?.metric}
                  />
                )
              }}
            />
          </StaticContainer>
        </Box>
      </FrameWithRecentlyViewed>
    </>
  )
}

export const CollectAppFragmentContainer = createFragmentContainer(CollectApp, {
  marketingCollections: graphql`
    fragment Collect_marketingCollections on MarketingCollection
      @relay(plural: true) {
      ...CollectionsHubsNav_marketingCollections
    }
  `,
})
