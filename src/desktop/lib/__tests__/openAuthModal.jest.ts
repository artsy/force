import { openAuthModal, handleScrollingAuthModal } from "../openAuthModal"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"
import { AuthIntent, ContextModule } from "@artsy/cohesion"

jest.mock("desktop/lib/mediator.coffee", () => ({
  trigger: jest.fn(),
}))
const mediator = require("desktop/lib/mediator.coffee").trigger as jest.Mock

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
    // @ts-ignore
    window.addEventListener = jest.fn((_type, cb) => cb())
    window.location.assign = jest.fn()
    sd.IS_MOBILE = false
    sd.CURRENT_USER = null
  })

  afterEach(() => {
    mediator.mockClear()
    // @ts-ignore
    window.addEventListener.mockClear()
  })

  describe("#openAuthModal", () => {
    it("opens the mediator with expected args", () => {
      openAuthModal(ModalType.signup, {
        intent: AuthIntent.followArtist,
        contextModule: ContextModule.artistHeader,
      })
      expect(mediator).toBeCalledWith("open:auth", {
        contextModule: "artistHeader",
        intent: "followArtist",
        mode: "signup",
      })
    })
  })

  describe("#handleScrollingAuthModal", () => {
    it("opens the mediator with expected args", () => {
      handleScrollingAuthModal({
        intent: AuthIntent.followArtist,
        contextModule: ContextModule.popUpModal,
      })
      expect(window.addEventListener).toBeCalled()
      jest.runAllTimers()
      expect(mediator).toBeCalledWith("open:auth", {
        contextModule: "popUpModal",
        intent: "followArtist",
        mode: "signup",
        triggerSeconds: 2,
      })
    })

    it("does not open auth on mobile", () => {
      sd.IS_MOBILE = true
      handleScrollingAuthModal({
        intent: AuthIntent.followArtist,
        contextModule: ContextModule.popUpModal,
      })
      expect(window.addEventListener).not.toBeCalled()
      jest.runAllTimers()
      expect(mediator).not.toBeCalled()
    })

    it("does not open auth if current user", () => {
      sd.CURRENT_USER = { id: "123" }
      handleScrollingAuthModal({
        intent: AuthIntent.followArtist,
        contextModule: ContextModule.popUpModal,
      })
      expect(window.addEventListener).not.toBeCalled()
      jest.runAllTimers()
      expect(mediator).not.toBeCalled()
    })
  })
})
