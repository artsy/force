import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { PurchaseOnInquiryButtonFragmentContainer } from "../PurchaseOnInquiryButton"
import { MakeInquiryOrder } from "v2/Apps/Conversation/Mutation/MakeInquiryOrderMutation"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")
jest.mock("v2/Apps/Conversation/Mutation/MakeInquiryOrderMutation")

const openInquiryModalFn = jest.fn()

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <PurchaseOnInquiryButtonFragmentContainer
        conversation={props.me.conversation}
        openInquiryModal={openInquiryModalFn}
      />
    )
  },
  query: graphql`
    query PurchaseOnInquiryButton_Test_Query @relay_test_operation {
      me {
        conversation(id: "123") {
          ...PurchaseOnInquiryButton_conversation
        }
      }
    }
  `,
})

const trackingSpy = jest.fn()

describe("PurchaseOnInquiryButton", () => {
  const mockuseTracking = useTracking as jest.Mock
  const mockMakeInquiryOrderMutation = MakeInquiryOrder as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders with Purchase CTA", () => {
    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
        activeOrders: null,
      }),
    })

    expect(screen.getByText("Purchase")).toBeInTheDocument()
  })

  it("clicking the button on unique artworks creates an offer", async () => {
    renderWithRelay({
      Me: () => ({
        Conversation: () => ({ ahot: "there" }),
      }),
      Conversation: () => ({
        internalID: "internal-test-id",
        items: [
          {
            liveArtwork: {
              __typename: "Artwork",
              internalID: "artwork-internal-id",
              slug: "artwork-slug",
            },
          },
        ],
      }),
    })

    fireEvent.click(screen.getByText("Purchase"))

    expect(trackingSpy).toHaveBeenCalledWith({
      action: "tappedBuyNow",
      context_owner_type: "conversation",
      context_owner_id: "artwork-internal-id",
      context_owner_slug: "artwork-slug",
      impulse_conversation_id: "internal-test-id",
    })
    await waitFor(() => {
      expect(mockMakeInquiryOrderMutation).toHaveBeenCalledTimes(1)
    })
  })

  it("clicking the button on artworks with one edition set creates an offer", async () => {
    renderWithRelay({
      Me: () => ({
        Conversation: () => ({ ahot: "there" }),
      }),
      Conversation: () => ({
        internalID: "internal-test-id",
        items: [
          {
            liveArtwork: {
              __typename: "Artwork",
              internalID: "artwork-internal-id",
              slug: "artwork-slug",
              isEdition: true,
              editionSets: [
                {
                  internalID: "an-edition-set",
                },
              ],
            },
          },
        ],
      }),
    })

    fireEvent.click(screen.getByText("Purchase"))

    expect(trackingSpy).toHaveBeenCalledWith({
      action: "tappedBuyNow",
      context_owner_type: "conversation",
      context_owner_id: "artwork-internal-id",
      context_owner_slug: "artwork-slug",
      impulse_conversation_id: "internal-test-id",
    })
    await waitFor(() => {
      expect(mockMakeInquiryOrderMutation).toHaveBeenCalledTimes(1)
    })
  })

  it("clicking the button on non-unique artworks opens the confirmation modal", () => {
    renderWithRelay({
      Me: () => ({
        Conversation: () => ({ ahot: "there" }),
      }),
      Conversation: () => ({
        internalID: "internal-test-id",
        items: [
          {
            liveArtwork: {
              __typename: "Artwork",
              internalID: "artwork-internal-id",
              slug: "artwork-slug",
              isEdition: true,
              editionSets: [
                {
                  internalID: "an-edition-set",
                },
                {
                  internalID: "another-edition-set",
                },
              ],
            },
          },
        ],
      }),
    })

    fireEvent.click(screen.getByText("Purchase"))
    expect(openInquiryModalFn).toHaveBeenCalledTimes(1)
    expect(trackingSpy).toHaveBeenCalledWith({
      action: "tappedBuyNow",
      context_owner_type: "conversation",
      context_owner_id: "artwork-internal-id",
      context_owner_slug: "artwork-slug",
      impulse_conversation_id: "internal-test-id",
    })
  })
})
