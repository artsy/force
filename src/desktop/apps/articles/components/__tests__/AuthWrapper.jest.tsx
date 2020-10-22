import React from "react"
import { mount } from "enzyme"
import { AuthWrapper } from "../AuthWrapper"
import sharify, { data as sd } from "sharify"
import * as helpers from "desktop/lib/openAuthModal"
import { mediator } from "lib/mediator"

jest.mock("sharify")
jest.mock("querystring", () => ({
  parse: jest.fn().mockReturnValue({}),
}))
jest.mock("desktop/components/cookies/index.coffee", () => ({
  get: jest.fn(),
  set: jest.fn(),
}))

const qsMock = require("querystring").parse as jest.Mock
const CookiesGetMock = require("desktop/components/cookies/index.coffee")
  .get as jest.Mock
const CookiesSetMock = require("desktop/components/cookies/index.coffee")
  .set as jest.Mock
jest.spyOn(helpers, "handleScrollingAuthModal")

const handleScrollingAuthModal = require("desktop/lib/openAuthModal")
  .handleScrollingAuthModal as jest.Mock

jest.useFakeTimers()

describe("AuthWrapper", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "on")
    delete sd.IS_MOBILE
    delete sd.CURRENT_USER
    window.addEventListener = jest.fn()
  })

  afterEach(() => {
    // FIXME: reaction migration
    // @ts-ignore
    sharify.mockClear()
    handleScrollingAuthModal.mockClear()
  })

  const getWrapper = () => {
    return mount(<AuthWrapper />)
  }

  describe("#componentWillMount", () => {
    it("does nothing if IS_MOBILE", () => {
      sd.IS_MOBILE = true
      getWrapper()
      expect(mediator.on).not.toBeCalled()
      expect(handleScrollingAuthModal).not.toBeCalled()
    })

    it("does nothing if CURRENT_USER", () => {
      sd.CURRENT_USER = { name: "Carter" }
      getWrapper()
      expect(mediator.on).not.toBeCalled()
      expect(handleScrollingAuthModal).not.toBeCalled()
    })

    it("does nothing if user has dismiss cookie", () => {
      CookiesGetMock.mockReturnValueOnce(1)
      getWrapper()
      expect(mediator.on).not.toBeCalled()
      expect(handleScrollingAuthModal).not.toBeCalled()
    })

    it("does nothing if source is sailthru", () => {
      qsMock.mockReturnValueOnce({
        utm_source: "sailthru",
      })
      getWrapper()
      expect(mediator.on).not.toBeCalled()
      expect(handleScrollingAuthModal).not.toBeCalled()
    })

    it("sets up scrolling auth modal", () => {
      const component = getWrapper().instance() as AuthWrapper
      expect(mediator.on).toBeCalledWith(
        "modal:closed",
        component.setDismissCookie
      )
      expect(mediator.on).toBeCalledWith(
        "auth:sign_up:success",
        component.setDismissCookie
      )
      expect(window.addEventListener).toBeCalled()
      expect(handleScrollingAuthModal).toBeCalledWith({
        afterSignUpAction: { action: "editorialSignup" },
        contextModule: "popUpModal",
        copy: "Sign up for the best stories in art and visual culture",
        destination: "https://artsy.net/",
        intent: "viewEditorial",
      })
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

  it("#setDismissCookie sets a cookie", () => {
    const component = getWrapper().instance() as AuthWrapper
    component.setDismissCookie()
    expect(CookiesSetMock).toBeCalledWith("editorial-signup-dismissed", 1, {
      expires: 31536000,
    })
  })
})
