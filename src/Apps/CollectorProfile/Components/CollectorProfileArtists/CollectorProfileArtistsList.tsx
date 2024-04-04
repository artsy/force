import { Stack, Text, useDidMount } from "@artsy/palette"
import { FC, Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CollectorProfileArtistsListArtistsQuery } from "__generated__/CollectorProfileArtistsListArtistsQuery.graphql"
import {
  CollectorProfileArtistsListArtist,
  CollectorProfileArtistsListArtistSkeleton,
} from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsListArtist"
import { compact } from "lodash"

interface CollectorProfileArtistsListProps {}

export const CollectorProfileArtistsList: FC<CollectorProfileArtistsListProps> = () => {
  const isMounted = useDidMount()

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

      {isMounted ? (
        <Suspense fallback={<CollectorProfileArtistsListPlaceholder />}>
          <CollectorProfileArtistsListArtists />
        </Suspense>
      ) : (
        <CollectorProfileArtistsListPlaceholder />
      )}
    </Stack>
  )
}

const CollectorProfileArtistsListPlaceholder: FC = () => {
  return (
    <>
      {new Array(10).fill(null).map((_, i) => {
        return <CollectorProfileArtistsListArtistSkeleton key={i} />
      })}
    </>
  )
}

const CollectorProfileArtistsListArtists: FC = () => {
  const { me } = useLazyLoadQuery<CollectorProfileArtistsListArtistsQuery>(
    QUERY,
    {}
  )

  const userInterestEdges = compact(me?.userInterestsConnection?.edges)

  return (
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
  )
}

const QUERY = graphql`
  query CollectorProfileArtistsListArtistsQuery($after: String) {
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
