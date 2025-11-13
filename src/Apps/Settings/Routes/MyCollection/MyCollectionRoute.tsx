import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { MyCollectionArtworkGrid } from "Apps/Settings/Routes/MyCollection/Components/MyCollectionArtworkGrid"
import { MetaTags } from "Components/MetaTags"
import { ShareCollectionDialog } from "Components/ShareCollectionDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useFlag } from "System/FeatureFlags/useFlag"
import { cleanLocalImages } from "Utils/localImageHelpers"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import ShareIcon from "@artsy/icons/ShareIcon"
import { Box, Button, Flex, Stack } from "@artsy/palette"
import type { MyCollectionRoute_me$data } from "__generated__/MyCollectionRoute_me.graphql"
import { type FC, useEffect, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  type RelayPaginationProp,
} from "react-relay"
import { useTracking } from "react-tracking"
import { EmptyMyCollectionPage } from "./Components/EmptyMyCollectionPage"

export interface MyCollectionRouteProps {
  me: MyCollectionRoute_me$data
  relay: RelayPaginationProp
}

const MyCollectionRoute: FC<
  React.PropsWithChildren<MyCollectionRouteProps>
> = ({ me, relay }) => {
  const enableShare = useFlag("onyx_shareable-my-collection")

  const { addCollectedArtwork: trackAddCollectedArtwork } =
    useMyCollectionTracking()
  const [isLoading, setLoading] = useState(false)
  const { trackEvent } = useTracking()

  useEffect(() => {
    cleanLocalImages()
  }, [])

  const { myCollection, myCollectionConnection } = me

  const [mode, setMode] = useState<"Idle" | "Share">("Idle")

  if (!myCollectionConnection) {
    return null
  }

  const total = myCollectionConnection.totalCount ?? 0

  const handleShare = () => {
    trackEvent(tracks.clickedShareButton())

    setMode("Share")
  }

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(25, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  return (
    <>
      <MetaTags
        title="My Collection | Artsy"
        pathname="/collector-profile/my-collection"
      />

      {total > 0 ? (
        <Stack gap={2}>
          <Flex backgroundColor="mono0" justifyContent="flex-end" gap={1}>
            {enableShare && (
              <Button
                size={["small", "large"]}
                variant="secondaryBlack"
                Icon={ShareIcon}
                onClick={handleShare}
              >
                Share
              </Button>
            )}

            <Button
              // @ts-expect-error
              as={RouterLink}
              size={["small", "large"]}
              variant="primaryBlack"
              to={"/collector-profile/my-collection/artworks/new"}
              onClick={() => trackAddCollectedArtwork()}
            >
              Upload Artwork
            </Button>
          </Flex>

          <MyCollectionArtworkGrid
            artworks={myCollectionConnection}
            onLoadMore={handleLoadMore}
          />

          {relay.hasMore() && (
            <Box textAlign="center" mt={4}>
              <Button onClick={handleLoadMore} loading={isLoading}>
                Show More
              </Button>
            </Box>
          )}
        </Stack>
      ) : (
        <EmptyMyCollectionPage />
      )}

      {mode === "Share" && myCollection && (
        <ShareCollectionDialog
          onClose={() => setMode("Idle")}
          collection={myCollection}
        />
      )}
    </>
  )
}

export const MyCollectionRoutePaginationContainer = createPaginationContainer(
  MyCollectionRoute,
  {
    me: graphql`
      fragment MyCollectionRoute_me on Me
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 25 }
        cursor: { type: "String" }
      ) {
        myCollection: collection(id: "my-collection") {
          internalID
          slug
          name
          private
        }
        myCollectionConnection(
          first: $count
          after: $cursor
          sort: CREATED_AT_DESC
        )
          @connection(
            key: "MyCollectionRoute_myCollectionConnection"
            filters: []
          ) {
          ...MyCollectionArtworkGrid_artworks
          totalCount
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query MyCollectionRouteQuery($count: Int!, $cursor: String) {
        me {
          ...MyCollectionRoute_me @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

const tracks = {
  clickedShareButton: () => ({
    action: ActionType.clickedShareButton,
    context_module: ContextModule.myCollection,
    context_owner_type: OwnerType.myCollection,
    context_owner_id: "my-collection",
    context_owner_slug: "my-collection",
  }),
}
