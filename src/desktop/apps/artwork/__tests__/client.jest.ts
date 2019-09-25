import Backbone from "backbone"
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

  describe("Launch inquiry", () => {
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
})
