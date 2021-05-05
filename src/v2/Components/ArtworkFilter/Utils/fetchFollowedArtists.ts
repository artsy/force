import { Environment, fetchQuery } from "relay-runtime"
import { graphql } from "react-relay"
import { fetchFollowedArtistsQuery } from "v2/__generated__/fetchFollowedArtistsQuery.graphql"

export type FollowedArtistList = Array<{
  slug: string
  internalID: string
}>

// Expand support (in Gravity/MP as well), if needed
// to further narrow down followed artists.
export interface FetchFollowedArtistsArgs {
  fairID: string
}

interface Args extends FetchFollowedArtistsArgs {
  relayEnvironment: Environment
}

export async function fetchFollowedArtists(
  args: Args
): Promise<FollowedArtistList> {
  const { relayEnvironment, ...props } = args

  const query = graphql`
    query fetchFollowedArtistsQuery($fairID: String) {
      me {
        followsAndSaves {
          artistsConnection(first: 99, fairID: $fairID) {
            edges {
              node {
                artist {
                  slug
                  internalID
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await fetchQuery<fetchFollowedArtistsQuery>(
      relayEnvironment,
      query,
      props
    )

    return data.me.followsAndSaves.artistsConnection.edges.map(
      ({ node: { artist } }) => artist
    )
  } catch (error) {
    console.error(error)
    return []
  }
}
