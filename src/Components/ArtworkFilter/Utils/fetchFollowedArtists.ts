import { fetchQuery } from "react-relay"
import { Environment, graphql } from "react-relay"
import { fetchFollowedArtistsByFairIdQuery } from "__generated__/fetchFollowedArtistsByFairIdQuery.graphql"
import { fetchFollowedArtistsRawQuery } from "__generated__/fetchFollowedArtistsRawQuery.graphql"
import { compact, isString } from "lodash"
import { FollowedArtists } from "Components/ArtworkFilter/ArtworkFilterContext"

graphql`
  fragment fetchFollowedArtists_response on FollowArtistConnection {
    edges {
      node {
        artist {
          slug
          internalID
        }
      }
    }
  }
`

const queryByFairId = graphql`
  query fetchFollowedArtistsByFairIdQuery($fairID: String) {
    me {
      followsAndSaves {
        artistsConnection(first: 99, fairID: $fairID) {
          ...fetchFollowedArtists_response @relay(mask: false)
        }
      }
    }
  }
`

const rawQuery = graphql`
  query fetchFollowedArtistsRawQuery {
    me {
      followsAndSaves {
        artistsConnection(first: 99) {
          ...fetchFollowedArtists_response @relay(mask: false)
        }
      }
    }
  }
`

// Expand support (in Gravity/MP as well), if needed
// to further narrow down followed artists.
export interface FetchFollowedArtistsArgs {
  fairID?: string
}

interface Args extends FetchFollowedArtistsArgs {
  relayEnvironment: Environment
}

export async function fetchFollowedArtists(
  args: Args
): Promise<FollowedArtists> {
  const { relayEnvironment, ...props } = args

  const query = isString(props.fairID) ? queryByFairId : rawQuery

  try {
    const data = await fetchQuery<
      fetchFollowedArtistsByFairIdQuery | fetchFollowedArtistsRawQuery
    >(relayEnvironment, query, props).toPromise()

    const edges = data?.me?.followsAndSaves?.artistsConnection?.edges ?? []
    const artists = edges.map(edge => edge?.node?.artist)

    return compact(artists)
  } catch (error) {
    console.error(error)
    return []
  }
}
