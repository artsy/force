/* eslint-disable jsx-a11y/alt-text */
import { MockRelayRendererFixtures_artist$data } from "__generated__/MockRelayRendererFixtures_artist.graphql"
import { MockRelayRendererFixtures_artwork$data } from "__generated__/MockRelayRendererFixtures_artwork.graphql"
import { MockRelayRendererFixtures_artworkMetadata$data } from "__generated__/MockRelayRendererFixtures_artworkMetadata.graphql"
import { MockRelayRendererFixturesArtistQuery } from "__generated__/MockRelayRendererFixturesArtistQuery.graphql"
import { renderWithLoadProgress } from "System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import cheerio from "cheerio"
import { render } from "enzyme"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemContextConsumer } from "System/Contexts/SystemContext"

const Metadata = createFragmentContainer(
  (props: {
    artworkMetadata: MockRelayRendererFixtures_artworkMetadata$data
  }) => <div>{props.artworkMetadata.title}</div>,
  {
    artworkMetadata: graphql`
      fragment MockRelayRendererFixtures_artworkMetadata on Artwork {
        title
      }
    `,
  }
)

export const Artwork = createFragmentContainer(
  (props: { artwork: MockRelayRendererFixtures_artwork$data }) => (
    <div>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <img src={props.artwork.image.url} />

      <Metadata artworkMetadata={props.artwork} />
      {props.artwork.artist && (
        <ArtistQueryRenderer id={props.artwork.artist.slug} />
      )}
    </div>
  ),
  {
    artwork: graphql`
      fragment MockRelayRendererFixtures_artwork on Artwork {
        image {
          url
        }
        artist {
          slug
        }
        ...MockRelayRendererFixtures_artworkMetadata
      }
    `,
  }
)

const Artist = createFragmentContainer(
  (props: { artist: MockRelayRendererFixtures_artist$data }) => (
    <div>{props.artist.name}</div>
  ),
  {
    artist: graphql`
      fragment MockRelayRendererFixtures_artist on Artist {
        name
      }
    `,
  }
)

const ArtistQueryRenderer = (props: { id: string }) => (
  <SystemContextConsumer>
    {({ relayEnvironment }) => {
      return (
        <SystemQueryRenderer<MockRelayRendererFixturesArtistQuery>
          environment={relayEnvironment}
          variables={props}
          query={graphql`
            query MockRelayRendererFixturesArtistQuery($id: String!)
              @raw_response_type {
              artist(id: $id) {
                ...MockRelayRendererFixtures_artist
              }
            }
          `}
          render={renderWithLoadProgress(Artist)}
        />
      )
    }}
  </SystemContextConsumer>
)

export const query = graphql`
  query MockRelayRendererFixturesQuery @raw_response_type {
    artwork(id: "mona-lisa") {
      ...MockRelayRendererFixtures_artwork
    }
  }
`

// Bad query has a misnamed top-level property.
export const badQuery = graphql`
  query MockRelayRendererFixturesBadQuery @raw_response_type {
    something_that_is_not_expected: artwork(id: "mona-lisa") {
      ...MockRelayRendererFixtures_artwork
    }
  }
`

export function renderToString(element: JSX.Element) {
  return cheerio.html(render(element))
}
