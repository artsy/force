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
import { EmptyMyCollectionPage } from "Apps/Settings/Routes/MyCollection/Components/EmptyMyCollectionPage"
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
import { CollectorProfileMyCollectionRoute_me$data } from "__generated__/CollectorProfileMyCollectionRoute_me.graphql"

interface CollectorProfileMyCollectionRouteProps {
  me: CollectorProfileMyCollectionRoute_me$data
  relay: RelayRefetchProp
}

const CollectorProfileMyCollectionRoute: FC<CollectorProfileMyCollectionRouteProps> = ({
  me,
  relay,
}) => {
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

  // TODO: Avoid using boolean state flags for UI modes
  const [loading, setLoading] = useState(false)
  const [localArtworksImages, setLocalArtworksImages] = useState<
    StoredArtworkWithImages[]
  >([])

  const enableMyCollectionPhase2 = useFeatureFlag("my-collection-web-phase-2")

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
    jumpTo("CollectorProfileMyCollectionArtworks")

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
        pathname="/my-collection" // TODO: fix in CX-3244?
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
                            to="/my-collection/artworks/new" // TODO: fix in CX-3244
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

          <Jump id="CollectorProfileMyCollectionArtworks">
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
  query CollectorProfileMyCollectionRouteQuery($page: Int) {
    me {
      ...CollectorProfileMyCollectionRoute_me @arguments(page: $page)
    }
  }
`

export const CollectorProfileMyCollectionRouteRefetchContainer = createRefetchContainer(
  CollectorProfileMyCollectionRoute,
  {
    me: graphql`
      fragment CollectorProfileMyCollectionRoute_me on Me
        @argumentDefinitions(page: { type: "Int", defaultValue: 1 }) {
        myCollectionConnection(first: 10, page: $page, sort: CREATED_AT_DESC)
          @connection(
            key: "CollectorProfileMyCollectionRoute_myCollectionConnection"
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
