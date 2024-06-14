import {
  Box,
  Join,
  Separator,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { FollowArtistPopover_artist$data } from "__generated__/FollowArtistPopover_artist.graphql"
import { FollowArtistPopoverQuery } from "__generated__/FollowArtistPopoverQuery.graphql"
import { SystemContext } from "System/Contexts/SystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useContext } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
// FIXME: Remove usage of unstated
// eslint-disable-next-line no-restricted-imports
import { Provider } from "unstated"
import {
  FollowArtistPopoverRowFragmentContainer,
  FollowArtistPopoverRowPlaceholder,
} from "./FollowArtistPopoverRow"
import { FollowArtistPopoverState } from "./state"
import { extractNodes } from "Utils/extractNodes"

interface FollowArtistPopoverProps {
  artist: FollowArtistPopover_artist$data
  user: User
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
      <Text variant="lg-display">Other artists you might like</Text>

      <Spacer y={2} />

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
    <Box width={350}>
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
    </Box>
  )
}

export const FollowArtistPopoverPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg-display">
        Other artists you might like
      </SkeletonText>

      <Spacer y={2} />

      <Join separator={<Separator my={1} />}>
        <FollowArtistPopoverRowPlaceholder />
        <FollowArtistPopoverRowPlaceholder />
        <FollowArtistPopoverRowPlaceholder />
      </Join>
    </Skeleton>
  )
}
