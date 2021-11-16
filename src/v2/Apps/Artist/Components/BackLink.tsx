import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AnalyticsSchema } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ChevronButton } from "v2/Components/ChevronButton"
import { BackLink_artist } from "v2/__generated__/BackLink_artist.graphql"

interface BackLinkProps {
  artist: BackLink_artist
}

const BackLink: React.FC<BackLinkProps> = ({ artist }) => {
  const { trackEvent } = useTracking()

  return (
    <RouterLink
      to={`/artist/${artist.slug}`}
      noUnderline
      onClick={() =>
        trackEvent({
          action_type: AnalyticsSchema.ActionType.Click,
          destination_path: `/artist/${artist.slug}`,
          subject: "Back to artist link",
        })
      }
    >
      <ChevronButton direction="left">Back to {artist.name}</ChevronButton>
    </RouterLink>
  )
}

export const BackLinkFragmentContainer = createFragmentContainer(BackLink, {
  artist: graphql`
    fragment BackLink_artist on Artist {
      name
      slug
    }
  `,
})
