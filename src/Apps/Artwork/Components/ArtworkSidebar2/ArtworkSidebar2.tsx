import { Flex, Separator, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2ArtistsFragmentContainer } from "./ArtworkSidebar2Artists"
import { ArtworkSidebar2_artwork } from "__generated__/ArtworkSidebar2_artwork.graphql"
import { ArtworkSidebar2ShippingInformationFragmentContainer } from "./ArtworkSidebar2ShippingInformation"
import { SidebarExpandable } from "Components/Artwork/SidebarExpandable"
import { useTranslation } from "react-i18next"
import { ArtworkSidebar2ArtworkTitleFragmentContainer } from "./ArtworkSidebar2ArtworkTitle"
import { ArtworkSidebar2DetailsFragmentContainer } from "./ArtworkSidebar2Details"
import { ArtworkSidebar2ArtsyGuarantee } from "./ArtworkSidebar2ArtsyGuarantee"
import { ArtworkSidebar2PartnerInfoFragmentContainer } from "./ArtworkSidebar2PartnerInfo"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar2_artwork
}

export const ArtworkSidebar2: React.FC<ArtworkSidebarProps> = props => {
  const { artwork } = props
  const { isSold, isAcquireable, isOfferable } = artwork

  const { t } = useTranslation()

  const artworkEcommerceAvailable = !!(isAcquireable || isOfferable)

  return (
    <Flex flexDirection="column">
      <ArtworkSidebar2ArtistsFragmentContainer artwork={artwork} />
      <ArtworkSidebar2ArtworkTitleFragmentContainer artwork={artwork} />

      <Spacer mt={2} />
      <ArtworkSidebar2DetailsFragmentContainer artwork={artwork} />
      <Spacer mt={2} />

      {!isSold && artworkEcommerceAvailable && (
        <>
          <Separator />
          <SidebarExpandable
            label={t`artworkPage.sidebar.shippingAndTaxes.expandableLabel`}
          >
            <ArtworkSidebar2ShippingInformationFragmentContainer
              artwork={artwork}
            />
          </SidebarExpandable>
        </>
      )}

      <Separator />
      <SidebarExpandable
        label={t`artworkPage.sidebar.artsyGuarantee.expandableLabel`}
      >
        <ArtworkSidebar2ArtsyGuarantee />
      </SidebarExpandable>

      <Separator />
      <Spacer mt={2} />

      <ArtworkSidebar2PartnerInfoFragmentContainer artwork={artwork} />

      <Spacer mt={2} />
      <Separator />
    </Flex>
  )
}

export const ArtworkSidebar2FragmentContainer = createFragmentContainer(
  ArtworkSidebar2,
  {
    artwork: graphql`
      fragment ArtworkSidebar2_artwork on Artwork {
        slug
        isSold
        isAcquireable
        isOfferable
        ...ArtworkSidebar2ArtworkTitle_artwork
        ...ArtworkSidebar2Artists_artwork
        ...ArtworkSidebar2Details_artwork
        ...ArtworkSidebar2ShippingInformation_artwork
        ...ArtworkSidebar2PartnerInfo_artwork
      }
    `,
  }
)
