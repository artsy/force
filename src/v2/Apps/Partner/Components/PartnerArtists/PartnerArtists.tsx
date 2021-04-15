import React, { useEffect, useRef, useState } from "react"
import { Box, Button, Flex } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import {
  PartnerArtistListFragmentContainer,
  PartnerArtistListPlaceholder,
} from "../../Components/PartnerArtists"
import { PartnerArtists_partner } from "v2/__generated__/PartnerArtists_partner.graphql"
import { usePartnerArtistsLoadingContext } from "../../Utils/PartnerArtistsLoadingContext"

const PAGE_SIZE = 20

export interface PartnerArtistsProps {
  partner: PartnerArtists_partner
  relay: RelayPaginationProp
  onArtistClick?: () => void
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const PartnerArtists: React.FC<PartnerArtistsProps> = ({
  partner: { artistsConnection: artists, distinguishRepresentedArtists, slug },
  relay,
  onArtistClick,
}) => {
  const [artistsLoading, setArtistsLoading] = useState(relay.hasMore())
  const [isRefetching, setIsRefetching] = useState(false)
  const [tempArtists, setTempArtists] = useState(undefined)
  const errCounter = useRef(0)
  const { setIsLoaded } = usePartnerArtistsLoadingContext()

  useEffect(() => {
    if (
      relay.hasMore() &&
      !relay.isLoading() &&
      !isRefetching &&
      errCounter.current === 0
    ) {
      loadMoreArtists()
    }
  }, [artists, artistsLoading, isRefetching])

  const refetchArtists = () => {
    setTempArtists(artists)
    setArtistsLoading(true)
    setIsRefetching(true)
    errCounter.current = 0

    loadMoreArtists()
  }

  const loadMoreArtists = () => {
    relay.loadMore(PAGE_SIZE, async error => {
      if (error) {
        console.error(error)
        errCounter.current += 1
        // Wait before next try.
        await sleep(500)
      } else {
        errCounter.current = 0
      }

      if (errCounter.current >= 3) {
        setIsRefetching(false)
        setArtistsLoading(false)

        return
      }

      if (relay.hasMore()) {
        loadMoreArtists()
      } else {
        setIsRefetching(false)
        setArtistsLoading(false)
        setTempArtists(undefined)
        setIsLoaded && setIsLoaded(true)
      }
    })
  }

  const isFirstLoading = !isRefetching && artistsLoading

  return (
    <Box mt={4}>
      {!isFirstLoading && (
        <>
          <PartnerArtistListFragmentContainer
            partnerSlug={slug}
            onArtistClick={onArtistClick}
            artists={isRefetching ? tempArtists.edges : artists.edges}
            distinguishRepresentedArtists={distinguishRepresentedArtists}
          />
          {(errCounter.current > 0 || isRefetching) && (
            <Flex flexDirection="column" mt={2} alignItems="center">
              <Button
                variant="secondaryOutline"
                loading={isRefetching}
                onClick={refetchArtists}
              >
                Load more artists
              </Button>
            </Flex>
          )}
        </>
      )}

      {isFirstLoading && <PartnerArtistListPlaceholder />}
    </Box>
  )
}

export const ARTISTS_QUERY = graphql`
  query PartnerArtistsQuery($partnerId: String!, $first: Int!, $after: String) {
    partner(id: $partnerId) {
      ...PartnerArtists_partner @arguments(first: $first, after: $after)
    }
  }
`

export const PartnerArtistsPaginationContainer = createPaginationContainer(
  PartnerArtists,
  {
    partner: graphql`
      fragment PartnerArtists_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 20 }
          after: { type: "String" }
        ) {
        slug
        distinguishRepresentedArtists
        artistsConnection(first: $first, after: $after)
          @connection(key: "PartnerArtistsQuery_artistsConnection") {
          edges {
            ...PartnerArtistList_artists
          }
        }
      }
    `,
  },
  {
    query: ARTISTS_QUERY,
    direction: "forward",
    getVariables(
      { partner: { slug: partnerId } },
      { cursor: after },
      { first }
    ) {
      return { after, first, partnerId }
    },
  }
)
