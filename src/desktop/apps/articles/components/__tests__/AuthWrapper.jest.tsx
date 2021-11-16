import { mount } from "enzyme"
import { AuthWrapper } from "../AuthWrapper"
import sharify, { data as sd } from "sharify"
import * as helpers from "desktop/lib/openAuthModal"
import { mediator } from "lib/mediator"

jest.mock("sharify")
jest.mock("querystring", () => ({
  parse: jest.fn().mockReturnValue({}),
}))
jest.mock("desktop/components/cookies/index", () => ({
  get: jest.fn(),
  set: jest.fn(),
}))

const CookiesGetMock = require("desktop/components/cookies/index")
  .get as jest.Mock
const CookiesSetMock = require("desktop/components/cookies/index")
  .set as jest.Mock
jest.spyOn(helpers, "handleScrollingAuthModal")

const handleScrollingAuthModal = require("desktop/lib/openAuthModal")
  .handleScrollingAuthModal as jest.Mock

jest.useFakeTimers()

describe("AuthWrapper", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "on")
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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

  it("#setDismissCookie sets a cookie", () => {
    const component = getWrapper().instance() as AuthWrapper
    component.setDismissCookie()
    expect(CookiesSetMock).toBeCalledWith("editorial-signup-dismissed", 1, {
      expires: 31536000,
    })
  })
})
