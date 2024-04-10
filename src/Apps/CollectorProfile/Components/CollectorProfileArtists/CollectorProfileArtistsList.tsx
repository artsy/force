import { PaginationSkeleton, Stack, Text, useDidMount } from "@artsy/palette"
import { FC, Suspense, useState } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CollectorProfileArtistsListArtistsQuery } from "__generated__/CollectorProfileArtistsListArtistsQuery.graphql"
import {
  CollectorProfileArtistsListArtist,
  CollectorProfileArtistsListArtistSkeleton,
} from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsListArtist"
import { compact } from "lodash"
import { PaginationFragmentContainer } from "Components/Pagination"
import { Jump } from "Utils/Hooks/useJump"
import { useRouter } from "System/Router/useRouter"

const PAGE_SIZE = 10

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
    <Stack gap={2}>
      {new Array(PAGE_SIZE).fill(null).map((_, i) => {
        return <CollectorProfileArtistsListArtistSkeleton key={i} />
      })}

      <PaginationSkeleton />
    </Stack>
  )
}

const CollectorProfileArtistsListArtists: FC = () => {
  const {
    match: { location: { query } } = {
      location: { query: { page: "1" } },
    },
  } = useRouter()

  const [page, setPage] = useState(parseInt(query.page, 10) || 1)

  const { me } = useLazyLoadQuery<CollectorProfileArtistsListArtistsQuery>(
    QUERY,
    { page, size: PAGE_SIZE }
  )

  const userInterestEdges = compact(me?.userInterestsConnection?.edges)
  const hasNextPage = me?.userInterestsConnection?.pageInfo?.hasNextPage
  const pageCursors = me?.userInterestsConnection?.pageCursors

  const handleNext = (page: number) => {
    handlePage(null, page)
  }

  const handlePage = (_cursor: string | null, page: number) => {
    setPage(page)
  }

  return (
    <div>
      <Jump id="top" />

      <Stack gap={2}>
        {userInterestEdges.map(userInterestEdge => {
          return (
            <CollectorProfileArtistsListArtist
              key={userInterestEdge.internalID}
              userInterestEdge={userInterestEdge}
            />
          )
        })}

        <PaginationFragmentContainer
          hasNextPage={!!hasNextPage}
          pageCursors={pageCursors}
          onClick={handlePage}
          onNext={handleNext}
          scrollTo="top"
          offset={20}
          mt={0}
        />
      </Stack>
    </div>
  )
}

const QUERY = graphql`
  query CollectorProfileArtistsListArtistsQuery($page: Int!, $size: Int!) {
    me {
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
  }
`
