import {
  Box,
  Button,
  Clickable,
  CloseIcon,
  DROP_SHADOW,
  Flex,
  FullBleed,
  Message,
  Spacer,
  Text,
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
import { useScrollTo, useScrollToElement } from "Utils/Hooks/useScrollTo"
import {
  cleanImagesLocalStore,
  getAllLocalImagesByArtwork,
  StoredArtworkWithImages,
  StoredImage,
} from "Utils/localImagesHelpers"
import { MyCollectionRoute_me } from "__generated__/MyCollectionRoute_me.graphql"
import { EmptyMyCollectionPage } from "./Components/EmptyMyCollectionPage"
import { IMAGES_LOCAL_STORE_KEY } from "./constants"

interface MyCollectionRouteProps {
  me: MyCollectionRoute_me
  relay: RelayRefetchProp
}

const MyCollectionRoute: FC<MyCollectionRouteProps> = ({ me, relay }) => {
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()
  const isMyCollectionPhase3Enabled = useFeatureFlag(
    "my-collection-web-phase-3"
  )

  const [loading, setLoading] = useState(false)
  const [hasDismissedMessage, setHasDismissedMessage] = useState(true)

  const [localArtworksImages, setLocalArtworksImages] = useState<
    StoredArtworkWithImages[]
  >([])

  const enableMyCollectionPhase2 = useFeatureFlag("my-collection-web-phase-2")

  const { scrollTo } = useScrollTo({ behavior: "smooth" })

  useEffect(() => {
    setHasDismissedMessage(
      window.localStorage.getItem("HAS_SEEN_MY_COLLECTION_MESSAGE_BANNER") ===
        "true"
    )
  }, [])

  useEffect(() => {
    getAllLocalImagesByArtwork(IMAGES_LOCAL_STORE_KEY)
      .then(localImagesByArtwork => {
        setLocalArtworksImages(localImagesByArtwork)
      })
      .catch(error => {
        console.error("Error getting local images by artwork", error)
        return undefined
      })
  }, [])

  useEffect(() => {
    cleanImagesLocalStore(IMAGES_LOCAL_STORE_KEY)
  }, [])

  const { scrollTo: scrollToMyCollection } = useScrollToElement({
    selectorOrRef: "#jump--MyCollectionArtworks",
    behavior: "smooth",
    offset: 20,
  })

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
    scrollToMyCollection()

    relay.refetch({ page }, null, error => {
      if (error) console.error(error)
      setLoading(false)
    })
  }

  const handleNext = (page: number) => {
    if (!endCursor) return
    handleClick(endCursor, page)
  }

  const dismissMyCollectionMessage = () => {
    window.localStorage.setItem("HAS_SEEN_MY_COLLECTION_MESSAGE_BANNER", "true")
    setHasDismissedMessage(true)
  }

  return (
    <>
      <MetaTags title="My Collection | Artsy" pathname="/my-collection" />

      {total > 0 ? (
        <>
          {!hasDismissedMessage && (
            <FullBleed>
              <Message variant="info" mt={[-2, -4]} mb={[2, 4]} py={1}>
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    flex={1}
                    textAlign={["left", "center"]}
                    variant={["xs", "sm"]}
                  >
                    Access all the My Collection features on the{" "}
                    <Clickable
                      onClick={() => {
                        scrollTo("#download-app-banner")
                      }}
                      color="blue100"
                      cursor="pointer"
                      textDecoration="underline"
                    >
                      Artsy app
                    </Clickable>
                    . Coming soon also on web.
                  </Text>

                  <Clickable onClick={dismissMyCollectionMessage}>
                    <CloseIcon />
                  </Clickable>
                </Flex>
              </Message>
            </FullBleed>
          )}

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
                          {!!isMyCollectionPhase3Enabled && (
                            <Button
                              // @ts-ignore
                              as={RouterLink}
                              size={["small", "large"]}
                              variant="primaryBlack"
                              to="/my-collection/artworks/new"
                              onClick={() => trackAddCollectedArtwork()}
                            >
                              Upload Artwork
                            </Button>
                          )}
                        </Flex>
                      </HorizontalPadding>
                    </AppContainer>
                  </FullBleed>
                )
              }}
            </Sticky>
          </Box>

          <Masonry
            id="jump--MyCollectionArtworks"
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

                  <Spacer mt={4} />
                </Fragment>
              )
            })}
          </Masonry>

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
