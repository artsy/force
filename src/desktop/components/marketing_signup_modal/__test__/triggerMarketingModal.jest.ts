import {
  scrollingMarketingModal,
  staticMarketingModal,
  triggerMarketingModal,
} from "../triggerMarketingModal"
import { data as sd } from "sharify"

jest.mock("desktop/lib/mediator.coffee", () => ({
  trigger: jest.fn(),
}))
const mediator = require("desktop/lib/mediator.coffee").trigger as jest.Mock

jest.mock("querystring", () => ({
  parse: jest.fn().mockReturnValue({ "m-id": "ca12" }),
}))
const qs = require("querystring").parse as jest.Mock

jest.useFakeTimers()

describe("MarketingSignupModal", () => {
  beforeEach(() => {
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
    mediator.mockClear()
    // @ts-ignore
    window.addEventListener.mockClear()
  })

  describe("#triggerMarketingModal", () => {
    it("does nothing if sd.MARKETING_SIGNUP_MODALS is not present", () => {
      delete sd.MARKETING_SIGNUP_MODALS
      triggerMarketingModal()
      expect(mediator).not.toBeCalled()
    })

    it("does nothing if sd.CURRENT_USER is present", () => {
      sd.CURRENT_USER = { id: "567" }
      triggerMarketingModal()
      expect(mediator).not.toBeCalled()
    })

    it("can parse modal data from slug/querystring", () => {
      triggerMarketingModal()
      expect(mediator).toBeCalledWith("open:auth", {
        copy: "Buy Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/fair.jpg",
        intent: "signup",
        mode: "signup",
        signupIntent: "signup",
      })
    })

    it("uses default modal data if querystring not present and TARGET_CAMPAIGN_URL", () => {
      qs.mockReturnValueOnce({})
      sd.TARGET_CAMPAIGN_URL = "fair-page"
      sd.CURRENT_PATH = "fair-page"
      triggerMarketingModal()

      expect(mediator).toBeCalledWith("open:auth", {
        copy: "Discover Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/art.jpg",
        intent: "signup",
        mode: "signup",
        signupIntent: "signup",
      })
    })

    it("calls scrollingMarketingModal if isScrolling is true", () => {
      triggerMarketingModal(true)
      expect(window.addEventListener).toBeCalled()
      jest.runAllTimers()
      expect(mediator).toBeCalledWith("open:auth", {
        copy: "Buy Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/fair.jpg",
        intent: "signup",
        mode: "signup",
        signupIntent: "signup",
        trigger: "scroll",
        triggerSeconds: 2,
      })
    })

    it("calls staticMarketingModal if isScrolling is false", () => {
      triggerMarketingModal()
      expect(mediator).toBeCalledWith("open:auth", {
        copy: "Buy Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/fair.jpg",
        intent: "signup",
        mode: "signup",
        signupIntent: "signup",
      })
    })
  })

  describe("#scrollingMarketingModal", () => {
    it("calls the mediator with expected args", () => {
      scrollingMarketingModal({
        copy: "Discover Works from Art Fairs",
        image: "http://files.artsy.net/images/art.jpg",
      })
      expect(window.addEventListener).toBeCalled()
      jest.runAllTimers()

      expect(mediator).toBeCalledWith("open:auth", {
        copy: "Discover Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/art.jpg",
        intent: "signup",
        mode: "signup",
        signupIntent: "signup",
        trigger: "scroll",
        triggerSeconds: 2,
      })
    })

    it("does nothing if sd.IS_MOBILE", () => {
      sd.IS_MOBILE = true

      expect(window.addEventListener).not.toBeCalled()
      jest.runAllTimers()

      scrollingMarketingModal({
        copy: "Discover Works from Art Fairs",
        image: "http://files.artsy.net/images/art.jpg",
      })
      expect(mediator).not.toBeCalled()
    })
  })

  describe("#staticMarketingModal", () => {
    it("calls the mediator with expected args", () => {
      staticMarketingModal({
        copy: "Discover Works from Art Fairs",
        image: "http://files.artsy.net/images/art.jpg",
      })
      expect(mediator).toBeCalledWith("open:auth", {
        copy: "Discover Works from Art Fairs",
        destination: "https://artsy.net/",
        image: "http://files.artsy.net/images/art.jpg",
        intent: "signup",
        mode: "signup",
        signupIntent: "signup",
      })
    })
  })
})
