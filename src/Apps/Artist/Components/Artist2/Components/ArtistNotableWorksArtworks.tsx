import { Box, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistNotableWorksArtworks_artist$key } from "__generated__/ArtistNotableWorksArtworks_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistNotableWorksArtworksProps {
  artist: ArtistNotableWorksArtworks_artist$key
}

export const ArtistNotableWorksArtworks: React.FC<
  ArtistNotableWorksArtworksProps
> = ({ artist: artistRef }) => {
  const artist = useFragment(fragment, artistRef)

  const artworks = extractNodes(artist.artworksConnection)

  return (
    <>
      {artworks.map(artwork => {
        const image = artwork.image?.resized

        if (!image) return null

        return (
          <Box
            key={artwork.internalID}
            flex={1}
            display="flex"
            flexDirection="column"
            gap={1}
            maxWidth={[200, "initial"]}
            minWidth={[200, 0]}
          >
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ResponsiveBox
                // @ts-ignore
                as={RouterLink}
                to={artwork.href}
                key={artwork.internalID}
                display="block"
                textDecoration="none"
                aspectWidth={image.width ?? 1}
                aspectHeight={image.height ?? 1}
                maxWidth="100%"
              >
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width="100%"
                  height="100%"
                  lazyLoad
                  alt=""
                />
              </ResponsiveBox>
            </Box>

            <Text variant="xs" color="mono60" overflowEllipsis>
              <em>{artwork.title}</em>
              {artwork.date && `, ${artwork.date}`}
            </Text>
          </Box>
        )
      })}
    </>
  )
}

const fragment = graphql`
  fragment ArtistNotableWorksArtworks_artist on Artist {
    artworksConnection(first: 3, sort: ICONICITY_DESC) {
      edges {
        node {
          internalID
          href
          title
          date
          image {
            resized(width: 420, height: 420) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
