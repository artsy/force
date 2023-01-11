import { Skeleton, SkeletonText, Spacer, Sup, Text } from "@artsy/palette"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid"
import { Masonry } from "Components/Masonry"
import { PaginationFragmentContainer } from "Components/Pagination"
import { FC, Fragment, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { CollectorProfileSavesRouteQuery } from "__generated__/CollectorProfileSavesRouteQuery.graphql"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"

interface CollectorProfileSavesProps {
  me: CollectorProfileSavesRoute_me$data
  relay: RelayRefetchProp
}

const SavesRoute: FC<CollectorProfileSavesProps> = ({ me, relay }) => {
  const [loading, setLoading] = useState(false)

  const { jumpTo } = useJump({ offset: 20 })

  const connection = me.saves?.artworksConnection

  if (!connection) {
    return null
  }

  const artworks = extractNodes(connection)
  const total = connection.totalCount ?? 0
  const hasNextPage = connection.pageInfo.hasNextPage ?? false
  const endCursor = connection.pageInfo.endCursor
  const pageCursors = connection.pageCursors!

  const handleClick = (cursor: string, page: number) => {
    jumpTo("CollectorProfileSaves")

    setLoading(true)

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
      <Text variant={["md", "lg"]} mb={4}>
        Saved Artworks {total > 0 && <Sup color="brand">{total}</Sup>}
      </Text>

      {artworks.length > 0 ? (
        <Jump id="CollectorProfileSaves">
          <Masonry
            columnCount={[2, 3, 4]}
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            {artworks.map(artwork => {
              return (
                <Fragment key={artwork.internalID}>
                  <ArtworkGridItemFragmentContainer artwork={artwork} />

                  <Spacer y={4} />
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
        </Jump>
      ) : (
        <Text variant={["md", "lg"]} color="black60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const COLLECTOR_PROFILE_SAVES_QUERY = graphql`
  query CollectorProfileSavesRouteQuery($page: Int) {
    me {
      ...CollectorProfileSavesRoute_me @arguments(page: $page)
    }
  }
`

export const CollectorProfileSavesRefetchContainer = createRefetchContainer(
  SavesRoute,
  {
    me: graphql`
      fragment CollectorProfileSavesRoute_me on Me
        @argumentDefinitions(page: { type: "Int", defaultValue: 1 }) {
        saves: followsAndSaves {
          artworksConnection(first: 10, private: true, page: $page)
            @connection(key: "CollectorProfileSaves_artworksConnection") {
            totalCount
            pageInfo {
              hasNextPage
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
      }
    `,
  },
  COLLECTOR_PROFILE_SAVES_QUERY
)

const COLLECTOR_PROFILE_SAVES_PLACEHOLDER = (
  <Skeleton>
    <SkeletonText variant={["md", "lg"]} mb={4}>
      Saved Artworks
    </SkeletonText>

    <ArtworkGridPlaceholder columnCount={[2, 3, 4]} amount={10} />
  </Skeleton>
)

export const CollectorProfileSavesRouteQueryRenderer = () => {
  return (
    <SystemQueryRenderer<CollectorProfileSavesRouteQuery>
      lazyLoad
      placeholder={COLLECTOR_PROFILE_SAVES_PLACEHOLDER}
      query={COLLECTOR_PROFILE_SAVES_QUERY}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return COLLECTOR_PROFILE_SAVES_PLACEHOLDER
        }

        return <CollectorProfileSavesRefetchContainer me={props.me} />
      }}
    />
  )
}
