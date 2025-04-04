import { Box, type BoxProps, Flex, Text } from "@artsy/palette"
import { PartnerArtistsQueryRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistList/PartnerArtists"
import { PartnerArtistsCarouselRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistsCarousel/PartnerArtistsCarousel"
import type { ArtistsRail_partner$data } from "__generated__/ArtistsRail_partner.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewAllButton } from "./ViewAllButton"

interface ArtistsRailProps extends BoxProps {
  partner: ArtistsRail_partner$data
}

const ArtistsRail: React.FC<React.PropsWithChildren<ArtistsRailProps>> = ({
  partner,
  ...rest
}) => {
  if (!partner) {
    return null
  }

  const {
    slug,
    profileArtistsLayout,
    displayFullPartnerPage,
    artistsWithPublishedArtworks,
    representedArtistsWithoutPublishedArtworks,
  } = partner

  const artistsWithPublishedArtworksTotalCount =
    artistsWithPublishedArtworks?.totalCount || 0
  const representedWithoutPublishedArtworksTotalCount =
    representedArtistsWithoutPublishedArtworks?.totalCount || 0

  const isCarouselRender =
    profileArtistsLayout === "Grid" && displayFullPartnerPage

  if (
    isCarouselRender
      ? !artistsWithPublishedArtworksTotalCount
      : !artistsWithPublishedArtworksTotalCount &&
        !representedWithoutPublishedArtworksTotalCount
  ) {
    return null
  }

  return (
    <Box {...rest}>
      <Flex
        mb={6}
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Text variant="lg-display">
          {profileArtistsLayout === "Grid" ? "Featured Artists" : "Artists"}
        </Text>

        {displayFullPartnerPage && (
          <ViewAllButton to={`/partner/${slug}/artists`} />
        )}
      </Flex>

      {isCarouselRender ? (
        <PartnerArtistsCarouselRenderer partnerId={slug} />
      ) : (
        <PartnerArtistsQueryRenderer partnerId={slug} />
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
        displayFullPartnerPage
        artistsWithPublishedArtworks: artistsConnection(
          hasPublishedArtworks: true
          displayOnPartnerProfile: true
        ) {
          totalCount
        }
        representedArtistsWithoutPublishedArtworks: artistsConnection(
          representedBy: true
          hasPublishedArtworks: false
          displayOnPartnerProfile: true
        ) {
          totalCount
        }
      }
    `,
  },
)
