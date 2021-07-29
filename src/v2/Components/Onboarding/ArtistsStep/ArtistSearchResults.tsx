import { ArtistSearchResults_viewer } from "v2/__generated__/ArtistSearchResults_viewer.graphql"
import {
  ArtistSearchResultsArtistMutation,
  ArtistSearchResultsArtistMutationResponse,
} from "v2/__generated__/ArtistSearchResultsArtistMutation.graphql"
import { ArtistSearchResultsQuery } from "v2/__generated__/ArtistSearchResultsQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/System"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import ReplaceTransition from "../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../ItemLink"

// @ts-expect-error STRICT_NULL_CHECK
type Artist = ArtistSearchResults_viewer["searchConnection"]["edges"][number]["node"]

export interface ContainerProps {
  onArtistFollow
  onNoResults
  term: string
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, ContainerProps {
  relay?: RelayProp
  viewer: ArtistSearchResults_viewer
}

class ArtistSearchResultsContent extends React.Component<Props, null> {
  private excludedArtistIds: Set<string>

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedArtistIds = new Set(
      // @ts-expect-error STRICT_NULL_CHECK
      this.props.viewer.searchConnection.edges.map(
        // @ts-expect-error STRICT_NULL_CHECK
        ({ node }) => node.internalID
      )
    )
  }

  onArtistFollowed(
    artist: Artist,
    store: RecordSourceSelectorProxy,
    data: ArtistSearchResultsArtistMutationResponse,
    follow: boolean
  ): void {
    this.props.onArtistFollow(follow, artist)

    const suggestedArtistEdge =
      // @ts-expect-error STRICT_NULL_CHECK
      data.followArtist.artist.related.suggestedConnection.edges[0]
    // @ts-expect-error STRICT_NULL_CHECK
    const popularArtist = data.followArtist.popular_artists[0]
    const artistToSuggest = store.get(
      // @ts-expect-error STRICT_NULL_CHECK
      ((suggestedArtistEdge && suggestedArtistEdge.node) || popularArtist).id
    )
    // @ts-expect-error STRICT_NULL_CHECK
    this.excludedArtistIds.add(artistToSuggest.getValue("internalID") as string)

    const popularArtistsRootField = store.get("client:root:viewer")
    const popularArtists =
      // @ts-expect-error STRICT_NULL_CHECK
      popularArtistsRootField.getLinkedRecords("match_artist", {
        term: this.props.term,
      }) || []
    const updatedPopularArtists = popularArtists.map(artistItem =>
      artistItem.getDataID() === artist.id ? artistToSuggest : artistItem
    )

    // @ts-expect-error STRICT_NULL_CHECK
    popularArtistsRootField.setLinkedRecords(
      // @ts-expect-error STRICT_NULL_CHECK
      updatedPopularArtists,
      "match_artist",
      { term: this.props.term }
    )
  }

  onFollowedArtist(artist: Artist, follow: boolean) {
    commitMutation<ArtistSearchResultsArtistMutation>(
      // @ts-expect-error STRICT_NULL_CHECK
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
    // @ts-expect-error STRICT_NULL_CHECK
    const artistItems = this.props.viewer.searchConnection.edges.map(
      // @ts-expect-error STRICT_NULL_CHECK
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
                onFollow={selected => this.onFollowedArtist(artist, selected)}
              />
            </ReplaceTransition>
          </LinkContainer>
        )
      }
    )

    if (artistItems.length === 0) {
      this.props.onNoResults()
    }

    return <div>{artistItems}</div>
  }
}

export const ArtistSearchResultsContentContainer = createFragmentContainer(
  // @ts-expect-error STRICT_NULL_CHECK
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
> = ({ onArtistFollow, onNoResults, relayEnvironment, term }) => {
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
      render={({ props }) => {
        if (props) {
          return (
            <ArtistSearchResultsContentContainer
              onArtistFollow={onArtistFollow}
              onNoResults={onNoResults}
              term={term}
              viewer={props.viewer!}
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
