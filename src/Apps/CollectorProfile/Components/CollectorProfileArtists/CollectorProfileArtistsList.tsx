import {
  Box,
  Message,
  PaginationSkeleton,
  Stack,
  useDidMount,
} from "@artsy/palette"
import { FC, Suspense } from "react"
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"
import { CollectorProfileArtistsListArtistsQuery } from "__generated__/CollectorProfileArtistsListArtistsQuery.graphql"
import {
  CollectorProfileArtistsListArtist,
  CollectorProfileArtistsListArtistSkeleton,
} from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsListArtist"
import { compact } from "lodash"
import { PaginationFragmentContainer } from "Components/Pagination"
import { useRouter } from "System/Hooks/useRouter"
import { CollectorProfileArtistsList_me$key } from "__generated__/CollectorProfileArtistsList_me.graphql"

const PAGE_SIZE = 10

interface CollectorProfileArtistsListProps {}

export const CollectorProfileArtistsList: FC<CollectorProfileArtistsListProps> = ({
  children,
}) => {
  const isMounted = useDidMount()

  return (
    <Stack gap={2}>
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
    <Stack gap={2}>
      <Box>
        {new Array(PAGE_SIZE).fill(null).map((_, i) => {
          return <CollectorProfileArtistsListArtistSkeleton key={i} />
        })}
      </Box>

      <PaginationSkeleton />
    </Stack>
  )
}

const CollectorProfileArtistsListArtists: FC = () => {
  const {
    router,
    match,
    match: { location: { query } } = {
      location: { query: { page: "1" } },
    },
  } = useRouter()

  const page = parseInt(query.page, 10) || 1

  const data = useLazyLoadQuery<CollectorProfileArtistsListArtistsQuery>(
    QUERY,
    { page, size: PAGE_SIZE },
    { fetchPolicy: "network-only" }
  )

  const me = useFragment(
    FRAGMENT,
    data.me as CollectorProfileArtistsList_me$key
  )

  const userInterestEdges = compact(me?.userInterestsConnection?.edges)
  const hasNextPage = me?.userInterestsConnection?.pageInfo?.hasNextPage
  const pageCursors = me?.userInterestsConnection?.pageCursors

  const handleNext = (page: number) => {
    handlePage(null, page)
  }

  const handlePage = (_cursor: string | null, page: number) => {
    router.push({
      pathname: match.location.pathname,
      query: { ...match.location.query, page },
    })
  }

  return (
    <Stack gap={2}>
      {userInterestEdges.length === 0 ? (
        <Message mt={2}>Nothing yet.</Message>
      ) : (
        <Box>
          {userInterestEdges.map(userInterestEdge => {
            return (
              <CollectorProfileArtistsListArtist
                key={userInterestEdge.internalID}
                userInterestEdge={userInterestEdge}
              />
            )
          })}
        </Box>
      )}

      <PaginationFragmentContainer
        hasNextPage={!!hasNextPage}
        pageCursors={pageCursors}
        onClick={handlePage}
        onNext={handleNext}
        offset={20}
        mt={0}
      />
    </Stack>
  )
}

const FRAGMENT = graphql`
  fragment CollectorProfileArtistsList_me on Me
    @argumentDefinitions(page: { type: "Int" }, size: { type: "Int" }) {
    userInterestsConnection(page: $page, size: $size, interestType: ARTIST) {
      totalCount
      pageCursors {
        ...Pagination_pageCursors
      }
      pageInfo {
        hasNextPage
      }
      edges {
        ...CollectorProfileArtistsListArtist_userInterestEdge
        internalID
      }
    }
  }
`

const QUERY = graphql`
  query CollectorProfileArtistsListArtistsQuery($page: Int!, $size: Int!) {
    me {
      ...CollectorProfileArtistsList_me @arguments(page: $page, size: $size)
    }
  }
`
