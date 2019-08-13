import { test } from "../DOM"
import mediator from "desktop/lib/mediator.coffee"
import { AuctionRegistrationModal } from "reaction/Components/Auction/AuctionRegistrationModal"

const { DOM } = test

jest.mock("jquery", x => () => ({
  foo: "bar",
}))

jest.mock("desktop/lib/mediator.coffee", x => ({
  trigger: jest.fn(),
}))

jest.useFakeTimers()

describe("DOM Interactions", () => {
  // spyOn required to restore global mocks' original implementations
  // may not be necessary?
  beforeAll(() => {
    jest.spyOn(history, "replaceState")
    jest.spyOn(location, "assign")
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  const mockDispatch = jest.fn()

  describe(".handleRegister", () => {
    beforeEach(() => {
      mockDispatch.mockReset()
    })

    afterEach(() => {
      jest.resetAllMocks()
      mediator.trigger.mockReset()
    })
    it("user has credit card: opens the conditions of sale modal", () => {
      DOM.prototype.componentDidMount = jest.fn()

      const dom = new DOM({
        auction: {
          name: "An Auction",
        },
        me: {
          id: "user",
          bidders: [],
          has_credit_cards: true,
        },
        dispatch: mockDispatch,
      })

      dom.handleRegister()
      jest.runAllTimers()

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { modalType: "RegistrationFlow" },
        type: "SHOW_MODAL",
      })
    })
    it("already registered: stays on the auction page", () => {
      DOM.prototype.componentDidMount = jest.fn()
      const dom = new DOM({
        auction: {
          name: "An Auction",
          href: () => "/auction/regular-auction-route",
        },
        me: {
          id: "user",
          bidders: ["SOME BIDDER OBJECT"],
          has_credit_cards: true,
        },
        dispatch: mockDispatch,
      })

      dom.handleRegister()
      jest.runAllTimers()

      expect(mockDispatch).not.toHaveBeenCalled()
      expect(history.replaceState).toHaveBeenCalledWith(
        {},
        "",
        "/auction/regular-auction-route"
      )
    })
    it("no user: opens the login modal with registration intent", () => {
      const dom = new DOM({
        auction: {
          name: "An Auction",
          href: () => "/auction/auction-id",
          registrationFlowUrl: () => "/auction/auction-id/registration-flow",
        },
        dispatch: mockDispatch,
      })

      dom.handleRegister()
      jest.runAllTimers()

      expect(mockDispatch).not.toHaveBeenCalled()
      expect(mediator.trigger).toHaveBeenCalledWith("open:auth", {
        mode: "signup",
        redirectTo: "/auction/auction-id/registration-flow",
        signupIntent: "register to bid",
        intent: "register to bid",
        trigger: "click",
      })
    })

    it("user has no credit card: redirects to auction registration url (the credit card form)", () => {
      DOM.prototype.componentDidMount = jest.fn()
      const dom = new DOM({
        auction: {
          name: "An Auction",
          registerUrl: () => "/auction-registration/auction-id",
        },
        me: {
          id: "user",
          bidders: [],
          has_credit_cards: false,
        },
        dispatch: mockDispatch,
      })

      dom.handleRegister()
      jest.runAllTimers()

      expect(mockDispatch).not.toHaveBeenCalled()
      expect(location.assign).toHaveBeenCalledWith(
        "/auction-registration/auction-id"
      )
    })
  })
})
