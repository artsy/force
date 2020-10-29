import { ArtistSearchResults_viewer } from "v2/__generated__/ArtistSearchResults_viewer.graphql"
import {
  ArtistSearchResultsArtistMutation,
  ArtistSearchResultsArtistMutationResponse,
} from "v2/__generated__/ArtistSearchResultsArtistMutation.graphql"
import { ArtistSearchResultsQuery } from "v2/__generated__/ArtistSearchResultsQuery.graphql"
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
import Events from "../../../../Utils/Events"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

type Artist = ArtistSearchResults_viewer["searchConnection"]["edges"][number]["node"]

export interface ContainerProps extends FollowProps {
  term: string
  tracking?: TrackingProp
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, ContainerProps {
  relay?: RelayProp
  viewer: ArtistSearchResults_viewer
}

@track({}, { dispatch: data => Events.postEvent(data) })
class ArtistSearchResultsContent extends React.Component<Props, null> {
  private excludedArtistIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedArtistIds = new Set(
      this.props.viewer.searchConnection.edges.map(
        ({ node }) => node.internalID
      )
    )
  }

  onArtistFollowed(
    artist: Artist,
    store: RecordSourceSelectorProxy,
    data: ArtistSearchResultsArtistMutationResponse
  ): void {
    const suggestedArtistEdge =
      data.followArtist.artist.related.suggestedConnection.edges[0]
    const popularArtist = data.followArtist.popular_artists[0]
    const artistToSuggest = store.get(
      ((suggestedArtistEdge && suggestedArtistEdge.node) || popularArtist).id
    )
    this.excludedArtistIds.add(artistToSuggest.getValue("internalID") as string)

    const popularArtistsRootField = store.get("client:root:viewer")
    const popularArtists = popularArtistsRootField.getLinkedRecords(
      "match_artist",
      { term: this.props.term }
    )
    const updatedPopularArtists = popularArtists.map(artistItem =>
      artistItem.getDataID() === artist.id ? artistToSuggest : artistItem
    )

    popularArtistsRootField.setLinkedRecords(
      updatedPopularArtists,
      "match_artist",
      { term: this.props.term }
    )

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Artist",
      entity_id: artist.internalID,
      entity_slug: artist.slug,
      context_module: "onboarding search",
    })
  }

  onFollowedArtist(artist: Artist) {
    commitMutation<ArtistSearchResultsArtistMutation>(
      this.props.relay.environment,
      {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation ArtistSearchResultsArtistMutation(
            $input: FollowArtistInput!
            $excludedArtistIds: [String]!
          ) {
            followArtist(input: $input) {
              popular_artists: popularArtists(
                size: 1
                excludeFollowedArtists: true
                excludeArtistIDs: $excludedArtistIds
              ) {
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
    const artistItems = this.props.viewer.searchConnection.edges.map(
      ({ node: artist }, index) => {
        return (
          <LinkContainer key={`artist-search-results-${index}`}>
            <ReplaceTransition
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={400}
            >
              <ItemLink
                href="#"
                item={artist}
                key={artist.id}
                id={artist.internalID}
                name={artist.displayLabel}
                image_url={artist.imageUrl}
                onClick={() => this.onFollowedArtist(artist)}
              />
            </ReplaceTransition>
          </LinkContainer>
        )
      }
    )

    return <div>{artistItems}</div>
  }
}

const ArtistSearchResultsContentContainer = createFragmentContainer(
  ArtistSearchResultsContent,
  {
    viewer: graphql`
      fragment ArtistSearchResults_viewer on Viewer {
        searchConnection(
          query: $term
          mode: AUTOSUGGEST
          entities: [ARTIST]
          first: 10
        ) {
          edges {
            node {
              ... on SearchableItem {
                id
                slug
                internalID
                displayLabel
                imageUrl
              }
            }
          }
        }
      }
    `,
  }
)

const ArtistSearchResultsComponent: React.SFC<
  ContainerProps & SystemContextProps
> = ({ term, relayEnvironment, updateFollowCount }) => {
  return (
    <QueryRenderer<ArtistSearchResultsQuery>
      environment={relayEnvironment}
      query={graphql`
        query ArtistSearchResultsQuery($term: String!) {
          viewer {
            ...ArtistSearchResults_viewer
          }
        }
      `}
      variables={{ term }}
      render={({ error, props }) => {
        if (props) {
          return (
            <ArtistSearchResultsContentContainer
              viewer={props.viewer}
              term={term}
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

export const ArtistSearchResults = withSystemContext(
  ArtistSearchResultsComponent
)
