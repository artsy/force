import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ConversationCTAFragmentContainer } from "../ConversationCTA"
import { useTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "v2/System/useSystemContext"
import React from "react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/useSystemContext")

describe("ConversationCTA", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <ConversationCTAFragmentContainer
          conversation={props.me.conversation}
          openInquiryModal={jest.fn()}
          openOrderModal={jest.fn()}
          onMount={jest.fn()}
        />
      )
    },
    query: graphql`
      query ConversationCTA_Test_Query {
        me {
          conversation(id: "1234") {
            ...ConversationCTA_conversation
          }
        }
      }
    `,
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()
  let useSystemContext = baseUseSystemContext as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))

    useSystemContext.mockImplementation(() => {
      return {
        user: { lab_features: ["Web Inquiry Checkout"] },
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
        },
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("doesn't render if lab feature is false", () => {
    useSystemContext.mockImplementation(() => {
      return {
        user: null,
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
        },
      }
    })

    const wrapper = getWrapper({})
    expect(wrapper.find("ReviewOfferCTA").length).toBe(0)
    expect(wrapper.find("MakeOfferButton").length).toBe(0)
  })

  it("renders the correct CTA when an offer has been received", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED" } }],
        },
      }),
    })

    expect(wrapper.find("ReviewOfferCTA").length).toBe(1)
    expect(wrapper.text()).toContain("Offer Received")
  })

  it("renders the correct CTA when payment has failed", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "PAYMENT_FAILED" } }],
        },
      }),
    })

    expect(wrapper.find("ReviewOfferCTA").length).toBe(1)
    expect(wrapper.text()).toContain("Payment Failed")
  })

  it("renders the correct CTA when offer is accepted", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_ACCEPTED" } }],
        },
      }),
    })

    expect(wrapper.find("ReviewOfferCTA").length).toBe(1)
    expect(wrapper.text()).toContain("Congratulations! Offer Accepted")
  })

  it("renders the correct CTA when offer is accepted but confirmation is needed", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_ACCEPTED_CONFIRM_NEEDED" } }],
        },
      }),
    })

    expect(wrapper.find("ReviewOfferCTA").length).toBe(1)
    expect(wrapper.text()).toContain("Offer Accepted - Confirm total")
  })

  it("renders the correct CTA when offer is received but confirmation is needed", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED_CONFIRM_NEEDED" } }],
        },
      }),
    })

    expect(wrapper.find("ReviewOfferCTA").length).toBe(1)
    expect(wrapper.text()).toContain("Counteroffer Received - Confirm Total")
  })

  it("renders the correct CTA when a provisional offer is accepted", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "PROVISIONAL_OFFER_ACCEPTED" } }],
        },
      }),
    })

    expect(wrapper.find("ReviewOfferCTA").length).toBe(1)
    expect(wrapper.text()).toContain("Offer Accepted")
  })

  it("doesn't render the cta when there is no active offer", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [],
        },
      }),
    })

    expect(wrapper.find("ReviewOfferCTA").length).toBe(0)
  })

  it("clicking the review offer CTA opens the order modal", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED" } }],
        },
      }),
    })
    wrapper.find("ReviewOfferCTA").simulate("click")

    setTimeout(() => {
      expect(wrapper.find("StyledIframe").length).toBe(1)
    }, 0)
  })
})
