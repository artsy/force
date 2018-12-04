const { intercom } = require("./components/intercom/index")
import { data as sd } from "sharify"

export function enableIntercom({ is_offerable, is_acquireable }) {
  const {
    INTERCOM_BUYER_ENABLED,
    INTERCOM_BUYER_APP_ID,
    INTERCOM_BUYER_HASH,
    CURRENT_USER,
  } = sd

  // Should the user, if logged-in, see the Intercom widget?
  const hasIntercomLabFeature =
    CURRENT_USER &&
    CURRENT_USER.lab_features &&
    CURRENT_USER.lab_features.includes("Intercom on BNMO Works")
  const hasIntercomQueryParam = window.location.search.includes("showIntercom")
  const shouldUserSeeIntercom = hasIntercomLabFeature || hasIntercomQueryParam

  // Is Intercom enablbed? Is the work eligible for Intercom?
  const intercomEnabled = INTERCOM_BUYER_ENABLED && INTERCOM_BUYER_APP_ID
  const isCommercialWork = is_acquireable || is_offerable

  if (isCommercialWork && intercomEnabled && shouldUserSeeIntercom) {
    if (CURRENT_USER) {
      const userData = {
        name: CURRENT_USER.name,
        email: CURRENT_USER.email,
        userHash: INTERCOM_BUYER_HASH,
      }
      intercom(INTERCOM_BUYER_APP_ID, userData)
    } else {
      intercom(INTERCOM_BUYER_APP_ID)
    }
  }
}
