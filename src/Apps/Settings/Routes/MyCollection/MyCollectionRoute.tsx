import ShareIcon from "@artsy/icons/ShareIcon"
import { Box, Button, Flex, Stack } from "@artsy/palette"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { MyCollectionArtworkGrid } from "Apps/Settings/Routes/MyCollection/Components/MyCollectionArtworkGrid"
import { MetaTags } from "Components/MetaTags"
import { ShareCollectionDialog } from "Components/ShareCollectionDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { cleanLocalImages } from "Utils/localImageHelpers"
import type { MyCollectionRoute_me$data } from "__generated__/MyCollectionRoute_me.graphql"
import { type FC, useEffect, useState } from "react"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { EmptyMyCollectionPage } from "./Components/EmptyMyCollectionPage"

export interface MyCollectionRouteProps {
  me: MyCollectionRoute_me$data
  relay: RelayPaginationProp
}

const MyCollectionRoute: FC<
  React.PropsWithChildren<MyCollectionRouteProps>
> = ({ me, relay }) => {
  const enableShare = useFeatureFlag("diamond_shareable-artwork-lists")

  const { addCollectedArtwork: trackAddCollectedArtwork } =
    useMyCollectionTracking()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    cleanLocalImages()
  }, [])

  const { myCollectionConnection } = me

  const [mode, setMode] = useState<"Idle" | "Share">("Idle")

  if (!myCollectionConnection) {
    return null
  }

  const total = myCollectionConnection.totalCount ?? 0

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
          <Flex backgroundColor="white100" justifyContent="flex-end" gap={1}>
            {enableShare && (
              <Button
                variant="secondaryBlack"
                Icon={ShareIcon}
                onClick={() => setMode("Share")}
              >
                Share
              </Button>
            )}

            <Button
              // @ts-ignore
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

      {mode === "Share" && (
        <ShareCollectionDialog
          onClose={() => setMode("Idle")}
          collectionId="my-collection"
          collectionName="My Collection"
          isPublic={false}
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
  },
)
