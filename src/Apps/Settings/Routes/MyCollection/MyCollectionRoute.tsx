import {
  Box,
  Button,
  DROP_SHADOW,
  Flex,
  FullBleed,
  Spacer,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { MetaTags } from "Components/MetaTags"
import { PaginationFragmentContainer } from "Components/Pagination"
import { Sticky } from "Components/Sticky"
import { FC, Fragment, useCallback, useEffect, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { extractNodes } from "Utils/extractNodes"
import { Jump, useJump } from "Utils/Hooks/useJump"
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
  relay: RelayRefetchProp
}

const MyCollectionRoute: FC<MyCollectionRouteProps> = ({ me, relay }) => {
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

  // TODO: Avoid using boolean state flags for UI modes
  const [loading, setLoading] = useState(false)
  const [localArtworksImages, setLocalArtworksImages] = useState<
    StoredArtworkWithImages[]
  >([])

  const enableMyCollectionPhase2 = useFeatureFlag("my-collection-web-phase-2")
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  const { jumpTo } = useJump()

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

  const artworks = extractNodes(myCollectionConnection)
  const total = myCollectionConnection.totalCount ?? 0
  const hasNextPage = myCollectionConnection.pageInfo.hasNextPage ?? false
  const endCursor = myCollectionConnection.pageInfo.endCursor
  const pageCursors = myCollectionConnection.pageCursors!

  const handleClick = (_: string, page: number) => {
    setLoading(true)
    jumpTo("MyCollectionArtworks")

    relay.refetch({ page }, null, error => {
      if (error) console.error(error)
      setLoading(false)
    })
  }

  const handleNext = (page: number) => {
    if (!endCursor) return
    handleClick(endCursor, page)
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

          <Jump id="MyCollectionArtworks">
            <Masonry
              columnCount={[2, 3, 4]}
              style={{ opacity: loading ? 0.5 : 1 }}
            >
              {artworks.map(artwork => {
                return (
                  <Fragment key={artwork.internalID}>
                    <ArtworkGridItemFragmentContainer
                      artwork={artwork}
                      localHeroImage={getLocalImageSrcByArtworkID(
                        artwork.internalID
                      )}
                      hideSaleInfo
                      showSaveButton={false}
                      showHoverDetails={false}
                      disableRouterLinking={!enableMyCollectionPhase2}
                      isMyCollectionArtwork
                    />

                    <Spacer y={4} />
                  </Fragment>
                )
              })}
            </Masonry>
          </Jump>

          <PaginationFragmentContainer
            hasNextPage={hasNextPage}
            pageCursors={pageCursors}
            onClick={handleClick}
            onNext={handleNext}
          />
        </>
      ) : (
        <EmptyMyCollectionPage />
      )}
    </>
  )
}

export const MY_COLLECTION_ROUTE_QUERY = graphql`
  query MyCollectionRouteQuery($page: Int) {
    me {
      ...MyCollectionRoute_me @arguments(page: $page)
    }
  }
`

export const MyCollectionRouteRefetchContainer = createRefetchContainer(
  MyCollectionRoute,
  {
    me: graphql`
      fragment MyCollectionRoute_me on Me
        @argumentDefinitions(page: { type: "Int", defaultValue: 1 }) {
        myCollectionConnection(first: 10, page: $page, sort: CREATED_AT_DESC)
          @connection(
            key: "MyCollectionRoute_myCollectionConnection"
            filters: []
          ) {
          totalCount
          pageInfo {
            hasNextPage
            startCursor
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              internalID
              ...GridItem_artwork
            }
          }
        }
      }
    `,
  },
  MY_COLLECTION_ROUTE_QUERY
)
