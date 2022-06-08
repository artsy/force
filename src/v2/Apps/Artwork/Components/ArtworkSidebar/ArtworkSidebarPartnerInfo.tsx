import { Box, Button, Flex, Separator, Text } from "@artsy/palette"
import { limitWithCount } from "v2/Apps/Artwork/Utils/limitWithCount"
import { createFragmentContainer, graphql } from "react-relay"
import { FC } from "react"
import { ArtworkSidebarPartnerInfo_artwork } from "v2/__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useInquiry } from "v2/Components/Inquiry/useInquiry"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { AnalyticsSchema, useTracking } from "v2/System/Analytics"
import styled from "styled-components"

export interface ArtworkSidebarPartnerInfoProps {
  artwork: ArtworkSidebarPartnerInfo_artwork
}

const PartnerContainer = styled(Box)`
  word-break: break-word;
`

export const ArtworkSidebarPartnerInfo: FC<ArtworkSidebarPartnerInfoProps> = ({
  artwork,
}) => {
  const { sale, partner, internalID, slug, isInquireable } = artwork

  const { showInquiry, inquiryComponent } = useInquiry({
    artworkID: internalID,
  })
  const isCBNEnabled = useFeatureFlag("conversational-buy-now")
  const { trackEvent } = useTracking()

  const renderPartnerName = () => {
    if (sale) {
      return (
        <Text variant="sm-display">
          <RouterLink to={sale.href ?? ""}>{sale.name}</RouterLink>
        </Text>
      )
    }

    if (!partner) {
      return null
    }

    return partner.href ? (
      <Text variant="sm-display">
        <RouterLink to={partner.href}>{partner.name}</RouterLink>
      </Text>
    ) : (
      <Text variant="sm-display">{partner.name}</Text>
    )
  }

  const handleInquiry = () => {
    trackEvent({
      context_module: AnalyticsSchema.ContextModule.Sidebar,
      action_type: AnalyticsSchema.ActionType.ClickedContactGallery,
      subject: AnalyticsSchema.Subject.ContactGallery,
      artwork_id: internalID,
      artwork_slug: slug,
    })
    showInquiry()
  }

  return (
    <>
      <Separator my={2} />
      <Flex justifyContent="space-between">
        <PartnerContainer>
          {renderPartnerName()}
          {partner?.cities && partner.cities.length > 0 && (
            <Text variant="xs" color="black60" mt={0.5}>
              {limitWithCount(partner.cities as string[], 2).join(", ")}
            </Text>
          )}
        </PartnerContainer>

        {isCBNEnabled && !isInquireable && (
          <Button
            variant="secondaryOutline"
            size="small"
            onClick={handleInquiry}
            ml={1}
          >
            Contact Gallery
          </Button>
        )}

        {inquiryComponent}
      </Flex>
    </>
  )
}

export const ArtworkSidebarPartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarPartnerInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
        internalID
        slug
        isInquireable
        partner {
          name
          href
          cities
        }
        sale {
          name
          href
        }
      }
    `,
  }
)
