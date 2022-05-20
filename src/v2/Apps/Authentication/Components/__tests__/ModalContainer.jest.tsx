import { mount } from "enzyme"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { ModalManager } from "v2/Components/Authentication/ModalManager"
import { ModalContainer } from "../ModalContainer"
import { ContextModule, Intent } from "@artsy/cohesion"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { mediator } from "lib/mediator"

jest.mock("sharify")
jest.mock("cookies-js", () => ({
  get: jest.fn(),
  set: jest.fn(),
}))
jest.useFakeTimers()

const cookieSet = require("cookies-js").set as jest.Mock

describe("ModalContainer", () => {
  beforeAll(() => {
    cookieSet.mockClear()
    sd.AP = {
      loginPagePath: "/login",
      signupPagePath: "/signup",
    }
  })

  it("Mediator can open a login modal", () => {
    const component = mount(<ModalContainer />)
    mediator.trigger("open:auth", { mode: ModalType.login } as ModalOptions)
    jest.advanceTimersByTime(1000)
    const form = component.find(ModalManager).instance().state
    // FIXME: reaction migration
    // @ts-ignore
    expect(form.currentType).toBe("login")
  })

  it("Mediator can open a signup modal", () => {
    const component = mount(<ModalContainer />)
    mediator.trigger("open:auth", { mode: ModalType.signup } as ModalOptions)
    jest.advanceTimersByTime(1000)
    const form = component.find(ModalManager).instance().state
    // FIXME: reaction migration
    // @ts-ignore
    expect(form.currentType).toBe("signup")
  })

  it("Mediator can open a reset_password modal", () => {
    const component = mount(<ModalContainer />)
    mediator.trigger("open:auth", { mode: "reset_password" } as any)

    jest.advanceTimersByTime(1000)
    const form = component.find(ModalManager).instance().state
    // FIXME: reaction migration
    // @ts-ignore
    expect(form.currentType).toBe("reset_password")
  })

  it("Sets a cookie when opening the modal", () => {
    mount(<ModalContainer />)
    mediator.trigger("open:auth", {
      mode: ModalType.login,
      destination: "foo",
    } as ModalOptions)

    expect(cookieSet).toBeCalledWith("destination", "foo", { expires: 86400 })
  })

  it("onSocialAuthEvent sets cookie on signup with expected args", () => {
    const component = mount(<ModalContainer />).instance() as ModalContainer
    component.onSocialAuthEvent({
      contextModule: ContextModule.popUpModal,
      mode: ModalType.signup,
      intent: Intent.viewArtist,
      service: "facebook",
      redirectTo: "/artist/andy-warhol",
      triggerSeconds: 2,
    })

    expect(cookieSet).toBeCalledWith(
      "analytics-signup",
      '{"action":"createdAccount","auth_redirect":"/artist/andy-warhol","context_module":"popUpModal","intent":"viewArtist","service":"facebook","trigger":"timed","trigger_seconds":2,"type":"signup","onboarding":false}',
      { expires: 86400 }
    )
  })

  it("onSocialAuthEvent sets cookie on login with expected args", () => {
    const component = mount(<ModalContainer />).instance() as ModalContainer
    component.onSocialAuthEvent({
      contextModule: ContextModule.popUpModal,
      mode: ModalType.login,
      intent: Intent.viewArtist,
      service: "apple",
      redirectTo: "/artist/andy-warhol",
      triggerSeconds: 2,
    })

    expect(cookieSet).toBeCalledWith(
      "analytics-login",
      '{"action":"successfullyLoggedIn","auth_redirect":"/artist/andy-warhol","context_module":"popUpModal","intent":"viewArtist","service":"apple","trigger":"timed","trigger_seconds":2,"type":"login"}',
      { expires: 86400 }
    )
  })
})
