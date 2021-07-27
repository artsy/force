import { recordArtworkView } from "lib/components/record_artwork_view"
import { data as sd } from "sharify"
import { getContextPageFromClient } from "lib/getContextPage"
import { OwnerType } from "@artsy/cohesion"
import { mediator } from "lib/mediator"
import type {
  ArtworkEventOptions,
  BuyerPremiumEventOptions,
} from "lib/mediator"

export const legacyAssetDll = () => {
  const User = require("desktop/models/user.coffee")
  const Artwork = require("desktop/models/artwork.coffee")
  const ArtworkInquiry = require("desktop/models/artwork_inquiry.coffee")
  const openInquiryQuestionnaireFor = require("desktop/components/inquiry_questionnaire/index.coffee")
  const openAuctionBuyerPremium = require("desktop/components/artworkBuyersPremium/index.coffee")
  const openMultiPageModal = require("desktop/components/multi_page_modal/index.coffee")

  require("jquery.transition")
  require("typeahead.js/dist/typeahead.bundle.min.js")
  const $ = require("jquery")
  const imagesLoaded = require("imagesloaded")
  const jqueryFillwidthLite = require("jquery-fillwidth-lite")

  imagesLoaded.makeJQueryPlugin($)
  jqueryFillwidthLite($, window._, imagesLoaded)

  const { pageType, pageSlug } = getContextPageFromClient()

  if (pageType === OwnerType.artwork) {
    recordArtworkView(pageSlug, sd.CURRENT_USER)
  }

  const openInquireableModal = (
    artworkId: string,
    { ask_specialist },
    artworkOptions = {}
  ) => {
    if (!artworkId) return
    const user = User.instantiate()
    const inquiry = new ArtworkInquiry({ notification_delay: 600 })
    const artwork = new Artwork({ id: artworkId })

    // TODO: Look into why this is needed.
    $.ajaxSettings.headers = {
      "X-ACCESS-TOKEN":
        sd.CURRENT_USER != null ? sd.CURRENT_USER.accessToken : undefined,
      "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
    }
    artwork.fetch().then(() => {
      artwork.set(artworkOptions)
      openInquiryQuestionnaireFor({
        artwork,
        ask_specialist,
        inquiry,
        user,
      })
    })
  }

  mediator.on("launchInquiryFlow", (options: ArtworkEventOptions) => {
    openInquireableModal(options.artworkId, { ask_specialist: false })
  })

  mediator.on(
    "openBuyNowAskSpecialistModal",
    (options: ArtworkEventOptions) => {
      openInquireableModal(options.artworkId, { ask_specialist: true })
    }
  )

  mediator.on(
    "openAuctionAskSpecialistModal",
    (options: ArtworkEventOptions) => {
      openInquireableModal(
        options.artworkId,
        { ask_specialist: true },
        { is_in_auction: true }
      )
    }
  )

  mediator.on("openOrdersContactArtsyModal", (options: ArtworkEventOptions) => {
    openInquireableModal(options.artworkId, { ask_specialist: true })
  })

  mediator.on("openCollectorFAQModal", () => {
    openMultiPageModal("collector-faqs")
  })

  mediator.on("openAuctionFAQModal", () => {
    openMultiPageModal("auction-faqs")
  })

  mediator.on(
    "openAuctionBuyerPremium",
    ({ auctionId }: BuyerPremiumEventOptions) => {
      $.ajaxSettings.headers = {
        "X-ACCESS-TOKEN":
          sd.CURRENT_USER != null ? sd.CURRENT_USER.accessToken : undefined,
        "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
      }

      openAuctionBuyerPremium(auctionId)
    }
  )
}
