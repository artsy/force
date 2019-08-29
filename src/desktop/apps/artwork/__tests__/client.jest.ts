import Backbone from "backbone"
import { data as sd } from "sharify"
import { maybeRelaunchInquiryModalAfterAuth } from "../client"
const mediator = require("desktop/lib/mediator.coffee")

jest.mock("react-dom", () => ({
  hydrate: jest.fn(),
}))
jest.mock("desktop/components/inquiry_questionnaire/index.coffee", () =>
  jest.fn()
)

jest.mock("desktop/components/cookies/index.coffee", () => ({
  get: jest.fn(),
  expire: jest.fn(),
  set: jest.fn(),
}))
const mockCookies = require("desktop/components/cookies/index.coffee")
  .get as jest.Mock

const inquiryMock = require("desktop/components/inquiry_questionnaire/index.coffee")
const mediatorTriggerMock = jest.spyOn(mediator, "trigger")

require("../client")

describe("artwork client", () => {
  Backbone.sync = jest.fn()
  document.getElementById = jest.fn()

  beforeEach(() => {
    mockCookies.mockClear()
    mediatorTriggerMock.mockClear()
    inquiryMock.mockClear()
    Backbone.sync.mockImplementation(() => Promise.resolve())
  })

  describe("launching inquiry modal based on cookie", () => {
    describe("when user is not logged in", () => {
      describe("when cookie is set", () => {
        beforeEach(() => {
          mockCookies.mockReturnValue(1)
        })
        it("does not launch", async () => {
          await maybeRelaunchInquiryModalAfterAuth("pictures-of-percy")
          expect(inquiryMock.mock.calls.length).toBeFalsy()
        })
      })
      describe("when cookie is not set", () => {
        it("does not launch", async () => {
          await maybeRelaunchInquiryModalAfterAuth("pictures-of-percy")
          expect(inquiryMock.mock.calls.length).toBeFalsy()
        })
      })
    })
    describe("when user is logged in", () => {
      beforeEach(() => {
        sd.CURRENT_USER = {}
      })
      describe("when cookie is set", () => {
        beforeEach(() => {
          mockCookies.mockReturnValue(1)
        })
        it("launches", async () => {
          await maybeRelaunchInquiryModalAfterAuth("pictures-of-percy")
          expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
            "pictures-of-percy"
          )
        })
      })
    })
  })

  describe("Inquiry auth control", () => {
    beforeEach(() => {
      sd.INQUIRY_AUTH_V2 = "control"
    })

    describe("Contact gallery", () => {
      it("launchInquiryFlow does not trigger auth modal", async () => {
        await mediator.trigger("launchInquiryFlow", {
          artworkId: "chip-hughes-stripes",
        })
        expect(mediatorTriggerMock).toBeCalledTimes(1)
        expect(mediatorTriggerMock).toBeCalledWith("launchInquiryFlow", {
          artworkId: "chip-hughes-stripes",
        })
      })

      it("launchInquiryFlow triggers inquiry modal", async () => {
        await mediator.trigger("launchInquiryFlow", {
          artworkId: "chip-hughes-stripes",
        })
        expect(Backbone.sync).toBeCalled()
        expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
          "chip-hughes-stripes"
        )
        expect(inquiryMock.mock.calls[0][0].ask_specialist).toBeFalsy()
      })
    })

    describe("Ask a specialist", () => {
      it("openBuyNowAskSpecialistModal does not trigger auth modal", async () => {
        await mediator.trigger("openBuyNowAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })
        expect(mediatorTriggerMock).toBeCalledTimes(1)
        expect(mediatorTriggerMock).toBeCalledWith(
          "openBuyNowAskSpecialistModal",
          {
            artworkId: "chip-hughes-stripes",
          }
        )
      })

      it("openBuyNowAskSpecialistModal triggers inquiry modal", async () => {
        await mediator.trigger("openBuyNowAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })
        expect(Backbone.sync).toBeCalled()
        expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
          "chip-hughes-stripes"
        )
        expect(inquiryMock.mock.calls[0][0].ask_specialist).toBeTruthy()
      })
    })

    describe("Ask an auction specialist", () => {
      it("openAuctionAskSpecialistModal does not trigger auth modal", async () => {
        await mediator.trigger("openAuctionAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })
        expect(mediatorTriggerMock).toBeCalledTimes(1)
        expect(mediatorTriggerMock).toBeCalledWith(
          "openAuctionAskSpecialistModal",
          {
            artworkId: "chip-hughes-stripes",
          }
        )
      })

      it("openAuctionAskSpecialistModal triggers inquiry modal", async () => {
        await mediator.trigger("openAuctionAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })
        expect(Backbone.sync).toBeCalled()
        expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
          "chip-hughes-stripes"
        )
        expect(inquiryMock.mock.calls[0][0].ask_specialist).toBeTruthy()
      })
    })
  })

  describe("Inquiry auth experiment", () => {
    beforeEach(() => {
      sd.INQUIRY_AUTH_V2 = "experiment"
      sd.CURRENT_USER = {}
    })

    describe("Contact gallery", () => {
      it("launchInquiryFlow triggers auth modal if no current user", async () => {
        delete sd.CURRENT_USER
        await mediator.trigger("launchInquiryFlow", {
          artworkId: "chip-hughes-stripes",
        })

        expect(mediatorTriggerMock).toBeCalledWith("open:auth", {
          mode: "signup",
          intent: "Contact Gallery",
          signupIntent: "signup",
          trigger: "click",
          type: "signup",
          contextModule: "Artwork CTA",
          modal_copy: "Sign up to contact gallery",
          redirectTo: "https://artsy.net/",
        })
      })

      it("launchInquiryFlow triggers inquiry modal if logged in", async () => {
        await mediator.trigger("launchInquiryFlow", {
          artworkId: "chip-hughes-stripes",
        })
        expect(Backbone.sync).toBeCalled()
        expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
          "chip-hughes-stripes"
        )
        expect(inquiryMock.mock.calls[0][0].ask_specialist).toBeFalsy()
      })
    })

    describe("Ask a specialist", () => {
      it("openBuyNowAskSpecialistModal triggers auth modal if no current user", async () => {
        delete sd.CURRENT_USER
        await mediator.trigger("openBuyNowAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })

        expect(mediatorTriggerMock).toBeCalledWith("open:auth", {
          mode: "signup",
          intent: "Ask a specialist",
          signupIntent: "signup",
          trigger: "click",
          type: "signup",
          contextModule: "Artwork CTA",
          modal_copy: "Sign up to ask a specialist",
          redirectTo: "https://artsy.net/",
        })
      })

      it("openBuyNowAskSpecialistModal triggers inquiry modal if logged in", async () => {
        await mediator.trigger("openBuyNowAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })
        expect(Backbone.sync).toBeCalled()
        expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
          "chip-hughes-stripes"
        )
        expect(inquiryMock.mock.calls[0][0].ask_specialist).toBeTruthy()
      })
    })

    describe("Ask an auction specialist", () => {
      it("openAuctionAskSpecialistModal triggers auth modal if no current user", async () => {
        delete sd.CURRENT_USER
        await mediator.trigger("openAuctionAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })

        expect(mediatorTriggerMock).toBeCalledWith("open:auth", {
          mode: "signup",
          intent: "Ask a specialist",
          signupIntent: "signup",
          trigger: "click",
          type: "signup",
          contextModule: "Artwork CTA",
          modal_copy: "Sign up to ask a specialist",
          redirectTo: "https://artsy.net/",
        })
      })

      it("openAuctionAskSpecialistModal triggers inquiry modal if logged in", async () => {
        await mediator.trigger("openAuctionAskSpecialistModal", {
          artworkId: "chip-hughes-stripes",
        })
        expect(Backbone.sync).toBeCalled()
        expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
          "chip-hughes-stripes"
        )
        expect(inquiryMock.mock.calls[0][0].ask_specialist).toBeTruthy()
      })
    })
  })
})
