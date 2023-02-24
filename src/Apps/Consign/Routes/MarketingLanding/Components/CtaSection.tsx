import { Button } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useSystemContext } from "System/SystemContext"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"

export const CtaSection: React.FC = () => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const enableSWAInquiryFlow = useFeatureFlag("swa-inquiry-flow")
  const getInTouchRoute = enableSWAInquiryFlow
    ? "/sell/inquiry"
    : "mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"

  const trackSubmitClick = () => {
    trackEvent({
      action: "clickedSubmitAnArtwork",
      context_module: "Bottom",
      context_page_owner_type: contextPageOwnerType,
      label: "Submit an Artwork",
      user_id: user?.id,
      destination_path: "/sell/submission",
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
        <Button
          // @ts-ignore
          as={RouterLink}
          variant="secondaryNeutral"
          onClick={trackGetInTouchClick}
          mt={2}
          width={"100%"}
          data-testid="get-in-touch-button"
          to={getInTouchRoute}
        >
          Get in Touch
        </Button>
      </AppContainer>
    </Media>
  )
}
