import { Button } from "@artsy/palette"
import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CascadingEndTimesBannerFragmentContainer } from "v2/Components/CascadingEndTimesBanner"
import { FullBleedBanner } from "v2/Components/FullBleedBanner"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"
import { ArtworkBanner_artwork } from "v2/__generated__/ArtworkBanner_artwork.graphql"

interface ArtworkBannerProps {
  artwork: ArtworkBanner_artwork
}

/**
 * ArtworkBanner displays exactly one banner.
 * The return banner takes precedence over the cascading endtimes banner.
 */
const ArtworkBanner: FC<ArtworkBannerProps> = ({ artwork }) => {
  const { match } = useRouter()

  const { returnToHref, returnToTitle, returnToLabel } = useMemo(
    () => match.location.query,
    // Ignore updates to the query string; when the link is clicked, the URL will change
    // which will cause the banner to disappear.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  if (returnToHref && returnToTitle && returnToLabel) {
    return (
      <FullBleedBanner variant="brand" dismissable>
        Return to browsing works from {returnToTitle}
        <Button
          ml={1}
          variant="primaryWhite"
          size="small"
          // @ts-ignore
          as={RouterLink}
          to={returnToHref}
        >
          {returnToLabel}
        </Button>
      </FullBleedBanner>
    )
  }

  if (artwork.sale) {
    return <CascadingEndTimesBannerFragmentContainer sale={artwork.sale} />
  }

  return null
}

export const ArtworkBannerFragmentContainer = createFragmentContainer(
  ArtworkBanner,
  {
    artwork: graphql`
      fragment ArtworkBanner_artwork on Artwork {
        internalID
        sale {
          ...CascadingEndTimesBanner_sale
        }
      }
    `,
  }
)
