import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { BackLink_artist } from "__generated__/BackLink_artist.graphql"
import { TopContextBar } from "Components/TopContextBar"
import { useRouter } from "System/Router/useRouter"

interface BackLinkProps {
  artist: BackLink_artist
  artworkId?: string
}

const BackLink: React.FC<BackLinkProps> = ({ artist, artworkId }) => {
  const { trackEvent } = useTracking()
  const { router } = useRouter()
  const redirectLink = `/my-collection/artwork/${artworkId}`

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
        } else {
          trackEvent({
            action_type: DeprecatedAnalyticsSchema.ActionType.Click,
            destination_path: artist.href,
            subject: "Back to artist link",
          })
        }
      }}
    >
      Back to {artworkId ? "My Collection" : artist.name}
    </TopContextBar>
  )
}

export const BackLinkFragmentContainer = createFragmentContainer(BackLink, {
  artist: graphql`
    fragment BackLink_artist on Artist {
      name
      href
    }
  `,
})
