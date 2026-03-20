import { FullBleed, Stack, Swiper } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistNotableWorks_artist$key } from "__generated__/ArtistNotableWorks_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { ArtistNotableWorksArtworks } from "./ArtistNotableWorksArtworks"

interface ArtistNotableWorksProps {
  artist: ArtistNotableWorks_artist$key
}

export const ArtistNotableWorks: React.FC<ArtistNotableWorksProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  if (extractNodes(artist.artworksConnection).length === 0) return null

  return (
    <>
      <Media greaterThan="xs">
        <Stack
          gap={[1, 1, 2]}
          flexDirection="row"
          alignItems="stretch"
          flex={1}
          width="100%"
        >
          <ArtistNotableWorksArtworks artist={artist} />
        </Stack>
      </Media>

      <Media at="xs">
        <FullBleed>
          <Swiper>
            <Stack
              gap={[1, 1, 2]}
              flexDirection="row"
              alignItems="stretch"
              px={2}
            >
              <ArtistNotableWorksArtworks artist={artist} />
            </Stack>
          </Swiper>
        </FullBleed>
      </Media>
    </>
  )
}

const fragment = graphql`
  fragment ArtistNotableWorks_artist on Artist {
    ...ArtistNotableWorksArtworks_artist
    artworksConnection(first: 3, sort: ICONICITY_DESC) {
      edges {
        node {
          internalID
        }
      }
    }
  }
`
