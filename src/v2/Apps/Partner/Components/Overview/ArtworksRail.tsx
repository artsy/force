import * as React from "react"
import { Box, BoxProps, Flex, Shelf, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworksRail_partner } from "v2/__generated__/ArtworksRail_partner.graphql"
import { useSystemContext } from "v2/System"
import { ArtworksRailRendererQuery } from "v2/__generated__/ArtworksRailRendererQuery.graphql"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { ArtworksRailPlaceholder } from "./ArtworkRailPlaceholder"
import { ViewAllButton } from "./ViewAllButton"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"

interface ArtworksRailProps extends BoxProps {
  partner: ArtworksRail_partner
}

export const ARTWORK_CAROUSEL_ITEM_HEIGHT = 300

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
        <Text variant="lg">Featured Artworks</Text>

        <ViewAllButton to={`/partner/${slug}/works`} />
      </Flex>

      <Shelf alignItems="flex-start">
        {artworks.map(artwork => {
          return (
            <FillwidthItem
              // @ts-ignore TODO: Add relevant contextModule
              contextModule={null}
              key={artwork.id}
              artwork={artwork}
              imageHeight={ARTWORK_CAROUSEL_ITEM_HEIGHT}
              hidePartnerName
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
            id
            ...FillwidthItem_artwork
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
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtworksRailRendererQuery>
      lazyLoad
      environment={relayEnvironment}
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
