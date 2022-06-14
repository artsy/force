import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { WorksForYouApp_viewerArtist } from "v2/__generated__/WorksForYouApp_viewerArtist.graphql"
import { WorksForYouApp_viewerFeed } from "v2/__generated__/WorksForYouApp_viewerFeed.graphql"
import { WorksForYouApp_viewerMe } from "v2/__generated__/WorksForYouApp_viewerMe.graphql"
import { WorksForYouFeedPaginationContainer } from "./Components/WorksForYouFeed"
import {
  Button,
  Column,
  FilterSelect,
  FilterSelectChangeState,
  FilterSelectItems,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { WorksForYouArtistFeedPaginationContainer } from "./Components/WorksForYouArtistFeed"
import { useRouter } from "v2/System/Router/useRouter"
import { extractNodes } from "v2/Utils/extractNodes"
import { RouterLink } from "v2/System/Router/RouterLink"

interface WorksForYouProps {
  viewerArtist: WorksForYouApp_viewerArtist
  viewerFeed: WorksForYouApp_viewerFeed
  viewerMe: WorksForYouApp_viewerMe
}

const WorksForYouApp: React.FC<WorksForYouProps> = ({
  viewerArtist,
  viewerFeed,
  viewerMe,
}) => {
  const { router } = useRouter()

  const followedArtists = extractNodes(
    viewerMe.me?.followsAndSaves?.artistsConnection
  ).map(item => ({
    label: item.artist?.name,
    value: item.artist?.slug,
  })) as FilterSelectItems

  const savedArtworks = extractNodes(
    viewerMe.me?.followsAndSaves?.bundledArtworksByArtistConnection
  )

  const handleResultsFilterChange = (state: FilterSelectChangeState) => {
    const artistSlug = state.selectedItems[0]?.value

    if (artistSlug) {
      router.push(`/works-for-you/${artistSlug}`)
    } else {
      router.push("/works-for-you")
    }
  }

  return (
    <>
      <MetaTags title="Works by Artists You Follow | Artsy" />

      <Text variant={["lg-display", "xl"]} my={[2, 4]}>
        Works By Artists You Follow
      </Text>

      <Spacer my={2} />

      {savedArtworks.length === 0 ? (
        <>
          <Text variant="lg-display">Nothing yet.</Text>
          <Text variant="lg-display" color="black60" mt={1}>
            Follow{" "}
            <RouterLink color="black60" to="/artists">
              some artists
            </RouterLink>
            .
          </Text>
        </>
      ) : (
        <GridColumns>
          <Column span={3} display={["none", "block"]}>
            <FilterSelect
              placeholder="Filter by artist name"
              initialItemsToShow={6}
              multiselect={false}
              order={[
                ["label", "count"],
                ["asc", "desc"],
              ]}
              onChange={handleResultsFilterChange}
              items={followedArtists}
            />
          </Column>

          <Column
            span={9}
            // Fix for issue in Firefox where contents overflow container.
            // Safe to remove once artwork masonry uses CSS grid.
            width="100%"
          >
            <GridColumns mt={0.5}>
              <Column span={9}>
                <Text variant="sm-display" fontWeight="medium">
                  In-demand artworks, available to buy now
                </Text>
                <Text variant="sm-display" color="black60">
                  Collect works by today’s top artists, with transparent
                  pricing, easy shipping, and a simple checkout process.
                </Text>
              </Column>
              <Column span={3}>
                <Button
                  size="large"
                  // @ts-ignore
                  as={RouterLink}
                  to="/collect"
                >
                  Browse Works
                </Button>
              </Column>
            </GridColumns>

            <Spacer my={4} />

            {viewerArtist && (
              <WorksForYouArtistFeedPaginationContainer viewer={viewerArtist} />
            )}

            {viewerFeed && (
              <WorksForYouFeedPaginationContainer viewer={viewerFeed} />
            )}
          </Column>
        </GridColumns>
      )}
    </>
  )
}

export const WorksForYouAppFragmentContainer = createFragmentContainer(
  WorksForYouApp,
  {
    viewerArtist: graphql`
      fragment WorksForYouApp_viewerArtist on Viewer
        @argumentDefinitions(
          artistSlug: { type: "String!", defaultValue: "" }
        ) {
        ...WorksForYouArtistFeed_viewer @arguments(artistSlug: $artistSlug)
      }
    `,
    viewerFeed: graphql`
      fragment WorksForYouApp_viewerFeed on Viewer {
        ...WorksForYouFeed_viewer
      }
    `,
    viewerMe: graphql`
      fragment WorksForYouApp_viewerMe on Viewer {
        me {
          followsAndSaves {
            artistsConnection(first: 99) {
              totalCount
              edges {
                node {
                  artist {
                    name
                    slug
                  }
                }
              }
            }
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
  }
)
