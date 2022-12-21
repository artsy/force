import { Box, Button, Flex, Text } from "@artsy/palette"
import { limitWithCount } from "Apps/Artwork/Utils/limitWithCount"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { ArtworkSidebarPartnerInfo_artwork$data } from "__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useFeatureFlag } from "System/useFeatureFlag"
import { themeGet } from "@styled-system/theme-get"

interface ArtworkSidebarPartnerInfoProps {
  artwork: ArtworkSidebarPartnerInfo_artwork$data
}

interface PartnerNameProps {
  partner: ArtworkSidebarPartnerInfoProps["artwork"]["partner"]
  sale: ArtworkSidebarPartnerInfoProps["artwork"]["sale"]
}

const PartnerContainer = styled(Box)`
  word-break: break-word;
`

const StyledPartnerLink = styled(RouterLink)`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: ${themeGet("colors.black100")};

  &:hover {
    text-decoration: underline;
  }
`

const ArtworkSidebarPartnerInfo: React.FC<ArtworkSidebarPartnerInfoProps> = ({
  artwork,
}) => {
  const {
    internalID,
    isInAuction,
    isInquireable,
    isAcquireable,
    isOfferable,
    partner,
    sale,
    slug,
  } = artwork

  const { t } = useTranslation()
  const { trackEvent } = useTracking()
  const isCBNEnabled = useFeatureFlag("conversational-buy-now")
  const artworkEcommerceAvailable = isAcquireable || isOfferable
  const shouldRenderContactGalleryCTA =
    isCBNEnabled && !isInquireable && !isInAuction && artworkEcommerceAvailable

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

        {shouldRenderContactGalleryCTA && (
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
        <StyledPartnerLink textDecoration="none" to={sale.href ?? ""}>
          {sale.name}
        </StyledPartnerLink>
      </Text>
    )
  }

  if (!partner) {
    return null
  }

  return partner.href ? (
    <Text variant="sm-display">
      <StyledPartnerLink textDecoration="none" to={partner.href}>
        {partner.name}
      </StyledPartnerLink>
    </Text>
  ) : (
    <Text variant="sm-display">{partner.name}</Text>
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
        isInAuction
        isAcquireable
        isOfferable
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
