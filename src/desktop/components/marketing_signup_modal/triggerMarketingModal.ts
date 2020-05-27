import { data as sd } from "sharify"
import qs from "querystring"
import { findWhere } from "underscore"
import {
  handleScrollingAuthModal,
  openAuthModal,
} from "desktop/lib/openAuthModal"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"

export const triggerMarketingModal = (
  intent: Intent,
  isScrolling?: boolean
) => {
  const query = qs.parse(location.search.replace(/^\?/, ""))
  const isTargetCampaign = sd.CURRENT_PATH === sd.TARGET_CAMPAIGN_URL
  const slug = query["m-id"] || (isTargetCampaign && "ca3")
  const modalData = findWhere(sd.MARKETING_SIGNUP_MODALS, { slug: slug })

  if (sd.MARKETING_SIGNUP_MODALS && modalData && !sd.CURRENT_USER) {
    // FIXME: reaction migration
    // @ts-ignore
    const { image, copy } = modalData
    const options: ModalOptions = {
      copy,
      intent,
      destination: location.href,
      image,
      contextModule: isScrolling
        ? ContextModule.popUpModal
        : ContextModule.bannerPopUp,
    }

    if (isScrolling) {
      handleScrollingAuthModal(options)
    } else {
      openAuthModal(ModalType.signup, options)
    }
  }
}
