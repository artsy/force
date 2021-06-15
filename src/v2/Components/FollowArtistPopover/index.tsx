import { Join, Separator, Spacer } from "@artsy/palette"
import { FollowArtistPopover_artist } from "v2/__generated__/FollowArtistPopover_artist.graphql"
import { FollowArtistPopoverQuery } from "v2/__generated__/FollowArtistPopoverQuery.graphql"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Provider } from "unstated"
import { FollowArtistPopoverRowFragmentContainer } from "./FollowArtistPopoverRow"
import { FollowArtistPopoverState } from "./state"
import { extractNodes } from "v2/Utils/extractNodes"

interface Props {
  artist: FollowArtistPopover_artist
  user: User | null
}

const FollowArtistPopover: React.FC<Props> = props => {
  const {
    artist: { related },
    user,
  } = props

  const suggestedArtists = extractNodes(related?.suggestedConnection)

  const suggetionsCount = suggestedArtists.length
  if (suggetionsCount === 0) return null

  const excludeArtistIds = suggestedArtists.map(({ internalID }) => internalID)

  return (
    <Provider inject={[new FollowArtistPopoverState({ excludeArtistIds })]}>
      <Spacer mt={1} />

      <Join separator={<Separator my={1} />}>
        {suggestedArtists.map(artist => {
          return (
            // @ts-ignore
            <FollowArtistPopoverRowFragmentContainer
              key={artist.id}
              user={user!}
              artist={artist}
            />
          )
        })}
      </Join>
    </Provider>
  )
}

export const FollowArtistPopoverFragmentContainer = createFragmentContainer(
  FollowArtistPopover,
  {
    artist: graphql`
      fragment FollowArtistPopover_artist on Artist {
        related {
          suggestedConnection(first: 3, excludeFollowedArtists: true) {
            edges {
              node {
                id
                internalID
                ...FollowArtistPopoverRow_artist
              }
            }
          }
        }
      }
    `,
  }
)

export const FollowArtistPopoverQueryRenderer = ({
  artistID,
}: {
  artistID: string
}) => {
  const { relayEnvironment, user } = useSystemContext()
  return (
    <QueryRenderer<FollowArtistPopoverQuery>
      environment={relayEnvironment}
      variables={{ artistID }}
      query={graphql`
        query FollowArtistPopoverQuery($artistID: String!) {
          artist(id: $artistID) {
            ...FollowArtistPopover_artist
          }
        }
      `}
      render={({ props }) => {
        return (
          props && (
            <FollowArtistPopoverFragmentContainer
              artist={props.artist}
              user={user}
            />
          )
        )
      }}
    />
  )
}
