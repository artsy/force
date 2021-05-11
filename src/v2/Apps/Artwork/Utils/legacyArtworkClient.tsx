import { recordArtworkView } from "lib/components/record_artwork_view"
import { data as sd } from "sharify"
import { getContextPageFromClient } from "lib/getContextPage"
import { OwnerType } from "@artsy/cohesion"
import { mediator } from "lib/mediator"
import type {
  ArtworkEventOptions,
  BuyerPremiumEventOptions,
  ViewInRoomEventOptions,
} from "lib/mediator"

export const legacyArtworkClient = () => {
  const User = require("desktop/models/user.coffee")
  const Artwork = require("desktop/models/artwork.coffee")
  const ArtworkInquiry = require("desktop/models/artwork_inquiry.coffee")
  const openInquiryQuestionnaireFor = require("desktop/components/inquiry_questionnaire/index.coffee")
  const openAuctionBuyerPremium = require("desktop/components/artworkBuyersPremium/index.coffee")
  const ViewInRoomView = require("desktop/components/view_in_room/view.coffee")
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

  mediator.on("openCollectorFAQModal", () => {
    openMultiPageModal("collector-faqs")
  })

  mediator.on("openAuctionFAQModal", () => {
    openMultiPageModal("auction-faqs")
  })

  mediator.on("openViewInRoom", (options: ViewInRoomEventOptions) => {
    try {
      const { dimensions, image } = options
      // @ts-expect-error STRICT_NULL_CHECK
      const { url, width, height } = image

      let newWidth = width
      let newHeight = height

      // @ts-expect-error STRICT_NULL_CHECK
      const bounds = document
        .querySelector("[data-is-default=true]")
        .getBoundingClientRect()

      const imgRatio = newWidth / newHeight
      const boundsRatio = bounds.width / bounds.height

      if (boundsRatio > imgRatio) {
        newHeight = bounds.height
        newWidth = (newHeight * width) / height
      } else if (boundsRatio < imgRatio) {
        newWidth = bounds.width
        newHeight = (height * newWidth) / width
      } else {
        newWidth = bounds.width
        newHeight = newWidth
      }

      const newLeft = (bounds.width - newWidth) / 2 + bounds.left
      const newTop = bounds.top + Math.abs(bounds.height - newHeight) / 2

      const positionStyles = {
        height: `${newHeight}px`,
        left: `${newLeft}px`,
        position: "absolute",
        top: `${newTop}px`,
        width: `${newWidth}px`,
      }

      const viewInRoom = new ViewInRoomView({
        dimensions: dimensions.cm,
        imgSelector: "[data-type=artwork-image]",
        imgUrl: url,
        positionStyles: positionStyles,
      })

      $("body").prepend(viewInRoom.render().$el)
    } catch (error) {
      console.error(error)
    }
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
