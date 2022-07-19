import { FC, Fragment, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Spacer, Sup, Text } from "@artsy/palette"
import { Masonry } from "Components/Masonry"
import { extractNodes } from "Utils/extractNodes"
import { PaginationFragmentContainer } from "Components/Pagination"
import { useScrollToElement } from "Utils/Hooks/useScrollTo"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import { MetaTags } from "Components/MetaTags"
import { MyCollectionApp_me } from "__generated__/MyCollectionApp_me.graphql"

interface MyCollectionAppProps {
  me: MyCollectionApp_me
  relay: RelayRefetchProp
}

const MyCollectionApp: FC<MyCollectionAppProps> = ({ me, relay }) => {
  const [loading, setLoading] = useState(false)

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

  return (
    <>
      <MetaTags title="My Collection | Artsy" pathname="/my-collection" />

      <Text variant="lg-display" mb={4}>
        My Collection {total > 0 && <Sup color="brand">{total}</Sup>}
      </Text>

      {total > 0 ? (
        <>
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
        <Text variant="lg-display" color="black60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const MY_COLLECTION_APP_QUERY = graphql`
  query MyCollectionAppQuery($page: Int) {
    me {
      ...MyCollectionApp_me @arguments(page: $page)
    }
  }
`

export const MyCollectionAppRefetchContainer = createRefetchContainer(
  MyCollectionApp,
  {
    me: graphql`
      fragment MyCollectionApp_me on Me
        @argumentDefinitions(page: { type: "Int", defaultValue: 1 }) {
        myCollectionConnection(first: 10, page: $page, sort: CREATED_AT_DESC)
          @connection(
            key: "MyCollectionApp_myCollectionConnection"
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
  MY_COLLECTION_APP_QUERY
)
