import { useState } from "react"
import * as React from "react"
import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworksRail_partner } from "v2/__generated__/ArtworksRail_partner.graphql"
import { flatten } from "lodash"
import { Carousel } from "../Carousel"
import { useSystemContext } from "v2/System"
import { ArtworksRailRendererQuery } from "v2/__generated__/ArtworksRailRendererQuery.graphql"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ScrollToPartnerHeader } from "../ScrollToPartnerHeader"
import { ArtworksRailPlaceholder } from "./ArtworkRailPlaceholder"
import { ViewAllButton } from "./ViewAllButton"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

interface ArtworksRailProps extends BoxProps {
  partner: ArtworksRail_partner
}

export const ARTWORK_CAROUSEL_ITEM_HEIGHT = 300

const ArtworksRail: React.FC<ArtworksRailProps> = ({ partner, ...rest }) => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const [isSeeAllAvaliable, setIsSeeAllAvaliable] = useState<boolean>(undefined)

  if (
    !partner ||
    !partner.filterArtworksConnection?.edges ||
    partner.filterArtworksConnection.edges.length === 0
  )
    return null

  const {
    slug,
    filterArtworksConnection: { edges: artworks },
  } = partner

  return (
    <Box {...rest}>
      <Flex
        mb={4}
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Text variant="title">Featured Artworks</Text>

        <ViewAllButton to={`/partner/${slug}/works`} />
      </Flex>

      <Carousel onRailOverflowChange={setIsSeeAllAvaliable}>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        {flatten([
          artworks.map(artwork => {
            return (
              <FillwidthItem
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                key={artwork.node.id}
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                artwork={artwork.node}
                imageHeight={ARTWORK_CAROUSEL_ITEM_HEIGHT}
                hidePartnerName
                lazyLoad
              />
            )
          }),
          isSeeAllAvaliable && (
            <Box key="see-all-button" width={[300, "100%"]}>
              <RouterLink to={`/partner/${slug}/works`}>
                <ScrollToPartnerHeader width="100%">
                  <Box
                    bg="black10"
                    height={ARTWORK_CAROUSEL_ITEM_HEIGHT}
                    width={(ARTWORK_CAROUSEL_ITEM_HEIGHT / 3) * 4}
                  >
                    <Flex
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text style={{ textDecoration: "underline" }}>
                        See all artworks
                      </Text>
                    </Flex>
                  </Box>
                </ScrollToPartnerHeader>
              </RouterLink>
            </Box>
          ),
        ])}
      </Carousel>
    </Box>
  )
}

const ArtworksRailFragmentContainer = createFragmentContainer(ArtworksRail, {
  partner: graphql`
    fragment ArtworksRail_partner on Partner {
      slug
      filterArtworksConnection(
        first: 14
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
