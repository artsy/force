import { Skeleton } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { AISearchArtworksRailQuery } from "__generated__/AISearchArtworksRailQuery.graphql"
import { type FC, useEffect } from "react"
import { graphql } from "react-relay"

const PLACEHOLDER_COUNT = 8

interface AISearchArtworksRailProps {
  /** Gravity internalIDs, in the order the agent ranked them */
  artworkIDs: string[]
  title: string
  subTitle?: string
}

export const AISearchArtworksRail: FC<AISearchArtworksRailProps> = ({
  artworkIDs,
  title,
  subTitle,
}) => {
  const placeholder = <AISearchArtworksRailPlaceholder title={title} />

  useEffect(() => {
    console.log("[Debug] artworks rail: requesting artworksConnection", {
      artworkIDs,
      first: artworkIDs.length,
    })
  }, [artworkIDs])

  return (
    <SystemQueryRenderer<AISearchArtworksRailQuery>
      placeholder={placeholder}
      query={graphql`
        query AISearchArtworksRailQuery($artworkIDs: [String], $first: Int!) {
          artworksConnection(artworkIDs: $artworkIDs, first: $first) {
            edges {
              node {
                internalID
                ...ShelfArtwork_artwork
              }
            }
          }
        }
      `}
      variables={{ artworkIDs, first: artworkIDs.length }}
      render={({ props, error }) => {
        if (error) {
          console.log("[Debug] artworks rail: query errored", error)
          console.error(error)
          return null
        }

        if (!props) {
          return placeholder
        }

        // artworksConnection is Elasticsearch-ordered, so restore the agent's
        // own ranking rather than showing an arbitrary order.
        const artworks = extractNodes(props.artworksConnection)
          .slice()
          .sort((a, b) => {
            return (
              artworkIDs.indexOf(a.internalID) -
              artworkIDs.indexOf(b.internalID)
            )
          })

        // artworksConnection is Elasticsearch-backed, so an internalID that
        // resolves fine through artworksLoader can still miss the index.
        console.log("[Debug] artworks rail: response", {
          requested: artworkIDs.length,
          returned: artworks.length,
          returnedIDs: artworks.map(artwork => {
            return artwork.internalID
          }),
        })

        if (artworks.length === 0) {
          return null
        }

        return (
          <Rail
            title={title}
            subTitle={subTitle}
            getItems={() => {
              return artworks.map(artwork => {
                return (
                  <ShelfArtworkFragmentContainer
                    key={artwork.internalID}
                    artwork={artwork}
                    lazyLoad
                  />
                )
              })
            }}
          />
        )
      }}
    />
  )
}

const AISearchArtworksRailPlaceholder: FC<{ title: string }> = ({ title }) => {
  return (
    <Skeleton>
      <Rail
        title={title}
        getItems={() => {
          return [...new Array(PLACEHOLDER_COUNT)].map((_, i) => {
            return <ShelfArtworkPlaceholder key={i} index={i} />
          })
        }}
      />
    </Skeleton>
  )
}
