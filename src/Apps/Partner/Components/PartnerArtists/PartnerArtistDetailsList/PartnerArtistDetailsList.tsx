import { PartnerArtistDetailsFragmentContainer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetails/PartnerArtistDetails"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Box, Join, Spacer } from "@artsy/palette"
import type { PartnerArtistDetailsList_partner$data } from "__generated__/PartnerArtistDetailsList_partner.graphql"
import type { PartnerArtistDetailsListQuery } from "__generated__/PartnerArtistDetailsListQuery.graphql"
import type * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  type RelayPaginationProp,
} from "react-relay"
import { PartnerArtistDetailsListPlaceholder } from "./PartnerArtistDetailsListPlaceholder"

export interface PartnerArtistDetailsListProps {
  partner: PartnerArtistDetailsList_partner$data
  relay: RelayPaginationProp
}

const PAGE_SIZE = 10

export const PartnerArtistDetailsList: React.FC<
  React.PropsWithChildren<PartnerArtistDetailsListProps>
> = ({ partner, relay }) => {
  const [isLoading, setIsLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>()

  useEffect(() => {
    const loadMore = () => {
      if (!relay.hasMore() || relay.isLoading()) return

      setIsLoading(true)

      relay.loadMore(PAGE_SIZE, error => {
        if (error) console.error(error)

        setIsLoading(false)
      })
    }

    const maybeLoadMore = () => {
      if (!containerRef.current) return

      const el = containerRef.current.getBoundingClientRect()

      if (window.innerHeight >= el.bottom && el.bottom > 0) {
        loadMore()
      }
    }

    const interval = setInterval(() => {
      maybeLoadMore()
    }, 200)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [relay])

  return (
    <Box ref={containerRef as any}>
      <Join separator={<Spacer y={4} />}>
        {partner.artists?.edges?.map(edge => {
          if (!edge) return null

          return (
            <PartnerArtistDetailsFragmentContainer
              key={edge.id}
              partnerArtist={edge}
              partner={partner}
            />
          )
        })}
      </Join>

      {isLoading && (
        <>
          <Spacer y={4} />

          <PartnerArtistDetailsListPlaceholder count={PAGE_SIZE} />
        </>
      )}
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

export const PartnerArtistDetailsListPaginationContainer =
  createPaginationContainer(
    PartnerArtistDetailsList,
    {
      partner: graphql`
        fragment PartnerArtistDetailsList_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
          slug
          ...PartnerArtistDetails_partner
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
        { first },
      ) {
        return { partnerId, after, first }
      },
    },
  )

export const PartnerArtistDetailsListRenderer: React.FC<
  React.PropsWithChildren<{
    partnerId: string
  }>
> = ({ partnerId, ...rest }) => {
  return (
    <SystemQueryRenderer<PartnerArtistDetailsListQuery>
      lazyLoad
      // debugPlaceholder
      query={graphql`
        query PartnerArtistDetailsListRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtistDetailsList_partner
          }
        }
      `}
      placeholder={<PartnerArtistDetailsListPlaceholder count={PAGE_SIZE} />}
      variables={{ partnerId, first: PAGE_SIZE, after: undefined }}
      render={({ error, props }) => {
        if (error || !props)
          return <PartnerArtistDetailsListPlaceholder count={PAGE_SIZE} />

        if (!props.partner) {
          return null
        }

        return (
          <PartnerArtistDetailsListPaginationContainer
            {...rest}
            partner={props.partner}
          />
        )
      }}
    />
  )
}
