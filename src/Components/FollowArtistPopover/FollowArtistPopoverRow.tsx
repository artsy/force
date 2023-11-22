import { FollowArtistPopoverRow_artist$data } from "__generated__/FollowArtistPopoverRow_artist.graphql"
import { FollowArtistPopoverRowMutation } from "__generated__/FollowArtistPopoverRowMutation.graphql"
import { Component } from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
// eslint-disable-next-line no-restricted-imports
import { Subscribe } from "unstated"
import { FollowArtistPopoverState } from "./state"
import { FollowButton } from "Components/FollowButton/Button"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"

interface Props {
  artist: FollowArtistPopoverRow_artist$data
  excludeArtistIdsState?: FollowArtistPopoverState
  relay: RelayProp
  user: User
}

interface State {
  swappedArtist: FollowArtistPopoverRow_artist$data
  followed: boolean
}

class FollowArtistPopoverRow extends Component<Props, State> {
  state: State = {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    swappedArtist: null,
    followed: false,
  }

  handleClick(artistID: string) {
    const { user, relay, excludeArtistIdsState } = this.props
    const {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            node,
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          } = data.followArtist.artist.related.suggestedConnection.edges[0]

          // Add slight delay to make UX seem a bit nicer
          this.setState(
            {
              followed: true,
            },
            () => {
              setTimeout(() => {
                this.setState({
                  swappedArtist: (node as unknown) as FollowArtistPopoverRow_artist$data,
                  followed: false,
                })
              }, 500)
            }
          )

          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          excludeArtistIdsState.addArtist(node.internalID)
        },
      })
    }
  }

  render() {
    const { artist: originalArtist } = this.props
    const { swappedArtist } = this.state
    const artist = swappedArtist || originalArtist

    return (
      <EntityHeaderArtistFragmentContainer
        artist={artist}
        FollowButton={
          <FollowButton
            isFollowed={this.state.followed}
            handleFollow={() => this.handleClick(artist.internalID)}
            size="small"
          />
        }
      />
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
        ...EntityHeaderArtist_artist
        internalID
      }
    `,
  }
)

export const FollowArtistPopoverRowPlaceholder: React.FC = () => {
  return <EntityHeaderPlaceholder />
}
