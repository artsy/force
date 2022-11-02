import * as React from "react"
import { Box, BoxProps, Flex, Shelf, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworksRail_partner$data } from "__generated__/ArtworksRail_partner.graphql"
import { ArtworksRailRendererQuery } from "__generated__/ArtworksRailRendererQuery.graphql"
import { ArtworksRailPlaceholder } from "./ArtworkRailPlaceholder"
import { ViewAllButton } from "./ViewAllButton"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"

interface ArtworksRailProps extends BoxProps {
  partner: ArtworksRail_partner$data
}

const ArtworksRail: React.FC<ArtworksRailProps> = ({ partner, ...rest }) => {
  if (
    !partner ||
    !partner.filterArtworksConnection?.edges ||
    partner.filterArtworksConnection.edges.length === 0
  )
    return null

  const { slug, filterArtworksConnection } = partner
  const artworks = extractNodes(filterArtworksConnection)

  return (
    <Box {...rest}>
      <Flex
        mb={4}
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Text variant="lg-display">Featured Artworks</Text>

        <ViewAllButton to={`/partner/${slug}/works`} />
      </Flex>

      <Shelf>
        {artworks.map(artwork => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.internalID}
              artwork={artwork}
              lazyLoad
            />
          )
        })}
      </Shelf>
    </Box>
  )
}

const ArtworksRailFragmentContainer = createFragmentContainer(ArtworksRail, {
  partner: graphql`
    fragment ArtworksRail_partner on Partner {
      slug
      filterArtworksConnection(
        first: 20
        sort: "-partner_updated_at"
        forSale: true
      ) {
        edges {
          node {
            ...ShelfArtwork_artwork
            internalID
          }
        }
      }
    }
  `,
})

export const ArtworksRailRenderer: React.FC<
  {
    partnerId: string
  } & Omit<ArtworksRailProps, "partner">
> = ({ partnerId, ...rest }) => {
  return (
    <SystemQueryRenderer<ArtworksRailRendererQuery>
      lazyLoad
      query={graphql`
        query ArtworksRailRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...ArtworksRail_partner
          }
        }
      `}
      placeholder={<ArtworksRailPlaceholder {...rest} count={15} />}
      variables={{ partnerId }}
      render={({ error, props }) => {
        if (error || !props)
          return <ArtworksRailPlaceholder {...rest} count={15} />

        return (
          <ArtworksRailFragmentContainer {...rest} partner={props.partner!} />
        )
      }}
    />
  )
}
