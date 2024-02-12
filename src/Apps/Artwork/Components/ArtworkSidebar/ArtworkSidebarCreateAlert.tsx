import { Flex, Separator, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarCreateAlert_artwork$data } from "__generated__/ArtworkSidebarCreateAlert_artwork.graphql"
import { useTranslation } from "react-i18next"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"

interface ArtworkSidebarCreateAlertProps {
  artwork: ArtworkSidebarCreateAlert_artwork$data
}

const ArtworkSidebarCreateAlert: React.FC<ArtworkSidebarCreateAlertProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  if (!artwork.isEligibleToCreateAlert) return null

  return (
    <>
      <Separator />
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        // FIXME: Remove
        my={2}
      >
        <Text variant="xs" mr={2}>
          {t("artworkPage.sidebar.createAlert.description")}
        </Text>
        <CreateAlertButton />
      </Flex>
    </>
  )
}

export const ArtworkSidebarCreateAlertFragmentContainer = createFragmentContainer(
  ArtworkSidebarCreateAlert,
  {
    artwork: graphql`
      fragment ArtworkSidebarCreateAlert_artwork on Artwork {
        internalID
        title
        slug
        isEligibleToCreateAlert
        artists {
          internalID
          name
          slug
        }
        attributionClass {
          internalID
        }
        mediumType {
          filterGene {
            slug
            name
          }
        }
      }
    `,
  }
)
