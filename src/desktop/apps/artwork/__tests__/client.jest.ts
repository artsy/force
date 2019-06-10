import { handleOpenAuthModal } from "../client"
import Backbone from "backbone"
import { data as sd } from "sharify"
const mediator = require("desktop/lib/mediator.coffee")
const mediatorTriggerMock = jest.spyOn(mediator, "trigger")

jest.mock("desktop/components/inquiry_questionnaire/index.coffee", () =>
  jest.fn()
)
const inquiryMock = require("desktop/components/inquiry_questionnaire/index.coffee")

describe("artwork client", () => {
  beforeEach(() => {
    mediatorTriggerMock.mockClear()
    Backbone.sync = jest.fn().mockImplementation(() => Promise.resolve())
  })

  describe("Contact gallery", () => {
    it("launchInquiryFlow triggers auth modal if no current user", () => {
      mediator.trigger("launchInquiryFlow")
      expect(mediatorTriggerMock).toBeCalledWith("open:auth", {
        mode: "signup",
        intent: "Contact Gallery",
        signupIntent: "signup",
        trigger: "click",
        contextModule: "Contact gallery",
        copy: "Sign up to contact gallery",
        destination: "https://artsy.net/",
      })
    })

    it("launchInquiryFlow triggers inquiry modal if logged in", async () => {
      sd.CURRENT_USER = {}
      await mediator.trigger("launchInquiryFlow", {
        artworkId: "chip-hughes-stripes",
      })
      expect(Backbone.sync).toBeCalled()
      expect(inquiryMock.mock.calls[0][0].artwork.get("id")).toBe(
        "chip-hughes-stripes"
      )
      expect(inquiryMock.mock.calls[0][0].ask_specialist).toBeFalsy()
    })

    it("#handleOpenAuthModal opens auth with expected args", () => {
      handleOpenAuthModal()
      expect(mediatorTriggerMock).toBeCalledWith("open:auth", {
        mode: "signup",
        intent: "Contact Gallery",
        signupIntent: "signup",
        trigger: "click",
        contextModule: "Contact gallery",
        copy: "Sign up to contact gallery",
        destination: "https://artsy.net/",
      })
    })
  })
})
