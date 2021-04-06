import { Box, Text, Button, Flex } from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { PartnerArtists_partner } from "v2/__generated__/PartnerArtists_partner.graphql"
import {
  PartnerArtistListFragmentContainer as PartnerArtistList,
  PartnerArtistListPlaceholder,
} from "../../Components/PartnerArtists"

const PAGE_SIZE = 20

export interface ArtistsRouteProps {
  partner: PartnerArtists_partner
  relay: RelayPaginationProp
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner: { artistsConnection, distinguishRepresentedArtists, slug },
  relay,
}) => {
  const [artistsLoading, setArtistsLoading] = useState(relay.hasMore())
  const [isRefetching, setIsRefetching] = useState(false)
  const [artists, setArtists] = useState(artistsConnection)
  const errCounter = useRef(0)

  useEffect(() => {
    if (relay.hasMore()) {
      loadMoreArtists()
    }
  }, [])

  useEffect(() => {
    if ((!isRefetching || !artistsLoading) && artists !== artistsConnection) {
      setArtists(artistsConnection)
    }
  }, [artistsConnection, isRefetching, artistsLoading])

  const refetchArtists = () => {
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
        setArtists(artistsConnection)

        return
      }

      if (relay.hasMore()) {
        loadMoreArtists()
      } else {
        setIsRefetching(false)
        setArtistsLoading(false)
      }
    })
  }

  const isFirstLoading = !isRefetching && artistsLoading

  return (
    <Box mt={4}>
      <Text variant="title" mb={6}>
        Artists
      </Text>
      {!isFirstLoading && (
        <>
          <PartnerArtistList
            partnerSlug={slug}
            artists={artists.edges}
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

export const ArtistsPaginationContainer = createPaginationContainer(
  ArtistsRoute,
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
