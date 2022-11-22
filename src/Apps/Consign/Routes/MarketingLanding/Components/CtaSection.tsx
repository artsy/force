import { Button } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"

export const CtaSection: React.FC = () => {
  const { trackEvent } = useTracking()
  const showGetInTouchCTA = useFeatureFlag("get-in-touch-flow-web")
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()

  const trackSubmitClick = () => {
    trackEvent({
      action: "clickedSubmitAnArtwork",
      context_module: "Bottom",
      context_page_owner_type: contextPageOwnerType,
      label: "Submit an Artwork",
      user_id: user?.id,
      destination_path: "/sell/submission/artwork-details",
    })
  }

  const trackGetInTouchClick = () => {
    trackEvent({
      action: "clickedGetInTouch",
      context_module: "Bottom",
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  return (
    <Media at="xs">
      <AppContainer px={2}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to="/sell/submission"
          onClick={trackSubmitClick}
          width={"100%"}
          data-testid="submit-artwork-button"
        >
          Submit an Artwork
        </Button>
        {showGetInTouchCTA && (
          <Button
            // @ts-ignore
            as={RouterLink}
            variant="secondaryNeutral"
            onClick={trackGetInTouchClick}
            mt={2}
            width={"100%"}
            data-testid="get-in-touch-button"
            to="mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"
          >
            Get in Touch
          </Button>
        )}
      </AppContainer>
    </Media>
  )
}
