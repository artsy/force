import React from "react"
import { Box, CSSGrid, Link, Sans, SmallCard } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomsLatestGrid_viewingRooms } from "v2/__generated__/ViewingRoomsLatestGrid_viewingRooms.graphql"

export interface ViewingRoomsLatestGridProps {
  viewingRooms: ViewingRoomsLatestGrid_viewingRooms
}

export const ViewingRoomsLatestGrid: React.FC<ViewingRoomsLatestGridProps> = props => {
  const viewingRooms = props.viewingRooms

  if (!viewingRooms?.edges?.length) {
    return null
  }

  const viewingRoomsForLatestGrid = viewingRooms.edges
    .map(vr => {
      if (!vr.node) {
        return null
      }

      if (vr.node.status != "scheduled" && vr.node.status != "live") {
        return null
      }

      return {
        ...vr.node,
      }
    })
    .filter(Boolean)
  const count = viewingRoomsForLatestGrid.length

  return (
    <Box>
      <Sans size="5">Latest</Sans>
      <Box>
        <CSSGrid
          mt={2}
          mb={6}
          gridTemplateColumns={[
            "repeat(1fr)",
            `repeat(${Math.min(count, 2)}, 1fr)`,
            `repeat(${Math.min(count, 3)}, 1fr)`,
          ]}
          gridColumnGap={2}
          gridRowGap={6}
        >
          {viewingRoomsForLatestGrid.map(vr => {
            const {
              slug,
              title,
              heroImageURL,
              partner,
              artworksConnection,
            } = vr
            const artworksCount = artworksConnection.totalCount
            const artworkImages = artworksConnection.edges.map(({ node }) =>
              artworksCount < 2 ? node.image.regular : node.image.square
            )
            return (
              <Link href={`/viewing-room/${slug}`} key={slug} noUnderline>
                <SmallCard
                  title={title}
                  subtitle={partner.name}
                  images={[heroImageURL].concat(artworkImages)}
                />
              </Link>
            )
          })}
        </CSSGrid>
      </Box>
    </Box>
  )
}

export const ViewingRoomsLatestGridFragmentContainer = createFragmentContainer(
  ViewingRoomsLatestGrid,
  {
    viewingRooms: graphql`
      fragment ViewingRoomsLatestGrid_viewingRooms on ViewingRoomConnection {
        edges {
          node {
            slug
            status
            title
            heroImageURL
            partner {
              name
            }
            artworksConnection(first: 2) {
              totalCount
              edges {
                node {
                  image {
                    square: url(version: "square")
                    regular: url(version: "large")
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
