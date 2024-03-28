import { Stack, Text } from "@artsy/palette"
import { FC } from "react"
import { graphql } from "react-relay"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { CollectorProfileArtistsListQuery } from "__generated__/CollectorProfileArtistsListQuery.graphql"
import {
  CollectorProfileArtistsListArtist,
  CollectorProfileArtistsListArtistSkeleton,
} from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsListArtist"
import { compact } from "lodash"

interface CollectorProfileArtistsListProps {}

export const CollectorProfileArtistsList: FC<CollectorProfileArtistsListProps> = () => {
  const { data, loading } = useClientQuery<CollectorProfileArtistsListQuery>({
    query: COLLECTOR_PROFILE_ARTISTS_LIST_QUERY,
  })

  const userInterestEdges = compact(data?.me?.userInterestsConnection?.edges)

  return (
    <Stack gap={2}>
      <Stack
        gap={2}
        flexDirection="row"
        alignItems="center"
        color="black60"
        borderBottom="1px solid"
        borderColor="black10"
        pb={2}
      >
        <Text size="sm-display" overflowEllipsis flex={1}>
          Artist
        </Text>

        <Text size="sm-display" overflowEllipsis flex={1}>
          Artworks uploaded
        </Text>

        <Text size="sm-display" overflowEllipsis flex={1}>
          Share with the galleries during inquiries
        </Text>

        <Text size="sm-display" overflowEllipsis flex={1} textAlign="right">
          Follow artist
        </Text>
      </Stack>

      {loading ? (
        new Array(10).fill(null).map((_, i) => {
          return <CollectorProfileArtistsListArtistSkeleton key={i} />
        })
      ) : (
        <>
          {userInterestEdges.map(userInterestEdge => {
            return (
              <CollectorProfileArtistsListArtist
                key={userInterestEdge.internalID}
                userInterestEdge={userInterestEdge}
              />
            )
          })}
        </>
      )}
    </Stack>
  )
}

const COLLECTOR_PROFILE_ARTISTS_LIST_QUERY = graphql`
  query CollectorProfileArtistsListQuery($after: String) {
    me {
      userInterestsConnection(first: 10, after: $after, interestType: ARTIST) {
        totalCount
        edges {
          ...CollectorProfileArtistsListArtist_userInterestEdge
          internalID
        }
      }
    }
  }
`
