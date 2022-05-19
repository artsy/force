import { Join, Separator, Spacer, Text } from "@artsy/palette"
import { FollowArtistPopover_artist } from "v2/__generated__/FollowArtistPopover_artist.graphql"
import { FollowArtistPopoverQuery } from "v2/__generated__/FollowArtistPopoverQuery.graphql"
import { SystemContext, SystemContextProps } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useContext } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Provider } from "unstated"
import {
  FollowArtistPopoverRowFragmentContainer,
  FollowArtistPopoverRowPlaceholder,
} from "./FollowArtistPopoverRow"
import { FollowArtistPopoverState } from "./state"
import { extractNodes } from "v2/Utils/extractNodes"

interface FollowArtistPopoverProps extends SystemContextProps {
  artist: FollowArtistPopover_artist
}

const FollowArtistPopover: React.FC<FollowArtistPopoverProps> = ({
  artist: { related },
  user,
}) => {
  const suggestedArtists = extractNodes(related?.suggestedConnection)
  const excludeArtistIds = suggestedArtists.map(({ internalID }) => internalID)

  if (suggestedArtists.length === 0) {
    return (
      <Text variant="sm-display" color="black60">
        No suggestions at this time
      </Text>
    )
  }

  return (
    <Provider inject={[new FollowArtistPopoverState({ excludeArtistIds })]}>
      <Spacer mt={1} />

      <Join separator={<Separator my={1} />}>
        {suggestedArtists.map(artist => {
          return (
            <FollowArtistPopoverRowFragmentContainer
              key={artist.id}
              user={user}
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
          suggestedConnection(
            first: 3
            excludeFollowedArtists: true
            includeFallbackArtists: true
          ) {
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
  const { relayEnvironment, user } = useContext(SystemContext)

  return (
    <SystemQueryRenderer<FollowArtistPopoverQuery>
      environment={relayEnvironment}
      variables={{ artistID }}
      placeholder={<FollowArtistPopoverPlaceholder />}
      query={graphql`
        query FollowArtistPopoverQuery($artistID: String!) {
          artist(id: $artistID) {
            ...FollowArtistPopover_artist
          }
        }
      `}
      render={({ props }) => {
        if (props?.artist) {
          return (
            <FollowArtistPopoverFragmentContainer
              artist={props.artist}
              user={user}
            />
          )
        }

        return <FollowArtistPopoverPlaceholder />
      }}
    />
  )
}

export const FollowArtistPopoverPlaceholder: React.FC = () => {
  return (
    <>
      <Spacer mt={1} />

      <Join separator={<Separator my={1} />}>
        <FollowArtistPopoverRowPlaceholder />
        <FollowArtistPopoverRowPlaceholder />
        <FollowArtistPopoverRowPlaceholder />
      </Join>
    </>
  )
}
