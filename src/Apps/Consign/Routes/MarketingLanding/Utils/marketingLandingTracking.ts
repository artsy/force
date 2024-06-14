import { ActionType } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"

export const useMarketingLandingTracking = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const trackStartSellingClick = (contextModule: string) => {
    trackEvent({
      action: ActionType.tappedConsign,
      context_module: contextModule, // not importing the name from cohesion as a exeption, should NOT be done in other places
      // the reason is that in cohesion the modult is maned "header"
      // we use "Header" with capital letter for analyticks already and we do not want to intrpduce another name
      context_page_owner_type: contextPageOwnerType,
      label: "Start Selling",
      destination_path: "/sell/submission",
      user_id: user?.id,
    })
  }

  const trackGetInTouchClick = () => {
    trackEvent({
      action: ActionType.tappedConsignmentInquiry,
      context_module: "Header", // not importing the name from cohesion as a exeption, should NOT be done in other places
      // the reason is that in cohesion the modult is maned "header"
      // we use "Header" with capital letter for analyticks already and we do not want to intrpduce another name
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  return { trackStartSellingClick, trackGetInTouchClick }
}
