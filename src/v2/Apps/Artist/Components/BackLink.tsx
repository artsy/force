import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AnalyticsSchema } from "v2/System"
import { BackLink_artist } from "v2/__generated__/BackLink_artist.graphql"
import { TopContextBar } from "v2/Components/TopContextBar"

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
          action_type: AnalyticsSchema.ActionType.Click,
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
