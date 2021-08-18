import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistConsignButton_artist } from "v2/__generated__/ArtistConsignButton_artist.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { BorderBox, Box, Button, Image, Text } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "v2/System"
import { Media } from "v2/Utils/Responsive"

export interface ArtistConsignButtonProps {
  artist: ArtistConsignButton_artist
}

export const ArtistConsignButton: React.FC<ArtistConsignButtonProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  const trackGetStartedClick = ({ destinationPath }) => {
    tracking.trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.ArtistConsignment,
      context_page: AnalyticsSchema.PageName.ArtistPage,
      context_page_owner_id: artist.internalID,
      context_page_owner_slug: artist.slug,
      context_page_owner_type: AnalyticsSchema.OwnerType.Artist,
      destination_path: destinationPath,
      subject: AnalyticsSchema.Subject.GetStarted,
    })
  }

  const { targetSupply, href, name, image } = artist

  const showImage =
    !!image && (targetSupply?.isInMicrofunnel || targetSupply?.isTargetSupply)

  const headline = targetSupply?.isInMicrofunnel
    ? `Sell your ${name}`
    : "Sell art from your collection"

  const consignURL = targetSupply?.isInMicrofunnel
    ? `${href}/consign`
    : "/consign"

  return (
    <BorderBox
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      p={1}
    >
      <RouterLink
        to={consignURL}
        textDecoration="none"
        display="flex"
        alignItems="center"
        flex={1}
        onClick={() => {
          trackGetStartedClick({
            destinationPath: consignURL,
          })
        }}
      >
        {showImage && (
          <Image
            src={image?.cropped?.src}
            srcSet={image?.cropped?.srcSet}
            alt={headline}
            width={50}
            height={50}
            lazyLoad
            mr={1}
          />
        )}

        <Text variant={["xs", "xs", "sm"]}>
          {headline}
          <Box color="black60">Consign with Artsy</Box>
        </Text>
      </RouterLink>

      <Media greaterThanOrEqual="md">
        <Button variant="secondaryGray">Get started</Button>
      </Media>

      <Media lessThan="md">
        <Button variant="secondaryGray" size="small">
          Get started
        </Button>
      </Media>
    </BorderBox>
  )
}

export const ArtistConsignButtonFragmentContainer = createFragmentContainer(
  ArtistConsignButton,
  {
    artist: graphql`
      fragment ArtistConsignButton_artist on Artist {
        targetSupply {
          isInMicrofunnel
          isTargetSupply
        }
        internalID
        slug
        name
        href
        image {
          cropped(width: 50, height: 50) {
            src
            srcSet
          }
        }
      }
    `,
  }
)
