import { PopularArtists_popular_artists } from "v2/__generated__/PopularArtists_popular_artists.graphql"
import {
  PopularArtistsFollowArtistMutation,
  PopularArtistsFollowArtistMutationResponse,
} from "v2/__generated__/PopularArtistsFollowArtistMutation.graphql"
import { PopularArtistsQuery } from "v2/__generated__/PopularArtistsQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import * as React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { get } from "v2/Utils/get"
import ReplaceTransition from "../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../ItemLink"

type Artist = PopularArtists_popular_artists[number]

interface ContainerProps {
  onArtistFollow
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, ContainerProps {
  relay?: RelayProp
  popular_artists: PopularArtists_popular_artists
}

class PopularArtistsContent extends React.Component<Props, null> {
  private excludedArtistIds: Set<string>

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedArtistIds = new Set(
      this.props.popular_artists.filter(Boolean).map(item => item.internalID)
    )
  }

  onArtistFollowed(
    artist: Artist,
    store: RecordSourceSelectorProxy,
    data: PopularArtistsFollowArtistMutationResponse,
    follow: boolean
  ): void {
    this.props.onArtistFollow(follow, artist)

    const suggestedArtistEdge =
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      data.followArtist.artist.related.suggestedConnection.edges[0]
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const popularArtist = data.followArtist.popular_artists[0]
    const artistToSuggest = store.get(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      ((suggestedArtistEdge && suggestedArtistEdge.node) || popularArtist).id
    )
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    this.excludedArtistIds.add(artistToSuggest.getValue("internalID") as string)

    const popularArtistsRootField = store.get("client:root")
    const popularArtists =
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      popularArtistsRootField.getLinkedRecords("popular_artists", {
        exclude_followed_artists: true,
      }) || []

    const updatedPopularArtists = popularArtists
      .filter(Boolean)
      .map(artistItem =>
        artistItem.getDataID() === artist.id ? artistToSuggest : artistItem
      )

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    store
      .get("client:root")
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      .setLinkedRecords(updatedPopularArtists, "popular_artists")
  }

  onFollowedArtist(artist: Artist, follow: boolean) {
    commitMutation<PopularArtistsFollowArtistMutation>(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.props.relay.environment,
      {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation PopularArtistsFollowArtistMutation(
            $input: FollowArtistInput!
            $excludedArtistIds: [String]!
          ) {
            followArtist(input: $input) {
              popular_artists: popularArtists(
                size: 1
                excludeFollowedArtists: true
                excludeArtistIDs: $excludedArtistIds
              ) {
                slug
                internalID
                id
                name
                image {
                  cropped(width: 100, height: 100) {
                    url
                  }
                }
              }
              artist {
                id
                related {
                  suggestedConnection(
                    first: 1
                    excludeFollowedArtists: true
                    excludeArtistIDs: $excludedArtistIds
                  ) {
                    edges {
                      node {
                        slug
                        internalID
                        id
                        name
                        image {
                          cropped(width: 100, height: 100) {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            artistID: artist.internalID,
            unfollow: !follow,
          },
          excludedArtistIds: Array.from(this.excludedArtistIds),
        },
        updater: (store, data) =>
          this.onArtistFollowed(artist, store, data, follow),
      }
    )
  }

  render() {
    const artistItems = this.props.popular_artists
      .filter(Boolean)
      .map((artist, index) => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const imageUrl = get(artist, a => a.image.cropped.url)
        return (
          <LinkContainer key={`popular-artists-${index}`}>
            <ReplaceTransition
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={400}
            >
              <ItemLink
                href="#"
                item={artist}
                key={artist.id}
                id={artist.id}
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                name={artist.name}
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                image_url={imageUrl}
                onFollow={selected => this.onFollowedArtist(artist, selected)}
              />
            </ReplaceTransition>
          </LinkContainer>
        )
      })

    return <div>{artistItems}</div>
  }
}

export const PopularArtistContentContainer = createFragmentContainer(
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  PopularArtistsContent,
  {
    popular_artists: graphql`
      fragment PopularArtists_popular_artists on Artist @relay(plural: true) {
        slug
        internalID
        id
        name
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
      }
    `,
  }
)

const PopularArtistsComponent: React.SFC<
  ContainerProps & SystemContextProps
> = ({ onArtistFollow, relayEnvironment }) => {
  return (
    <SystemQueryRenderer<PopularArtistsQuery>
      environment={relayEnvironment}
      query={graphql`
        query PopularArtistsQuery {
          highlights {
            popular_artists: popularArtists(excludeFollowedArtists: true) {
              ...PopularArtists_popular_artists
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props) {
          return (
            <PopularArtistContentContainer
              onArtistFollow={onArtistFollow}
              // @ts-ignore FIXME: The types in this component are pretty far gone
              popular_artists={props.highlights?.popular_artists!}
            />
          )
        } else {
          return null
        }
      }}
    />
  )
}

export const PopularArtists = withSystemContext(PopularArtistsComponent)
