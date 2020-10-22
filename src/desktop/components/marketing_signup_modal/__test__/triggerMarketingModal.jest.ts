import { triggerMarketingModal } from "../triggerMarketingModal"
import { data as sd } from "sharify"
import { Intent } from "@artsy/cohesion"
import { mediator } from "lib/mediator"

jest.mock("querystring", () => ({
  parse: jest.fn().mockReturnValue({ "m-id": "ca12" }),
}))
const qs = require("querystring").parse as jest.Mock

jest.useFakeTimers()

describe("MarketingSignupModal", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
    // @ts-ignore
    window.addEventListener = jest.fn((_type, cb) => cb())
    sd.MARKETING_SIGNUP_MODALS = [
      {
        slug: "ca3",
        copy: "Discover Works from Art Fairs",
        image: "http://files.artsy.net/images/art.jpg",
      },
      {
        slug: "ca12",
        copy: "Buy Works from Art Fairs",
        image: "http://files.artsy.net/images/fair.jpg",
      },
    ]
  })

  afterEach(() => {
    delete sd.CURRENT_USER
    delete sd.TARGET_CAMPAIGN_URL
    delete sd.CURRENT_PATH
    delete sd.IS_MOBILE
    // @ts-ignore
    window.addEventListener.mockClear()
  })

  describe("#triggerMarketingModal", () => {
    it("does nothing if sd.MARKETING_SIGNUP_MODALS is not present", () => {
      delete sd.MARKETING_SIGNUP_MODALS
      triggerMarketingModal(Intent.viewFair)
      expect(mediator.trigger).not.toBeCalled()
    })

    it("does nothing if sd.CURRENT_USER is present", () => {
      sd.CURRENT_USER = { id: "567" }
      triggerMarketingModal(Intent.viewFair)
      expect(mediator.trigger).not.toBeCalled()
    })

    it("can parse modal data from slug/querystring", () => {
      triggerMarketingModal(Intent.viewFair)
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "bannerPopUp",
        copy: "Buy Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/fair.jpg",
        intent: "viewFair",
        mode: "signup",
      })
    })

    it("uses default modal data if querystring not present and TARGET_CAMPAIGN_URL", () => {
      qs.mockReturnValueOnce({})
      sd.TARGET_CAMPAIGN_URL = "fair-page"
      sd.CURRENT_PATH = "fair-page"
      triggerMarketingModal(Intent.viewFair)

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "bannerPopUp",
        copy: "Discover Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/art.jpg",
        intent: "viewFair",
        mode: "signup",
      })
    })

    it("calls scrollingMarketingModal if isScrolling is true", () => {
      triggerMarketingModal(Intent.viewFair, true)
      expect(window.addEventListener).toBeCalled()
      jest.runAllTimers()
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "popUpModal",
        copy: "Buy Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/fair.jpg",
        intent: "viewFair",
        mode: "signup",
        triggerSeconds: 2,
      })
    })

    it("calls staticMarketingModal if isScrolling is false", () => {
      triggerMarketingModal(Intent.viewFair)
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "bannerPopUp",
        copy: "Buy Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/fair.jpg",
        intent: "viewFair",
        mode: "signup",
      })
    })
  })
})
