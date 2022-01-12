import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { WorksForYou2App_viewerArtist } from "v2/__generated__/WorksForYou2App_viewerArtist.graphql"
import { WorksForYou2App_viewerFeed } from "v2/__generated__/WorksForYou2App_viewerFeed.graphql"
import { WorksForYou2App_viewerMe } from "v2/__generated__/WorksForYou2App_viewerMe.graphql"
import { WorksForYou2App_viewerSidebarAggregations } from "v2/__generated__/WorksForYou2App_viewerSidebarAggregations.graphql"
import { WorksForYou2FeedPaginationContainer } from "./Components/WorksForYou2Feed"
import {
  Column,
  FilterSelect,
  FilterSelectChangeState,
  FilterSelectItems,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { WorksForYou2ArtistFeedPaginationContainer } from "./Components/WorksForYou2ArtistFeed"
import { useRouter } from "v2/System/Router/useRouter"
import { extractNodes } from "v2/Utils/extractNodes"
import { RouterLink } from "v2/System/Router/RouterLink"

interface WorksForYou2Props {
  viewerArtist: WorksForYou2App_viewerArtist
  viewerFeed: WorksForYou2App_viewerFeed
  viewerMe: WorksForYou2App_viewerMe
  viewerSidebarAggregations: WorksForYou2App_viewerSidebarAggregations
}

const WorksForYou2App: React.FC<WorksForYou2Props> = ({
  viewerArtist,
  viewerFeed,
  viewerMe,
  viewerSidebarAggregations,
}) => {
  const { router } = useRouter()

  const artists =
    (viewerSidebarAggregations.sidebarAggregations?.aggregations?.[0]
      ?.counts as FilterSelectItems) ?? []

  const savedArtworks = extractNodes(
    viewerMe.me?.followsAndSaves?.bundledArtworksByArtistConnection
  )

  const handleResultsFilterChange = (state: FilterSelectChangeState) => {
    const artistSlug = state.selectedItems[0]?.value

    if (artistSlug) {
      router.push(`/works-for-you2/${artistSlug}`)
    } else {
      router.push("/works-for-you2")
    }
  }

  return (
    <>
      <MetaTags title="Works For You | Artsy" description="TODO" />

      <Text variant="xl" my={4}>
        Works By Artists You Follow
      </Text>

      <Spacer my={2} />

      {savedArtworks.length === 0 ? (
        <>
          <Text variant="lg">Nothing yet.</Text>
          <Text variant="lg" color="black60" mt={1}>
            Follow{" "}
            <RouterLink color="black60" to="/artists">
              some artists
            </RouterLink>
            .
          </Text>
        </>
      ) : (
        <GridColumns>
          <Column span={3}>
            <FilterSelect
              placeholder="Filter by artist name"
              initialItemsToShow={6}
              multiselect={false}
              order={[
                ["label", "count"],
                ["asc", "desc"],
              ]}
              onChange={handleResultsFilterChange}
              items={artists}
            />
          </Column>

          <Column span={9}>
            {viewerArtist && (
              <WorksForYou2ArtistFeedPaginationContainer
                viewer={viewerArtist}
              />
            )}

            {viewerFeed && (
              <WorksForYou2FeedPaginationContainer viewer={viewerFeed} />
            )}
          </Column>
        </GridColumns>
      )}
    </>
  )
}

export const WorksForYou2AppFragmentContainer = createFragmentContainer(
  WorksForYou2App,
  {
    viewerArtist: graphql`
      fragment WorksForYou2App_viewerArtist on Viewer
        @argumentDefinitions(
          artistSlug: { type: "String!", defaultValue: "" }
        ) {
        ...WorksForYou2ArtistFeed_viewer @arguments(artistSlug: $artistSlug)
      }
    `,
    viewerFeed: graphql`
      fragment WorksForYou2App_viewerFeed on Viewer {
        ...WorksForYou2Feed_viewer
      }
    `,
    viewerMe: graphql`
      fragment WorksForYou2App_viewerMe on Viewer {
        me {
          followsAndSaves {
            bundledArtworksByArtistConnection(first: 1, forSale: true) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    `,
    viewerSidebarAggregations: graphql`
      fragment WorksForYou2App_viewerSidebarAggregations on Viewer {
        sidebarAggregations: artworksConnection(
          aggregations: [ARTIST, FOLLOWED_ARTISTS]
          first: 1
        ) {
          counts {
            followedArtists
          }
          aggregations {
            counts {
              label: name
              value
              count
            }
          }
        }
      }
    `,
  }
)
