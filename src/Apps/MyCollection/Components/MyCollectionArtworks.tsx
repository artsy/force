import { FC, Fragment, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  ResponsiveBox,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Sup,
  Text,
} from "@artsy/palette"
import { Masonry } from "Components/Masonry"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworks_me } from "__generated__/MyCollectionArtworks_me.graphql"
import { MyCollectionArtworksQuery } from "__generated__/MyCollectionArtworksQuery.graphql"
import { PaginationFragmentContainer } from "Components/Pagination"
import { useScrollToElement } from "Utils/Hooks/useScrollTo"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"

interface MyCollectionArtworksProps {
  me: MyCollectionArtworks_me
  relay: RelayRefetchProp
}

const MyCollectionArtworks: FC<MyCollectionArtworksProps> = ({ me, relay }) => {
  const [loading, setLoading] = useState(false)

  const { scrollTo } = useScrollToElement({
    selectorOrRef: "#jump--SettingsSavedArtworks",
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
      <Text variant="lg-display" mb={4}>
        My Collection {total > 0 && <Sup color="brand">{total}</Sup>}
      </Text>

      {artworks.length > 0 ? (
        <>
          <Masonry
            id="jump--SettingsSavedArtworks"
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

export const MY_COLLECTION_ARTWORKS_QUERY = graphql`
  query MyCollectionArtworksQuery($page: Int) {
    me {
      ...MyCollectionArtworks_me @arguments(page: $page)
    }
  }
`

export const MyCollectionArtworksRefetchContainer = createRefetchContainer(
  MyCollectionArtworks,
  {
    me: graphql`
      fragment MyCollectionArtworks_me on Me
        @argumentDefinitions(page: { type: "Int" }) {
        myCollectionConnection(first: 10, page: $page, sort: CREATED_AT_DESC)
          @connection(
            key: "MyCollectionArtworks_myCollectionConnection"
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
  MY_COLLECTION_ARTWORKS_QUERY
)

const MY_COLLECTION_ARTWORKS_PLACEHOLDER = (
  <Skeleton>
    <SkeletonText variant="lg-display" mb={4}>
      My Collection
    </SkeletonText>

    <Masonry columnCount={[2, 3, 4]}>
      {[...new Array(10)].map((_, i) => {
        return (
          <div key={i}>
            <ResponsiveBox
              aspectWidth={[4, 3, 5, 6][i % 4]}
              aspectHeight={[3, 4, 5][i % 3]}
              maxWidth="100%"
            >
              <SkeletonBox width="100%" height="100%" />
            </ResponsiveBox>

            <SkeletonText variant="sm-display" mt={1}>
              Artist Name
            </SkeletonText>
            <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
            <SkeletonText variant="xs">Partner Name</SkeletonText>
            <SkeletonText variant="xs">US$0,000</SkeletonText>

            <Spacer mt={4} />
          </div>
        )
      })}
    </Masonry>
  </Skeleton>
)

export const MyCollectionArtworksQueryRenderer = () => {
  return (
    <SystemQueryRenderer<MyCollectionArtworksQuery>
      lazyLoad
      placeholder={MY_COLLECTION_ARTWORKS_PLACEHOLDER}
      query={MY_COLLECTION_ARTWORKS_QUERY}
      variables={{ count: 30 }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return MY_COLLECTION_ARTWORKS_PLACEHOLDER
        }

        return <MyCollectionArtworksRefetchContainer me={props.me} />
      }}
    />
  )
}
