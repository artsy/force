import { RouterLink } from "System/Components/RouterLink"
import { Box, Text } from "@artsy/palette"
import type { MyCollectionArtworkTitle_artwork$key } from "__generated__/MyCollectionArtworkTitle_artwork.graphql"
import { graphql, useFragment } from "react-relay"

interface MyCollectionArtworkTitleProps {
  artwork: MyCollectionArtworkTitle_artwork$key
}

export const MyCollectionArtworkTitle: React.FC<
  React.PropsWithChildren<MyCollectionArtworkTitleProps>
> = props => {
  const { artistNames, date, title, artist } = useFragment(
    FRAGMENT,
    props.artwork
  )

  return (
    <Box mb={[4, 2]}>
      <Text as="h1" variant="lg-display">
        {artist?.isPersonalArtist ? (
          artistNames
        ) : (
          <>
            {artist?.href && (
              <RouterLink textDecoration="none" to={artist.href}>
                {artistNames}
              </RouterLink>
            )}
          </>
        )}
      </Text>
      <Text as="h1" variant="lg-display" color="mono60" mb={[0.5, 0]}>
        <i>{title?.trim()}</i>
        {date && date.replace(/\s+/g, "").length > 0 && `, ${date}`}
      </Text>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkTitle_artwork on Artwork {
    artistNames
    title
    date
    artist(shallow: true) {
      href
      isPersonalArtist
    }
  }
`
