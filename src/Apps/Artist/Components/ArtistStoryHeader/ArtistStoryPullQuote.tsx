import { Box, Text } from "@artsy/palette"
import type { ArtistStoryPullQuote_artist$key } from "__generated__/ArtistStoryPullQuote_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryPullQuoteProps {
  artist: ArtistStoryPullQuote_artist$key
}

export const useHasArtistStoryPullQuote = (
  artist: ArtistStoryPullQuote_artist$key,
) => {
  const data = useFragment(FRAGMENT, artist)

  return !!data.featuredStory?.pullQuote?.text.trim()
}

export const ArtistStoryPullQuote: React.FC<ArtistStoryPullQuoteProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const text = artist.featuredStory?.pullQuote?.text.trim()
  const attribution = artist.featuredStory?.pullQuote?.attribution?.trim()

  if (!text) {
    return null
  }

  return (
    <Box>
      <Text as="blockquote" variant={["xl", "xxl"]} m={0}>
        {`“${text}”`}
      </Text>

      {attribution && (
        <Text variant={["xs", "sm"]} color="mono60" mt={1}>
          {attribution}
        </Text>
      )}
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryPullQuote_artist on Artist {
    featuredStory {
      pullQuote {
        text
        attribution
      }
    }
  }
`
