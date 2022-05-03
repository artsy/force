import { FC, Fragment, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SettingsSavesArtworks_me } from "v2/__generated__/SettingsSavesArtworks_me.graphql"
import { SettingsSavesArtworksQuery } from "v2/__generated__/SettingsSavesArtworksQuery.graphql"
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
import { ArtworkGridItemFragmentContainer } from "v2/Components/Artwork/GridItem"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { useScrollToElement } from "v2/Utils/Hooks/useScrollTo"

interface SettingsSavesArtworksProps {
  me: SettingsSavesArtworks_me
  relay: RelayRefetchProp
}

const SettingsSavesArtworks: FC<SettingsSavesArtworksProps> = ({
  me,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const { scrollTo } = useScrollToElement({
    selectorOrRef: "#jump--SettingsSavedArtworks",
    behavior: "smooth",
    offset: 20,
  })

  const connection = me.followsAndSaves?.artworksConnection

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
      <Text variant="lg" mb={4}>
        Saved Artworks {total > 0 && <Sup color="brand">{total}</Sup>}
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
                  <ArtworkGridItemFragmentContainer artwork={artwork} />

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
        <Text variant="lg" color="black60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const SETTINGS_SAVES_ARTWORKS_QUERY = graphql`
  query SettingsSavesArtworksQuery($page: Int) {
    me {
      ...SettingsSavesArtworks_me @arguments(page: $page)
    }
  }
`

export const SettingsSavesArtworksRefetchContainer = createRefetchContainer(
  SettingsSavesArtworks,
  {
    me: graphql`
      fragment SettingsSavesArtworks_me on Me
        @argumentDefinitions(page: { type: "Int" }) {
        followsAndSaves {
          artworksConnection(first: 10, private: true, page: $page)
            @connection(key: "SettingsSavesArtworks_artworksConnection") {
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
  SETTINGS_SAVES_ARTWORKS_QUERY
)

const SETTINGS_SAVES_ARTWORKS_PLACEHOLDER = (
  <Skeleton>
    <SkeletonText variant="lg" mb={4}>
      Saved Artworks
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

            <SkeletonText variant="md" mt={1}>
              Artist Name
            </SkeletonText>
            <SkeletonText variant="md">Artwork Title</SkeletonText>
            <SkeletonText variant="xs">Partner Name</SkeletonText>
            <SkeletonText variant="xs">US$0,000</SkeletonText>

            <Spacer mt={4} />
          </div>
        )
      })}
    </Masonry>
  </Skeleton>
)

export const SettingsSavesArtworksQueryRenderer = () => {
  return (
    <SystemQueryRenderer<SettingsSavesArtworksQuery>
      lazyLoad
      placeholder={SETTINGS_SAVES_ARTWORKS_PLACEHOLDER}
      query={SETTINGS_SAVES_ARTWORKS_QUERY}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return SETTINGS_SAVES_ARTWORKS_PLACEHOLDER
        }

        return <SettingsSavesArtworksRefetchContainer me={props.me} />
      }}
    />
  )
}
