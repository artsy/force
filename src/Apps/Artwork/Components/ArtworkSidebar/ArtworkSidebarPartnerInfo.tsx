import { Box, Button, Flex, Separator, Text } from "@artsy/palette"
import { limitWithCount } from "Apps/Artwork/Utils/limitWithCount"
import { createFragmentContainer, graphql } from "react-relay"
import { FC } from "react"
import { ArtworkSidebarPartnerInfo_artwork$data } from "__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"
import { RouterLink } from "System/Router/RouterLink"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { useFeatureFlag } from "System/useFeatureFlag"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import styled from "styled-components"

export interface ArtworkSidebarPartnerInfoProps {
  artwork: ArtworkSidebarPartnerInfo_artwork$data
}

const PartnerContainer = styled(Box)`
  word-break: break-word;
`

export const ArtworkSidebarPartnerInfo: FC<ArtworkSidebarPartnerInfoProps> = ({
  artwork,
}) => {
  const {
    sale,
    partner,
    internalID,
    slug,
    isInquireable,
    is_in_auction,
  } = artwork

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
      context_module: DeprecatedAnalyticsSchema.ContextModule.Sidebar,
      action_type: DeprecatedAnalyticsSchema.ActionType.ClickedContactGallery,
      subject: DeprecatedAnalyticsSchema.Subject.ContactGallery,
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

        {isCBNEnabled &&
          !isInquireable &&
          !is_in_auction &&
          partner?.partnerType !== "Institution" && (
            <Button
              variant="secondaryBlack"
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
        is_in_auction: isInAuction
        partner {
          name
          href
          cities
          partnerType
        }
        sale {
          name
          href
        }
      }
    `,
  }
)
