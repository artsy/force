import { Avatar, Box, Button, Flex, Serif } from "@artsy/palette"
import { FollowArtistPopoverRow_artist } from "v2/__generated__/FollowArtistPopoverRow_artist.graphql"
import { FollowArtistPopoverRowMutation } from "v2/__generated__/FollowArtistPopoverRowMutation.graphql"
import { SystemContextProps } from "v2/Artsy"
import React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"
import { Subscribe } from "unstated"
import { get } from "v2/Utils/get"
import { FollowArtistPopoverState } from "./state"

interface Props extends SystemContextProps {
  artist: FollowArtistPopoverRow_artist
  excludeArtistIdsState?: FollowArtistPopoverState
  relay: RelayProp
}

interface State {
  swappedArtist: FollowArtistPopoverRow_artist
  followed: boolean
}

const ArtistName = styled(Serif)`
  width: 125px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

class FollowArtistPopoverRow extends React.Component<Props, State> {
  state: State = {
    swappedArtist: null,
    followed: false,
  }

  handleClick(artistID: string) {
    const { user, relay, excludeArtistIdsState } = this.props
    const {
      state: { excludeArtistIds },
    } = excludeArtistIdsState
    if (user && user.id) {
      commitMutation<FollowArtistPopoverRowMutation>(relay.environment, {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation FollowArtistPopoverRowMutation(
            $input: FollowArtistInput!
            $excludeArtistIds: [String]!
          ) {
            followArtist(input: $input) {
              artist {
                id
                related {
                  suggestedConnection(
                    first: 1
                    excludeFollowedArtists: true
                    excludeArtistIDs: $excludeArtistIds
                  ) {
                    edges {
                      node {
                        id
                        internalID
                        ...FollowArtistPopoverRow_artist @relay(mask: false)
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: { artistID, unfollow: false },
          excludeArtistIds,
        },
        optimisticUpdater: () => {
          this.setState({
            followed: true,
          })
        },
        updater: (_store, data) => {
          const {
            node,
          } = data.followArtist.artist.related.suggestedConnection.edges[0]

          // Add slight delay to make UX seem a bit nicer
          this.setState(
            {
              followed: true,
            },
            () => {
              setTimeout(() => {
                this.setState({
                  swappedArtist: (node as unknown) as FollowArtistPopoverRow_artist,
                  followed: false,
                })
              }, 500)
            }
          )

          excludeArtistIdsState.addArtist(node.internalID)
        },
      })
    }
  }

  render() {
    const { artist: originalArtist } = this.props
    const { swappedArtist } = this.state
    const artist = swappedArtist || originalArtist
    const imageUrl = get(artist, a => a.image.cropped.url)
    const { internalID: artistID } = artist
    const key = `avatar-${artistID}`
    return (
      <Flex alignItems="center" mb={1} mt={1}>
        <Avatar size="xs" src={imageUrl} key={key} />
        <ArtistName size="3t" color="black100" ml={1} mr={1}>
          {artist.name}
        </ArtistName>
        <Box>
          <Button
            onClick={() => this.handleClick(artistID)}
            variant="secondaryOutline"
            size="small"
            width="70px"
          >
            {this.state.followed ? "Followed" : "Follow"}
          </Button>
        </Box>
      </Flex>
    )
  }
}

export const FollowArtistPopoverRowFragmentContainer = createFragmentContainer(
  (props: Props) => {
    return (
      <Subscribe to={[FollowArtistPopoverState]}>
        {(excludeArtistIdsState: FollowArtistPopoverState) => {
          return (
            <FollowArtistPopoverRow
              excludeArtistIdsState={excludeArtistIdsState}
              {...props}
            />
          )
        }}
      </Subscribe>
    )
  },
  {
    artist: graphql`
      fragment FollowArtistPopoverRow_artist on Artist {
        internalID
        name
        image {
          cropped(width: 45, height: 45) {
            url
          }
        }
      }
    `,
  }
)
