import React from "react"
import { mount } from "enzyme"
import { AuthWrapper } from "../AuthWrapper"
import sharify, { data as sd } from "sharify"

jest.mock("sharify")
jest.mock("querystring", () => ({
  parse: jest.fn().mockReturnValue({}),
}))
jest.mock("desktop/components/cookies/index.coffee", () => ({
  get: jest.fn(),
  set: jest.fn(),
}))
jest.mock("desktop/lib/mediator.coffee", () => ({
  trigger: jest.fn(),
  on: jest.fn(),
}))
const mediatorTrigger = require("desktop/lib/mediator.coffee")
  .trigger as jest.Mock
const mediatorOn = require("desktop/lib/mediator.coffee").on as jest.Mock
const qsMock = require("querystring").parse as jest.Mock
const CookiesGetMock = require("desktop/components/cookies/index.coffee")
  .get as jest.Mock
const CookiesSetMock = require("desktop/components/cookies/index.coffee")
  .set as jest.Mock

jest.useFakeTimers()

describe("AuthWrapper", () => {
  beforeEach(() => {
    delete sd.IS_MOBILE
    delete sd.CURRENT_USER
  })

  afterEach(() => {
    sharify.mockClear()
  })

  const getWrapper = () => {
    return mount(<AuthWrapper />)
  }

  describe("#componentWillMount", () => {
    it("does nothing if IS_MOBILE", () => {
      sd.IS_MOBILE = true
      const component = getWrapper().instance() as AuthWrapper
      expect(component.openModal).toBe(undefined)
      expect(mediatorOn).not.toBeCalled()
    })

    it("does nothing if CURRENT_USER", () => {
      sd.CURRENT_USER = { name: "Carter" }
      const component = getWrapper().instance() as AuthWrapper
      expect(component.openModal).toBe(undefined)
      expect(mediatorOn).not.toBeCalled()
    })

    it("does nothing if user has dismiss cookie", () => {
      CookiesGetMock.mockReturnValueOnce(1)
      const component = getWrapper().instance() as AuthWrapper
      expect(component.openModal).toBe(undefined)
      expect(mediatorOn).not.toBeCalled()
    })

    it("does nothing if source is sailthru", () => {
      qsMock.mockReturnValueOnce({
        utm_source: "sailthru",
      })
      const component = getWrapper().instance() as AuthWrapper
      expect(component.openModal).toBe(undefined)
      expect(mediatorOn).not.toBeCalled()
    })

    it("sets this.openModal", () => {
      const component = getWrapper().instance() as AuthWrapper
      component.onOpenModal = jest.fn()
      expect(component.openModal).toBeInstanceOf(Function)
      expect(mediatorOn).toBeCalled()
    })

    it("tells mediator to set cookie on close", () => {
      const component = getWrapper().instance() as AuthWrapper
      expect(mediatorOn).toBeCalledWith(
        "modal:closed",
        component.setDismissCookie
      )
      expect(mediatorOn).toBeCalledWith(
        "auth:sign_up:success",
        component.setDismissCookie
      )
    })
  })

  describe("#isFromSailthru", () => {
    afterEach(() => {
      qsMock.mockReturnValue({})
    })

    it("returns true if utm_source is sailthru", () => {
      qsMock.mockReturnValue({
        utm_source: "sailthru",
      })
      const component = getWrapper().instance() as AuthWrapper
      expect(component.isFromSailthru()).toBe(true)
    })

    it("returns true if utm_content is sailthru", () => {
      qsMock.mockReturnValue({
        utm_content: "st-",
      })
      const component = getWrapper().instance() as AuthWrapper
      expect(component.isFromSailthru()).toBe(true)
    })
  })

  it("#onOpenModal calls mediator with correct args", () => {
    const component = getWrapper().instance() as AuthWrapper
    component.onOpenModal()
    expect(mediatorTrigger).toBeCalledWith("open:auth", {
      mode: "signup",
      intent: "Viewed editorial",
      trigger: "timed",
      triggerSeconds: 2,
      copy: "Sign up for the Best Stories in Art and Visual Culture",
      destination: location.href,
    })
  })

  it("#setDismissCookie sets a cookie", () => {
    const component = getWrapper().instance() as AuthWrapper
    component.setDismissCookie()
    expect(CookiesSetMock).toBeCalledWith("editorial-signup-dismissed", 1, {
      expires: 31536000,
    })
  })
})
