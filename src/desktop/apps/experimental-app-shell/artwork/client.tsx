import { enableIntercom } from "lib/intercom"
import { recordArtworkView } from "lib/components/record_artwork_view"
import { data as sd } from "sharify"

export const client = () => {
  const User = require("desktop/models/user.coffee")
  const Artwork = require("desktop/models/artwork.coffee")
  const ArtworkInquiry = require("desktop/models/artwork_inquiry.coffee")
  const openInquiryQuestionnaireFor = require("desktop/components/inquiry_questionnaire/index.coffee")
  const openAuctionBuyerPremium = require("desktop/apps/artwork/components/buyers_premium/index.coffee")
  const ViewInRoomView = require("desktop/components/view_in_room/view.coffee")
  const $ = require("jquery")
  const mediator = require("desktop/lib/mediator.coffee")

  const pageType = window.location.pathname.split("/")[1]

  if (pageType === "artwork") {
    const artworkSlug = location.pathname.replace(/\/artwork\//, "")
    recordArtworkView(artworkSlug, sd.CURRENT_USER)
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
      "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
      "X-ACCESS-TOKEN":
        sd.CURRENT_USER != null ? sd.CURRENT_USER.accessToken : undefined,
    }
    artwork.fetch().then(() => {
      artwork.set(artworkOptions)
      openInquiryQuestionnaireFor({
        user,
        artwork,
        inquiry,
        ask_specialist,
      })
    })
  }

  mediator.on("launchInquiryFlow", options => {
    openInquireableModal(options.artworkId, { ask_specialist: false })
  })

  mediator.on("openBuyNowAskSpecialistModal", options => {
    openInquireableModal(options.artworkId, { ask_specialist: true })
  })

  mediator.on("openAuctionAskSpecialistModal", options => {
    openInquireableModal(
      options.artworkId,
      { ask_specialist: true },
      { is_in_auction: true }
    )
  })

  mediator.on("openViewInRoom", options => {
    try {
      const { dimensions } = options
      const { url, width, height } = options.image

      let newWidth = width
      let newHeight = height

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
        position: "absolute",
        top: `${newTop}px`,
        left: `${newLeft}px`,
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      }

      const viewInRoom = new ViewInRoomView({
        imgSelector: "[data-type=artwork-image]",
        imgUrl: url,
        positionStyles: positionStyles,
        dimensions: dimensions.cm,
      })

      $("body").prepend(viewInRoom.render().$el)
    } catch (error) {
      // TODO: Add some proper error handling
    }
  })

  mediator.on("openAuctionBuyerPremium", options => {
    openAuctionBuyerPremium(options.auctionId)
  })

  mediator.on("enableIntercomForBuyers", options => {
    enableIntercom(options)
  })
}
