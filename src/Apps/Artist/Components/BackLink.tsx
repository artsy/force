import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { BackLink_artist } from "__generated__/BackLink_artist.graphql"
import { TopContextBar } from "Components/TopContextBar"

interface BackLinkProps {
  artist: BackLink_artist
}

const BackLink: React.FC<BackLinkProps> = ({ artist }) => {
  const { trackEvent } = useTracking()

  return (
    <TopContextBar
      href={artist.href}
      displayBackArrow
      onClick={() =>
        trackEvent({
          action_type: DeprecatedAnalyticsSchema.ActionType.Click,
          destination_path: artist.href,
          subject: "Back to artist link",
        })
      }
    >
      Back to {artist.name}
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
