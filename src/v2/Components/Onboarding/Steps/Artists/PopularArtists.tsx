import { PopularArtists_popular_artists } from "v2/__generated__/PopularArtists_popular_artists.graphql"
import {
  PopularArtistsFollowArtistMutation,
  PopularArtistsFollowArtistMutationResponse,
} from "v2/__generated__/PopularArtistsFollowArtistMutation.graphql"
import { PopularArtistsQuery } from "v2/__generated__/PopularArtistsQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import track, { TrackingProp } from "react-tracking"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { get } from "v2/Utils/get"
import Events from "../../../../Utils/Events"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

type Artist = PopularArtists_popular_artists[number]

export interface RelayProps {
  tracking?: TrackingProp
  relay?: RelayProp
  popular_artists: PopularArtists_popular_artists
}

interface Props
  extends React.HTMLProps<HTMLAnchorElement>,
    RelayProps,
    FollowProps {}

@track({}, { dispatch: data => Events.postEvent(data) })
class PopularArtistsContent extends React.Component<Props, null> {
  private excludedArtistIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedArtistIds = new Set(
      this.props.popular_artists.filter(Boolean).map(item => item.internalID)
    )
  }

  onArtistFollowed(
    artist: Artist,
    store: RecordSourceSelectorProxy,
    data: PopularArtistsFollowArtistMutationResponse
  ): void {
    const suggestedArtistEdge =
      data.followArtist.artist.related.suggestedConnection.edges[0]
    const popularArtist = data.followArtist.popular_artists[0]
    const artistToSuggest = store.get(
      ((suggestedArtistEdge && suggestedArtistEdge.node) || popularArtist).id
    )
    this.excludedArtistIds.add(artistToSuggest.getValue("internalID") as string)

    const popularArtistsRootField = store
      .get("client:root")
      .getLinkedRecords("popular_artists", { exclude_followed_artists: true })

    const updatedPopularArtists = popularArtistsRootField
      .filter(Boolean)
      .map(artistItem =>
        artistItem.getDataID() === artist.id ? artistToSuggest : artistItem
      )

    store
      .get("client:root")
      .setLinkedRecords(updatedPopularArtists, "popular_artists")

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Artist",
      entity_id: artist.internalID,
      entity_slug: artist.slug,
      context_module: "onboarding recommended",
    })
  }

  onFollowedArtist(artist: Artist) {
    commitMutation<PopularArtistsFollowArtistMutation>(
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
            unfollow: false,
          },
          excludedArtistIds: Array.from(this.excludedArtistIds),
        },
        updater: (store, data) => this.onArtistFollowed(artist, store, data),
      }
    )
  }

  render() {
    const artistItems = this.props.popular_artists
      .filter(Boolean)
      .map((artist, index) => {
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
                name={artist.name}
                image_url={imageUrl}
                onClick={() => this.onFollowedArtist(artist)}
              />
            </ReplaceTransition>
          </LinkContainer>
        )
      })

    return <div>{artistItems}</div>
  }
}

const PopularArtistContentContainer = createFragmentContainer(
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

const PopularArtistsComponent: React.SFC<SystemContextProps & FollowProps> = ({
  relayEnvironment,
  updateFollowCount,
}) => {
  return (
    <QueryRenderer<PopularArtistsQuery>
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
              popular_artists={props.highlights.popular_artists}
              updateFollowCount={updateFollowCount}
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
