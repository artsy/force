import { Box, Button, Flex, Text } from "@artsy/palette"
import { limitWithCount } from "Apps/Artwork/Utils/limitWithCount"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { ArtworkSidebar2PartnerInfo_artwork } from "__generated__/ArtworkSidebar2PartnerInfo_artwork.graphql"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useFeatureFlag } from "System/useFeatureFlag"

interface ArtworkSidebar2PartnerInfoProps {
  artwork: ArtworkSidebar2PartnerInfo_artwork
}

interface PartnerNameProps {
  partner: ArtworkSidebar2PartnerInfoProps["artwork"]["partner"]
  sale: ArtworkSidebar2PartnerInfoProps["artwork"]["sale"]
}

const PartnerContainer = styled(Box)`
  word-break: break-word;
`

const ArtworkSidebar2PartnerInfo: React.FC<ArtworkSidebar2PartnerInfoProps> = ({
  artwork,
}) => {
  const {
    internalID,
    isInAuction,
    isInquireable,
    partner,
    sale,
    slug,
  } = artwork

  const { t } = useTranslation()
  const { trackEvent } = useTracking()
  const isCBNEnabled = useFeatureFlag("conversational-buy-now")

  const { showInquiry, inquiryComponent } = useInquiry({
    artworkID: internalID,
  })

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

  const hasCities = partner?.cities && partner.cities.length > 0

  if (!partner) {
    return null
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <PartnerContainer>
          <PartnerName partner={partner} sale={sale} />
          {hasCities && (
            <Text variant="xs" color="black60">
              {limitWithCount(partner.cities as string[], 2).join(", ")}
            </Text>
          )}
        </PartnerContainer>

        {isCBNEnabled && !isInquireable && !isInAuction && (
          <Button size="small" variant="secondaryBlack" onClick={handleInquiry}>
            {t("artworkPage.sidebar.partner.contactGalleryCta")}
          </Button>
        )}

        {inquiryComponent}
      </Flex>
    </>
  )
}

const PartnerName: React.FC<PartnerNameProps> = ({ partner, sale }) => {
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

export const ArtworkSidebar2PartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebar2PartnerInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebar2PartnerInfo_artwork on Artwork {
        internalID
        slug
        isInquireable
        isInAuction
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
