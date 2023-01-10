import { ContextModule, Intent } from "@artsy/cohesion"
import { ModalType } from "Components/Authentication/Types"
import { mockLocation } from "DevTools/mockLocation"
import { openAuthModal } from "Utils/openAuthModal"

describe("openAuth Helpers", () => {
  let mediator

  beforeEach(() => {
    mediator = {
      ready: () => {
        return true
      },
      trigger: jest.fn(),
    }
    mockLocation({ href: "http://localhost/" })
  })

  describe("#openAuthModal", () => {
    it("calls the mediator with expected args", () => {
      openAuthModal(mediator, {
        contextModule: ContextModule.header,
        copy: "Sign up to do cool stuff",
        intent: Intent.signup,
        mode: ModalType.signup,
      })

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        copy: "Sign up to do cool stuff",
        intent: "signup",
        mode: "signup",
      })
    })
  })
})
