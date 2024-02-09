import { Box, Spacer, Text } from "@artsy/palette"
import { ERROR_MESSAGES } from "Components/ErrorPage"
import { ArtworkErrorApp_artworkError$key } from "__generated__/ArtworkErrorApp_artworkError.graphql"
import { graphql, useFragment } from "react-relay"
import { OtherWorksQueryRenderer } from "Apps/Artwork/Components/ArtworkErrorApp/ArtworkErrorAppOtherWorks"
import { RelatedWorksQueryRenderer } from "Apps/Artwork/Components/ArtworkErrorApp/ArtworkErrorAppRelatedWorks"
import { RecentlyViewed } from "Components/RecentlyViewed"
import { useCallback, useEffect } from "react"
import { getENV } from "Utils/getENV"

interface ArtworkErrorAppProps {
  artworkError: ArtworkErrorApp_artworkError$key
}

const HEADLINE_404 = "The artwork you were looking for isn’t available."

export const ArtworkErrorApp: React.FC<ArtworkErrorAppProps> = ({
  artworkError,
}) => {
  const data = useFragment(ArtworkErrorAppFragment, artworkError)

  const { artwork, requestError } = data
  const statusCode = requestError?.statusCode ?? 500
  const headline =
    statusCode === 404
      ? HEADLINE_404
      : ERROR_MESSAGES[statusCode] ?? "Internal Error"

  const artworkSlug = artwork?.slug

  // Artwork paths are excluded from regular pageview tracking via
  // `trackingMiddleware`, since `ArtworkApp` does some custom tracking.
  // However, we still want to track pageviews for error pages.
  // This is mostly cribbed from `ArtworkApp`.
  const trackPageview = useCallback(() => {
    const path = window.location.pathname

    if (typeof window.analytics !== "undefined") {
      const properties: any = {
        path,
        url: getENV("APP_URL") + path,
        error: true,
      }

      window.analytics.page(properties, { integrations: { Marketo: false } })
    }
  }, [])

  useEffect(() => {
    trackPageview()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
