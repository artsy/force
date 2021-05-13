import React from "react"
import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistsRail_partner } from "v2/__generated__/ArtistsRail_partner.graphql"
import {
  PartnerArtistsCarouselRenderer,
  PartnerArtistsRenderer,
} from "../PartnerArtists"
import { ViewAllButton } from "./ViewAllButton"

interface ArtistsRailProps {
  partner: ArtistsRail_partner
}

const ArtistsRail: React.FC<ArtistsRailProps> = ({ partner }) => {
  if (!partner) {
    return null
  }

  const { slug, profileArtistsLayout, fullProfileEligible } = partner

  return (
    <Box mt={4} mb={[4, 80]}>
      <Flex mb={6} justifyContent="space-between" alignItems="center">
        <Text variant="title">
          {profileArtistsLayout === "Grid" ? "Featured Artists" : "Artists"}
        </Text>

        {fullProfileEligible && (
          <ViewAllButton to={`/partner2/${slug}/artists`} />
        )}
      </Flex>

      {profileArtistsLayout === "Grid" && fullProfileEligible ? (
        <PartnerArtistsCarouselRenderer partnerId={slug} />
      ) : (
        <PartnerArtistsRenderer partnerId={slug} />
      )}
    </Box>
  )
}

export const ArtistsRailFragmentContainer = createFragmentContainer(
  ArtistsRail,
  {
    partner: graphql`
      fragment ArtistsRail_partner on Partner {
        slug
        profileArtistsLayout
        fullProfileEligible
      }
    `,
  }
)
