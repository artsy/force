import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarBiddingClosedMessage_artwork$data } from "__generated__/ArtworkSidebarBiddingClosedMessage_artwork.graphql"
import { ProgressiveOnboardingAlertCreateSimple } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreateSimple"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebarBiddingClosedMessage_artwork$data
}

const BiddingClosedMessage: React.FC<BiddingClosedMessageProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Text variant="lg-display" color="black100">
        {t(`artworkPage.sidebar.auction.biddingClosed`)}
      </Text>

      {artwork.isEligibleToCreateAlert && (
        <>
          <Text variant="sm" color="black60" pt={0.5}>
            {t(`artworkPage.sidebar.createAlert.description`)}
          </Text>
          <Spacer y={2} />

          <ProgressiveOnboardingAlertCreateSimple>
            <CreateAlertButton width="100%" size="large" />
          </ProgressiveOnboardingAlertCreateSimple>
        </>
      )}
    </>
  )
}

export const ArtworkSidebarBiddingClosedMessageFragmentContainer = createFragmentContainer(
  BiddingClosedMessage,
  {
    artwork: graphql`
      fragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {
        isEligibleToCreateAlert
        artists {
          internalID
        }
        attributionClass {
          internalID
        }
        mediumType {
          filterGene {
            slug
          }
        }
      }
    `,
  }
)
