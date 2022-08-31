import { Flex, Separator, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2ArtistsFragmentContainer } from "./ArtworkSidebar2Artists"
import { ArtworkSidebar2_artwork } from "__generated__/ArtworkSidebar2_artwork.graphql"
import { ArtworkSidebar2ShippingInformationFragmentContainer } from "./ArtworkSidebar2ShippingInformation"
import { SidebarExpandable } from "Components/Artwork/SidebarExpandable"
import { useTranslation } from "react-i18next"

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
      <Flex flexDirection="row">
        <Text color="black60" variant="lg-display" fontStyle="italic">
          {artwork.title}
        </Text>
        <Text color="black60" variant="lg-display">
          , {artwork.date}
        </Text>
      </Flex>
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
        title
        date
        isAcquireable
        isOfferable
        ...ArtworkSidebar2Artists_artwork
        ...ArtworkSidebar2ShippingInformation_artwork
      }
    `,
  }
)
