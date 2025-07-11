import {
  Box,
  Flex,
  Shelf,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistRail_artist$data } from "__generated__/ArtistRail_artist.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "./Artwork/ShelfArtwork"
import { EntityHeaderArtistFragmentContainer } from "./EntityHeaders/EntityHeaderArtist"

interface ArtistRailProps {
  artist: ArtistRail_artist$data
}

const ArtistRail: FC<React.PropsWithChildren<ArtistRailProps>> = ({
  artist,
}) => {
  if (!artist || !artist.name) return null

  const artworks = extractNodes(artist.filterArtworksConnection)

  return (
    <>
      <EntityHeaderArtistFragmentContainer artist={artist} mb={2} />
      {artworks.length > 0 ? (
        <Shelf>
          {artworks.map(artwork => {
            return (
              <ShelfArtworkFragmentContainer
                key={artwork.internalID}
                contextModule={{} as any} // TODO:
                artwork={artwork}
                lazyLoad
              />
            )
          })}
        </Shelf>
      ) : (
        <Text variant="lg-display" color="mono60" textAlign="center">
          No works available by the artist at this time.
        </Text>
      )}
    </>
  )
}

export const ARTIST_RAIL_PLACEHOLDER = (
  <Skeleton>
    <Flex alignItems="center" mb={2}>
      <SkeletonBox width={45} height={45} borderRadius="50%" mr={1} />

      <Box>
        <SkeletonText variant="sm-display">Artist Name</SkeletonText>
        <SkeletonText variant="xs">Country, b. 0000</SkeletonText>
      </Box>
    </Flex>

    <Shelf>
      {[...new Array(10)].map((_, i) => {
        return <ShelfArtworkPlaceholder key={i} index={i} />
      })}
    </Shelf>
  </Skeleton>
)

export const ArtistRailFragmentContainer = createFragmentContainer(ArtistRail, {
  artist: graphql`
    fragment ArtistRail_artist on Artist {
      ...EntityHeaderArtist_artist
      name
      filterArtworksConnection(first: 10, sort: "-decayed_merch") {
        edges {
          node {
            internalID
            ...ShelfArtwork_artwork
          }
        }
      }
    }
  `,
})
