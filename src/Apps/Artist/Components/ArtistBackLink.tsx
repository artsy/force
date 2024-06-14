import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtistBackLink_artist$data } from "__generated__/ArtistBackLink_artist.graphql"
import { TopContextBar } from "Components/TopContextBar"
import { useRouter } from "System/Hooks/useRouter"
import { sanitizeURL } from "Utils/sanitizeURL"

interface ArtistBackLinkProps {
  artist: ArtistBackLink_artist$data
}

const ArtistBackLink: React.FC<ArtistBackLinkProps> = ({ artist }) => {
  const { trackEvent } = useTracking()

  const router = useRouter()

  const returnTo = router.match?.location?.query?.returnTo

  const href = returnTo ? sanitizeURL(returnTo) : artist.href

  return (
    <TopContextBar
      href={href}
      displayBackArrow
      onClick={() => {
        trackEvent({
          action_type: DeprecatedAnalyticsSchema.ActionType.Click,
          destination_path: href,
          subject: "Back to artist link",
        })
      }}
    >
      Back to {artist.name}
    </TopContextBar>
  )
}

export const ArtistBackLinkFragmentContainer = createFragmentContainer(
  ArtistBackLink,
  {
    artist: graphql`
      fragment ArtistBackLink_artist on Artist {
        name
        href
      }
    `,
  }
)
