import { FC, Fragment, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  ResponsiveBox,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Sup,
  Text,
} from "@artsy/palette"
import { Masonry } from "v2/Components/Masonry"
import { extractNodes } from "v2/Utils/extractNodes"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { useScrollToElement } from "v2/Utils/Hooks/useScrollTo"
import { ArtworkGridItemFragmentContainer } from "v2/Components/Artwork/GridItem"
import { MetaTags } from "v2/Components/MetaTags"
import { MyCollectionApp_me } from "v2/__generated__/MyCollectionApp_me.graphql"
import { MyCollectionAppQuery } from "v2/__generated__/MyCollectionAppQuery.graphql"

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

const MY_COLLECTION_APP_PLACEHOLDER = (
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
    <SystemQueryRenderer<MyCollectionAppQuery>
      lazyLoad
      placeholder={MY_COLLECTION_APP_PLACEHOLDER}
      query={MY_COLLECTION_APP_QUERY}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return MY_COLLECTION_APP_PLACEHOLDER
        }

        return <MyCollectionAppRefetchContainer me={props.me} />
      }}
    />
  )
}
