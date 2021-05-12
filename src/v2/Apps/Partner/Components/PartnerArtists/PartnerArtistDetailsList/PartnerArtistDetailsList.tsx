import { Box } from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import { useSystemContext } from "v2/Artsy"
import {
  createPaginationContainer,
  graphql,
  QueryRenderer,
  RelayPaginationProp,
} from "react-relay"
import { PartnerArtistDetailsList_partner } from "v2/__generated__/PartnerArtistDetailsList_partner.graphql"
import { PartnerArtistDetailsListQuery } from "v2/__generated__/PartnerArtistDetailsListQuery.graphql"
import { PartnerArtistDetailsListPlaceholder } from "./PartnerArtistDetailsListPlaceholder"
import { PartnerArtistDetailsFragmentContainer } from "../PartnerArtistDetails"

export interface PartnerArtistDetailsListProps {
  partner: PartnerArtistDetailsList_partner
  relay: RelayPaginationProp
}

const PAGE_SIZE = 3

export const PartnerArtistDetailsList: React.FC<PartnerArtistDetailsListProps> = ({
  partner,
  relay,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>()
  useEffect(() => {
    const interval = setInterval(() => {
      maybeLoadMore()
    }, 200)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  const maybeLoadMore = () => {
    const el = containerRef.current.getBoundingClientRect()

    if (window.innerHeight >= el.bottom && el.bottom > 0) {
      loadMore()
    }
  }

  const loadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setIsLoading(true)
    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)

      setIsLoading(false)
    })
  }

  return (
    <Box ref={ref => ref && (containerRef.current = ref)} mt={4}>
      {partner.artists.edges.map(edge => {
        return (
          <PartnerArtistDetailsFragmentContainer
            key={edge.id}
            partnerArtist={edge}
          />
        )
      })}

      {isLoading && <PartnerArtistDetailsListPlaceholder count={PAGE_SIZE} />}
    </Box>
  )
}

export const ARTISTS_DETAILS_QUERY = graphql`
  query PartnerArtistDetailsListQuery(
    $partnerId: String!
    $first: Int!
    $after: String
  ) {
    partner(id: $partnerId) @principalField {
      ...PartnerArtistDetailsList_partner
        @arguments(first: $first, after: $after)
    }
  }
`

export const PartnerArtistDetailsListPaginationContainer = createPaginationContainer(
  PartnerArtistDetailsList,
  {
    partner: graphql`
      fragment PartnerArtistDetailsList_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 3 }
          after: { type: "String" }
        ) {
        slug
        artists: artistsConnection(
          first: $first
          after: $after
          hasPublishedArtworks: true
          displayOnPartnerProfile: true
        ) @connection(key: "PartnerArtistDetailsList_artists") {
          edges {
            id
            representedBy
            counts {
              artworks
            }
            ...PartnerArtistDetails_partnerArtist
          }
        }
      }
    `,
  },
  {
    query: ARTISTS_DETAILS_QUERY,
    direction: "forward",
    getVariables(
      { partner: { slug: partnerId } },
      { cursor: after },
      { first }
    ) {
      return { partnerId, after, first }
    },
  }
)

export const PartnerArtistDetailsListRenderer: React.FC<{
  partnerId: string
}> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<PartnerArtistDetailsListQuery>
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistDetailsListRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtistDetailsList_partner
          }
        }
      `}
      variables={{ partnerId, first: PAGE_SIZE, after: undefined }}
      render={({ error, props }) => {
        if (error || !props)
          return <PartnerArtistDetailsListPlaceholder count={PAGE_SIZE} />

        return (
          <PartnerArtistDetailsListPaginationContainer {...rest} {...props} />
        )
      }}
    />
  )
}
