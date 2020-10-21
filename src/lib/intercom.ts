const { intercom } = require("./components/intercom/index")
import { data as sd } from "sharify"
import { IntercomEventOptions } from "typings/mediator"

// We show an Intercom chat widget on artwork pages where the
// artwork is commercial (offerable or acquireable).

export function enableIntercom({
  is_offerable,
  is_acquireable,
}: IntercomEventOptions) {
  const {
    INTERCOM_BUYER_ENABLED,
    INTERCOM_BUYER_APP_ID,
    INTERCOM_BUYER_HASH,
    CURRENT_USER,
  } = sd

  const intercomEnabled = INTERCOM_BUYER_ENABLED && INTERCOM_BUYER_APP_ID
  const isCommercialWork = is_acquireable || is_offerable

  if (isCommercialWork && intercomEnabled) {
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
