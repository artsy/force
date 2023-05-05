import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtistBackLink_artist$data } from "__generated__/ArtistBackLink_artist.graphql"
import { TopContextBar } from "Components/TopContextBar"
import { useRouter } from "System/Router/useRouter"

interface ArtistBackLinkProps {
  artist: ArtistBackLink_artist$data
}

const ArtistBackLink: React.FC<ArtistBackLinkProps> = ({ artist }) => {
  const { trackEvent } = useTracking()
  const { router, match } = useRouter()

  const artworkId = match.params.artworkId
  const redirectLink = `/collector-profile/my-collection/artwork/${artworkId}`

  return (
    <TopContextBar
      href={artworkId ? undefined : artist.href}
      redirectTo={artworkId ? redirectLink : undefined}
      displayBackArrow
      onClick={() => {
        if (artworkId) {
          router.replace({
            pathname: redirectLink,
          })
          return
        }

        trackEvent({
          action_type: DeprecatedAnalyticsSchema.ActionType.Click,
          destination_path: artist.href,
          subject: "Back to artist link",
        })
      }}
    >
      Back to {artworkId ? "My Collection" : artist.name}
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
