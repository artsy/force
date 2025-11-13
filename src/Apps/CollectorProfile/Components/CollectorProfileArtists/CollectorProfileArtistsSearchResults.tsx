import {
  CollectorProfileArtistsListArtist,
  CollectorProfileArtistsListArtistSkeleton,
} from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsListArtist"
import { Message } from "@artsy/palette"
import type { CollectorProfileArtistsSearchResultsQuery } from "__generated__/CollectorProfileArtistsSearchResultsQuery.graphql"
import { compact } from "lodash"
import { type FC, Suspense, useMemo } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface CollectorProfileArtistsSearchResultsProps {
  term: string
}

export const CollectorProfileArtistsSearchResults: FC<
  React.PropsWithChildren<CollectorProfileArtistsSearchResultsProps>
> = ({ term }) => {
  return (
    <Suspense fallback={<CollectorProfileArtistsListPlaceholder />}>
      <CollectorProfileArtistsSearchResultsArtists term={term} />
    </Suspense>
  )
}

interface CollectorProfileArtistsSearchResultsArtistsProps
  extends CollectorProfileArtistsSearchResultsProps {}

const CollectorProfileArtistsSearchResultsArtists: FC<
  React.PropsWithChildren<CollectorProfileArtistsSearchResultsArtistsProps>
> = ({ term }) => {
  const { me } = useLazyLoadQuery<CollectorProfileArtistsSearchResultsQuery>(
    QUERY,
    {}
  )

  const results = useMemo(() => {
    if (term === "" || !me) return []

    return compact(
      me?.userInterestsConnection?.edges?.filter(edge => {
        return edge?.node?.name?.toLowerCase().includes(term.toLowerCase())
      })
    )
  }, [me, term])

  return (
    <>
      {results.length === 0 && (
        <Message mt={2}>No results found for “{term}”</Message>
      )}

      {results.map(userInterestEdge => {
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

const CollectorProfileArtistsListPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      {new Array(5).fill(null).map((_, i) => {
        return <CollectorProfileArtistsListArtistSkeleton key={i} />
      })}
    </>
  )
}

const QUERY = graphql`
  query CollectorProfileArtistsSearchResultsQuery {
    me {
      userInterestsConnection(page: 1, size: 100, interestType: ARTIST) {
        edges {
          ...CollectorProfileArtistsListArtist_userInterestEdge
          internalID
          node {
            ... on Artist {
              name
            }
          }
        }
      }
    }
  }
`
