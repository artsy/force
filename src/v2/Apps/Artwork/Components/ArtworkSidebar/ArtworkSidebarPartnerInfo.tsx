import {
  Box,
  Button,
  Flex,
  LocationIcon,
  Separator,
  Text,
} from "@artsy/palette"
import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import { createFragmentContainer, graphql } from "react-relay"
import { FC } from "react"
import { ArtworkSidebarPartnerInfo_artwork } from "v2/__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useInquiry } from "v2/Components/Inquiry/useInquiry"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

export interface ArtworkSidebarPartnerInfoProps {
  artwork: ArtworkSidebarPartnerInfo_artwork
}

export const ArtworkSidebarPartnerInfo: FC<ArtworkSidebarPartnerInfoProps> = ({
  artwork,
}) => {
  const {
    sale,
    partner,
    internalID,
    isOfferable,
    isInquireable,
    isPriceRange,
  } = artwork

  const { showInquiry, inquiryComponent } = useInquiry({
    artworkID: internalID,
  })
  const isCBNEnabled = useFeatureFlag("conversational-buy-now")

  const shouldRenderInquiryButton =
    isCBNEnabled &&
    (!isInquireable || (isInquireable && isOfferable && isPriceRange))

  const renderPartnerName = () => {
    if (sale) {
      return (
        <Text variant="md">
          <RouterLink to={sale.href ?? ""}>{sale.name}</RouterLink>
        </Text>
      )
    }

    if (!partner) {
      return null
    }

    return partner.href ? (
      <Text variant="md">
        <RouterLink to={partner.href}>{partner.name}</RouterLink>
      </Text>
    ) : (
      <Text variant="md">{partner.name}</Text>
    )
  }

  const locationNames =
    artwork &&
    partner &&
    partner.locations &&
    partner.locations.length > 0 &&
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    filterLocations(partner.locations)

  return (
    <>
      <Separator my={2} />
      <Flex justifyContent="space-between">
        <Box>
          {renderPartnerName()}
          {locationNames && locationNames.length > 0 && (
            <Flex mt={1}>
              <LocationIcon />
              <Flex flexDirection="column">
                <Text variant="xs" color="black60" pl={1}>
                  {locationNames.join(", ")}
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>

        {shouldRenderInquiryButton && (
          <Button
            variant="secondaryOutline"
            size="small"
            onClick={() => showInquiry()}
          >
            Contact Gallery
          </Button>
        )}

        {inquiryComponent}
      </Flex>
      <Separator my={2} />
    </>
  )
}

export const ArtworkSidebarPartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarPartnerInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
        internalID
        isOfferable
        isInquireable
        isPriceRange
        partner {
          name
          href
          locations {
            city
          }
        }
        sale {
          name
          href
        }
      }
    `,
  }
)
