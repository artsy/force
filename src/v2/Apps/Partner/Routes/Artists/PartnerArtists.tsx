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

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner: { artists, distinguishRepresentedArtists, slug },
  relay,
}) => {
  const [artistsLoaded, setArtistsLoaded] = useState(!relay.hasMore())
  const errCounter = useRef(0)

  const refetchArtists = () => {
    setArtistsLoaded(false)
    errCounter.current = 0

    loadMoreArtists()
  }

  const loadMoreArtists = () => {
    relay.loadMore(PAGE_SIZE, error => {
      if (error) {
        console.error(error)
        errCounter.current += 1
      } else {
        errCounter.current = 0
      }

      if (errCounter.current >= 3) {
        setTimeout(() => {
          setArtistsLoaded(true)
        }, 300)

        return
      }

      if (relay.hasMore()) {
        loadMoreArtists()
      } else {
        setArtistsLoaded(true)
      }
    })
  }

  useEffect(() => {
    if (relay.hasMore()) {
      loadMoreArtists()
    }
  }, [])

  console.log(artistsLoaded, artists)

  return (
    <Box mt={4}>
      <Text variant="title" mb={6}>
        Artists
      </Text>
      {artistsLoaded ? (
        <>
          <PartnerArtistList
            partnerSlug={slug}
            artists={artists.edges}
            distinguishRepresentedArtists={distinguishRepresentedArtists}
          />
          {errCounter.current > 0 && (
            <Flex flexDirection="column" mt={2} alignItems="center">
              <Button variant="secondaryOutline" onClick={refetchArtists}>
                Load more artists
              </Button>
            </Flex>
          )}
        </>
      ) : (
        <PartnerArtistListPlaceholder />
      )}
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
        artists: artistsConnection(first: $first, after: $after)
          @connection(key: "PartnerArtistsQuery_artists") {
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
