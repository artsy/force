import { FC, Fragment, useEffect, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import {
  Spacer,
  Sup,
  Text,
  Box,
  Clickable,
  CloseIcon,
  Flex,
  Message,
} from "@artsy/palette"
import { Masonry } from "Components/Masonry"
import { extractNodes } from "Utils/extractNodes"
import { PaginationFragmentContainer } from "Components/Pagination"
import { useScrollToElement } from "Utils/Hooks/useScrollTo"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import { MetaTags } from "Components/MetaTags"
import { MyCollectionRoute_me } from "__generated__/MyCollectionRoute_me.graphql"
import { EmptyMyCollectionPage } from "./Components/EmptyMyCollectionPage"
import { SETTINGS_ROUTE_TABS_MARGIN } from "Apps/Settings/SettingsApp"

interface MyCollectionRouteProps {
  me: MyCollectionRoute_me
  relay: RelayRefetchProp
}

const MyCollectionRoute: FC<MyCollectionRouteProps> = ({ me, relay }) => {
  const [loading, setLoading] = useState(false)
  const [hasDismissedMessage, setHasDismissedMessage] = useState(true)

  useEffect(() => {
    setHasDismissedMessage(
      window.localStorage.getItem("HAS_SEEN_MY_COLLECTION_MESSAGE_BANNER") ===
        "true"
    )
  }, [])

  const { scrollTo } = useScrollToElement({
    selectorOrRef: "#jump--MyCollectionArtworks",
    behavior: "smooth",
    offset: 20,
  })

  const connection = me.myCollectionConnection

  if (!connection) {
    return null
  }

  const artworks = extractNodes(connection)
  const total = connection.totalCount ?? 0
  const hasNextPage = connection.pageInfo.hasNextPage ?? false
  const endCursor = connection.pageInfo.endCursor
  const pageCursors = connection.pageCursors!

  const handleClick = (cursor: string, page: number) => {
    setLoading(true)
    scrollTo()

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
            <Message
              variant="info"
              mt={-SETTINGS_ROUTE_TABS_MARGIN}
              mb={SETTINGS_ROUTE_TABS_MARGIN}
            >
              <Flex flexDirection="row" justifyContent="space-between">
                <Box />
                <Text mx={1}>
                  Access all the My Collection features on the Artsy app. Coming
                  soon also on web.
                </Text>
                <Clickable onClick={dismissMyCollectionMessage}>
                  <CloseIcon />
                </Clickable>
              </Flex>
            </Message>
          )}

          <Text variant="lg-display" mb={4}>
            My Collection <Sup color="brand">{total}</Sup>
          </Text>

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
                    hideSaleInfo
                    showSaveButton={false}
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
