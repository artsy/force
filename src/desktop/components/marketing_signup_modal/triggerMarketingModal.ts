import { data as sd } from "sharify"
import qs from "querystring"
import { findWhere } from "underscore"
import {
  handleScrollingAuthModal,
  openAuthModal,
} from "desktop/lib/openAuthModal"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"

export const triggerMarketingModal = (isScrolling?: boolean) => {
  const query = qs.parse(location.search.replace(/^\?/, ""))
  const isTargetCampaign = sd.CURRENT_PATH === sd.TARGET_CAMPAIGN_URL
  const slug = query["m-id"] || (isTargetCampaign && "ca3")
  const modalData = findWhere(sd.MARKETING_SIGNUP_MODALS, { slug: slug })

  if (sd.MARKETING_SIGNUP_MODALS && modalData && !sd.CURRENT_USER) {
    const { image, copy } = modalData
    const options = {
      copy,
      intent: "signup",
      destination: location.href,
      image,
    }

    if (isScrolling) {
      handleScrollingAuthModal(options)
    } else {
      openAuthModal(ModalType.signup, options)
    }
  }
}
