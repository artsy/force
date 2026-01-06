import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { TopContextBar } from "Components/TopContextBar"
import { useNavigationHistory } from "System/Contexts/NavigationHistoryContext"
import type { ArtistBackLink_artist$data } from "__generated__/ArtistBackLink_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistBackLinkProps {
  artist: ArtistBackLink_artist$data
}

const ArtistBackLink: React.FC<
  React.PropsWithChildren<ArtistBackLinkProps>
> = ({ artist }) => {
  const { trackEvent } = useTracking()
  const { previousPath } = useNavigationHistory()

  const href = previousPath ?? artist.href

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
  },
)
