import React, { useEffect, useRef, useState } from "react"
import { Box, Text, Button, Flex, themeProps } from "@artsy/palette"
import { Match } from "found"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import {
  PartnerArtistDetailsListRenderer,
  PartnerArtistDetailsRenderer,
  PartnerArtistListFragmentContainer as PartnerArtistList,
  PartnerArtistListPlaceholder,
} from "../../Components/PartnerArtists"
import { PartnerArtists_partner } from "v2/__generated__/PartnerArtists_partner.graphql"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { PARTHER_NAV_BAR_HEIGHT } from "../../Components/NavigationTabs"

const PAGE_SIZE = 20

export interface ArtistsRouteProps {
  partner: PartnerArtists_partner
  relay: RelayPaginationProp
  match: Match
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner: { artistsConnection: artists, distinguishRepresentedArtists, slug },
  relay,
  match,
}) => {
  const [artistsLoading, setArtistsLoading] = useState(relay.hasMore())
  const [isRefetching, setIsRefetching] = useState(false)
  const [tempArtists, setTempArtists] = useState(undefined)
  const errCounter = useRef(0)
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  useEffect(() => {
    if (
      relay.hasMore() &&
      (!artistsLoading || !isRefetching) &&
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
      }
    })
  }

  const handleArtistClick = () => {
    const offset =
      PARTHER_NAV_BAR_HEIGHT +
      (isMobile ? MOBILE_NAV_HEIGHT : NAV_BAR_HEIGHT) +
      20

    scrollIntoView({
      offset: offset,
      selector: "#jump--PartnerArtistDetails",
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
            onArtistClick={handleArtistClick}
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

      {match.params.artistId ? (
        <PartnerArtistDetailsRenderer
          partnerId={match.params.partnerId}
          artistId={match.params.artistId}
        />
      ) : (
        <PartnerArtistDetailsListRenderer partnerId={match.params.partnerId} />
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
