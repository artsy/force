import { Box, Button, DROP_SHADOW, Flex, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { MyCollectionArtworkGrid } from "Apps/Settings/Routes/MyCollection/Components/MyCollectionArtworkGrid"
import { MetaTags } from "Components/MetaTags"
import { Sticky } from "Components/Sticky"
import { FC, useCallback, useEffect, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import {
  cleanImagesLocalStore,
  getAllLocalImagesByArtwork,
  StoredArtworkWithImages,
  StoredImage,
} from "Utils/localImagesHelpers"
import { MyCollectionRoute_me$data } from "__generated__/MyCollectionRoute_me.graphql"
import { EmptyMyCollectionPage } from "./Components/EmptyMyCollectionPage"

export interface MyCollectionRouteProps {
  me: MyCollectionRoute_me$data
  relay: RelayPaginationProp
}

const MyCollectionRoute: FC<MyCollectionRouteProps> = ({ me, relay }) => {
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()
  const [isLoading, setLoading] = useState(false)
  const [localArtworksImages, setLocalArtworksImages] = useState<
    StoredArtworkWithImages[]
  >([])

  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  useEffect(() => {
    getAllLocalImagesByArtwork()
      .then(localImagesByArtwork => {
        setLocalArtworksImages(localImagesByArtwork)
      })
      .catch(error => {
        console.error("Error getting local images by artwork", error)
        return undefined
      })
  }, [])

  useEffect(() => {
    cleanImagesLocalStore()
  }, [])

  const { myCollectionConnection } = me

  const getLocalImageSrcByArtworkID = useCallback(
    (artworkID: string): StoredImage | null => {
      const allArtworkImages = localArtworksImages.find(
        localArtworkImagesObj => localArtworkImagesObj.artworkID === artworkID
      )?.images
      if (allArtworkImages?.length) {
        return allArtworkImages[0]
      }
      return null
    },
    [localArtworksImages]
  )

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
        pathname={
          isCollectorProfileEnabled
            ? "/collector-profile/my-collection"
            : "/my-collection"
        }
      />

      {total > 0 ? (
        <>
          <Box mt={[-2, -4]}>
            <Sticky>
              {({ stuck }) => {
                return (
                  <FullBleed
                    backgroundColor="white100"
                    style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
                  >
                    <AppContainer>
                      <HorizontalPadding>
                        <Flex
                          backgroundColor="white100"
                          justifyContent="flex-end"
                          py={2}
                        >
                          <Button
                            // @ts-ignore
                            as={RouterLink}
                            size={["small", "large"]}
                            variant="primaryBlack"
                            to={
                              isCollectorProfileEnabled
                                ? "/collector-profile/my-collection/artworks/new"
                                : "/my-collection/artworks/new"
                            }
                            onClick={() => trackAddCollectedArtwork()}
                          >
                            Upload Artwork
                          </Button>
                        </Flex>
                      </HorizontalPadding>
                    </AppContainer>
                  </FullBleed>
                )
              }}
            </Sticky>
          </Box>

          <MyCollectionArtworkGrid
            artworks={myCollectionConnection}
            columnCount={[2, 3, 4, 4]}
            getLocalImageSrcByArtworkID={getLocalImageSrcByArtworkID}
            showHoverDetails={false}
            showArtworksWithoutImages
            hideSaleInfo
            to={artwork =>
              isCollectorProfileEnabled
                ? `/collector-profile/my-collection/artwork/${artwork.internalID}`
                : `/my-collection/artwork/${artwork.internalID}`
            }
            showHighDemandIcon
            showSaveButton={false}
            onLoadMore={handleLoadMore}
          />

          {relay.hasMore() && (
            <Box textAlign="center" mt={4}>
              <Button onClick={handleLoadMore} loading={isLoading}>
                Show More
              </Button>
            </Box>
          )}
        </>
      ) : (
        <EmptyMyCollectionPage />
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
  }
)
