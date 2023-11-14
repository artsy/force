import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import { ArtworkCreateAlertButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkCreateAlertButton"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarBiddingClosedMessage_artwork$data } from "__generated__/ArtworkSidebarBiddingClosedMessage_artwork.graphql"
import { ContextModule } from "@artsy/cohesion"
import { useFeatureFlag } from "System/useFeatureFlag"
import { ProgressiveOnboardingAlertCreateSimple } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreateSimple"
import { useAlert } from "Components/Alert"
import { compact } from "lodash"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebarBiddingClosedMessage_artwork$data
}

const BiddingClosedMessage: React.FC<BiddingClosedMessageProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  const newAlertModalEnabled = useFeatureFlag("onyx_artwork_alert_modal_v2")

  const { alertComponent, showAlert } = useAlert({
    initialCriteria: {
      attributionClass: compact([artwork.attributionClass?.internalID]),
      artistIDs: compact(artwork.artists).map(artist => artist.internalID),
      additionalGeneIDs: [artwork.mediumType?.filterGene?.slug as string],
    },
  })

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
          {newAlertModalEnabled ? (
            <>
              <ProgressiveOnboardingAlertCreateSimple>
                <CreateAlertButton
                  width="100%"
                  size="large"
                  onClick={showAlert}
                />
              </ProgressiveOnboardingAlertCreateSimple>
              {alertComponent}
            </>
          ) : (
            <ArtworkCreateAlertButtonFragmentContainer
              artwork={artwork}
              analyticsContextModule={ContextModule.artworkSidebar}
            />
          )}
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
        ...ArtworkCreateAlertButton_artwork
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
