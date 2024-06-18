import { Box, Button, Flex, Text } from "@artsy/palette"
import { limitWithCount } from "Apps/Artwork/Utils/limitWithCount"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { ArtworkSidebarPartnerInfo_artwork$data } from "__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { themeGet } from "@styled-system/theme-get"

interface ArtworkSidebarPartnerInfoProps {
  artwork: ArtworkSidebarPartnerInfo_artwork$data
}

interface PartnerNameProps {
  partner: ArtworkSidebarPartnerInfoProps["artwork"]["partner"]
  sale: ArtworkSidebarPartnerInfoProps["artwork"]["sale"]
  handlePartnerNameClick: any
}

const PartnerContainer = styled(Box)`
  word-break: break-word;
`

const StyledPartnerLink = styled(RouterLink)`
  color: ${themeGet("colors.black100")};

  &:hover {
    text-decoration: underline;
  }
`

const ArtworkSidebarPartnerInfo: React.FC<ArtworkSidebarPartnerInfoProps> = ({
  artwork,
}) => {
  const { internalID, partner, sale, slug, isInquireable, isUnlisted } = artwork

  const { t } = useTranslation()
  const { trackEvent } = useTracking()

  const { showInquiry, inquiryComponent } = useInquiry({
    artworkID: internalID,
  })

  const shouldRenderContactGalleryCTA =
    !isInquireable && !!partner?.isInquireable

  const handleInquiry = () => {
    trackEvent({
      context_module: DeprecatedAnalyticsSchema.ContextModule.Sidebar,
      action_type: DeprecatedAnalyticsSchema.ActionType.ClickedContactGallery,
      subject: DeprecatedAnalyticsSchema.Subject.ContactGallery,
      artwork_id: internalID,
      artwork_slug: slug,
    })
    showInquiry({ enableCreateAlert: true })
  }

  const handlePartnerNameClick = () => {
    if (isUnlisted) {
      trackEvent({
        action: "Click",
        context_module: "Sidebar",
        subject: "Gallery Name",
        type: "Link",
        flow: "Exclusive Access",
      })
    }
  }

  const hasCities = partner?.cities && partner.cities.length > 0

  if (!partner) {
    return null
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <PartnerContainer>
          <PartnerName
            partner={partner}
            sale={sale}
            handlePartnerNameClick={handlePartnerNameClick}
          />
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

const PartnerName: React.FC<PartnerNameProps> = ({
  partner,
  sale,
  handlePartnerNameClick,
}) => {
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
      <StyledPartnerLink
        textDecoration="none"
        to={partner.href}
        onClick={handlePartnerNameClick}
      >
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
        isUnlisted
        partner {
          name
          href
          cities
          isInquireable
        }
        sale {
          name
          href
        }
      }
    `,
  }
)
