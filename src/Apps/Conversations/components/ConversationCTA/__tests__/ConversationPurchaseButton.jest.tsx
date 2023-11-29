import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { ConversationPurchaseButton } from "Apps/Conversations/components/ConversationCTA/ConversationPurchaseButton"
import { useMakeInquiryOrder } from "Apps/Conversations/mutations/useMakeInquiryOrderMutation"

jest.mock("react-tracking")
jest.unmock("react-relay")

jest.mock("Apps/Conversations/mutations/useMakeInquiryOrderMutation", () => ({
  useMakeInquiryOrder: jest.fn().mockReturnValue({
    submitMutation: jest.fn(),
  }),
}))

jest.mock("Apps/Conversations/ConversationsContext", () => ({
  useConversationsContext: jest.fn().mockReturnValue({
    isConfirmModalVisible: false,
    showSelectEditionSetModal: jest.fn(),
  }),
}))

describe("ConversationPurchaseOfferButton", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return <ConversationPurchaseButton conversation={props.me.conversation} />
    },
    query: graphql`
      query ConversationPurchaseButton_Test_Query @relay_test_operation {
        me {
          conversation(id: "123") {
            ...useConversationPurchaseButtonData_conversation
          }
        }
      }
    `,
  })

  const trackingSpy = jest.fn()

  const mockUseConversationsContext = useConversationsContext as jest.Mock
  const mockuseTracking = useTracking as jest.Mock
  const mockMakeInquiryOrderMutation = useMakeInquiryOrder as jest.Mock

  beforeEach(() => {
    mockMakeInquiryOrderMutation.mockImplementation(() => ({
      submitMutation: jest.fn(),
    }))
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders with Purchase CTA", async () => {
    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
        activeOrders: null,
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Purchase")).toBeInTheDocument()
    })
  })

  it("clicking the button on unique artworks creates an offer", async () => {
    const mutationSpy = jest.fn()

    mockMakeInquiryOrderMutation.mockImplementation(() => ({
      submitMutation: mutationSpy,
    }))

    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
      }),
    })

    fireEvent.click(screen.getByText("Purchase"))

    await waitFor(() => {
      expect(trackingSpy).toHaveBeenCalledWith({
        action: "tappedBuyNow",
        context_owner_type: "conversation",
        impulse_conversation_id: "internal-test-id",
        context_owner_id: "<Artwork-mock-id-1>",
        context_owner_slug: "<Artwork-mock-id-2>",
      })
      expect(mutationSpy).toHaveBeenCalledTimes(1)
    })
  })

  it("clicking the button on artworks with one edition set creates an offer", async () => {
    const mutationSpy = jest.fn()

    mockMakeInquiryOrderMutation.mockImplementation(() => ({
      submitMutation: mutationSpy,
    }))

    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
        items: [
          {
            liveArtwork: {
              __typename: "Artwork",
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

    await waitFor(() => {
      expect(trackingSpy).toHaveBeenCalledWith({
        context_owner_type: "conversation",
        impulse_conversation_id: "internal-test-id",
        action: "tappedBuyNow",
        context_owner_id: "<Artwork-mock-id-1>",
        context_owner_slug: "<Artwork-mock-id-2>",
      })

      expect(mutationSpy).toHaveBeenCalledTimes(1)
    })
  })

  it("clicking the button on non-unique artworks opens the confirmation modal", async () => {
    const showModalSpy = jest.fn()

    mockUseConversationsContext.mockReturnValue({
      isConfirmModalVisible: false,
      showSelectEditionSetModal: showModalSpy,
    })

    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
        items: [
          {
            liveArtwork: {
              __typename: "Artwork",
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

    await waitFor(() => {
      expect(showModalSpy).toHaveBeenCalledTimes(1)
      expect(trackingSpy).toHaveBeenCalledWith({
        context_owner_type: "conversation",
        impulse_conversation_id: "internal-test-id",
        action: "tappedBuyNow",
        context_owner_id: "<Artwork-mock-id-1>",
        context_owner_slug: "<Artwork-mock-id-2>",
      })
    })
  })
})
