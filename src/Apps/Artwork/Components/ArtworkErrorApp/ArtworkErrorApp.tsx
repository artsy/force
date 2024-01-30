import { Box, Spacer, Text } from "@artsy/palette"
import { ERROR_MESSAGES } from "Components/ErrorPage"
import { ArtworkErrorApp_artworkError$key } from "__generated__/ArtworkErrorApp_artworkError.graphql"
import { graphql, useFragment } from "react-relay"
import { OtherWorksQueryRenderer } from "Apps/Artwork/Components/ArtworkErrorApp/ArtworkErrorAppOtherWorks"
import { RelatedWorksQueryRenderer } from "Apps/Artwork/Components/ArtworkErrorApp/ArtworkErrorAppRelatedWorks"
import { RecentlyViewed } from "Components/RecentlyViewed"

interface ArtworkErrorAppProps {
  artworkError: ArtworkErrorApp_artworkError$key
}

export const ArtworkErrorApp: React.FC<ArtworkErrorAppProps> = ({
  artworkError,
}) => {
  const data = useFragment(ArtworkErrorAppFragment, artworkError)

  const { artwork, requestError } = data
  const statusCode = requestError?.statusCode ?? 500
  const headline = ERROR_MESSAGES[statusCode] ?? "Internal Error"

  const artworkSlug = artwork?.slug

  return (
    <Box>
      <Spacer y={6} />

      <Text variant="xl">{headline}</Text>

      <Spacer y={6} />

      {artworkSlug && (
        <>
          <OtherWorksQueryRenderer slug={artworkSlug} />
          <Spacer y={6} />
          <RelatedWorksQueryRenderer slug={artworkSlug} />
        </>
      )}

      <Spacer y={6} />

      <RecentlyViewed />
    </Box>
  )
}

const ArtworkErrorAppFragment = graphql`
  fragment ArtworkErrorApp_artworkError on ArtworkError {
    artwork {
      slug
    }

    requestError {
      statusCode
    }
  }
`
