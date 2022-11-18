import { openAuthModal } from "Server/openAuthModal"
import { ModalType } from "Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mediator } from "Server/mediator"

jest.mock("sharify", () => {
  return {
    data: {
      API_URL: "https://api.example.com",
      APP_URL: "https://app.example.com",
      AP: {
        loginPagePath: "foo",
      },
    },
  }
})
const sd = require("sharify").data

jest.useFakeTimers()

describe("Authentication Helpers", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
    // @ts-ignore
    window.addEventListener = jest.fn((_type, cb) => cb())
    sd.IS_MOBILE = false
    sd.CURRENT_USER = null
  })

  afterEach(() => {
    // @ts-ignore
    mediator.trigger.mockClear()
    // @ts-ignore
    window.addEventListener.mockClear()
  })

  describe("#openAuthModal", () => {
    it("opens the mediator with expected args", () => {
      openAuthModal(ModalType.signup, {
        intent: Intent.followArtist,
        contextModule: ContextModule.artistHeader,
      })
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "artistHeader",
        intent: "followArtist",
        mode: "signup",
      })
    })
  })
})
