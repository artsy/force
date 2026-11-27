import { Box, Image, THEME, Text } from "@artsy/palette"
import { isValidImage } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderImage"
import type {
  ArtistStoryHeaderImage_artist$data,
  ArtistStoryHeaderImage_artist$key,
} from "__generated__/ArtistStoryHeaderImage_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryHeaderImageProps {
  artist: ArtistStoryHeaderImage_artist$key
}

export const useHasArtistStoryHeaderImage = (
  artistRef: ArtistStoryHeaderImage_artist$key,
) => {
  const artist = useFragment(FRAGMENT, artistRef)

  return !!getHeaderImageSource(artist)
}

/** Fills its positioned parent. */
export const ArtistStoryHeaderImage: React.FC<ArtistStoryHeaderImageProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const source = getHeaderImageSource(artist)

  if (!source) {
    return null
  }

  return (
    <>
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        <Image
          src={source.src}
          srcSet={source.srcSet}
          alt={source.alt}
          width="100%"
          height="100%"
          fetchPriority="high"
          style={{ objectFit: "cover" }}
        />
      </Box>

      {source.credit && (
        <Box position="absolute" top={0} left={0} p={2}>
          <Text
            variant="xs"
            color="mono15"
            style={{ textShadow: THEME.effects.textShadow }}
          >
            {source.credit}
          </Text>
        </Box>
      )}
    </>
  )
}

const getHeaderImageSource = (artist: ArtistStoryHeaderImage_artist$data) => {
  const headerImage = artist.featuredStory?.headerImage
  const resized = headerImage?.image?.resized

  if (headerImage && resized) {
    return {
      src: resized.src,
      srcSet: resized.srcSet,
      alt: headerImage.altText,
      credit: headerImage.credit,
    }
  }

  const { coverArtwork } = artist

  if (coverArtwork && isValidImage(coverArtwork.image)) {
    return {
      src: coverArtwork.image.src,
      alt: coverArtwork.imageTitle || `Artwork by ${artist.name}`,
    }
  }

  return null
}

const FRAGMENT = graphql`
  fragment ArtistStoryHeaderImage_artist on Artist {
    name
    featuredStory {
      headerImage {
        altText
        credit
        image {
          resized(
            width: 1600
            version: ["main", "normalized", "larger", "large"]
          ) {
            src
            srcSet
          }
        }
      }
    }
    coverArtwork {
      imageTitle
      image {
        src: url(version: ["larger", "larger"])
        width
        height
      }
    }
  }
`
