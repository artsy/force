import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationMakeOfferButton } from "Apps/Conversations/components/ConversationCTA/ConversationMakeOfferButton"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useMakeInquiryOffer } from "Apps/Conversations/mutations/useMakeInquiryOfferMutation"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"

jest.mock("react-tracking")
jest.unmock("react-relay")

jest.mock("Apps/Conversations/mutations/useMakeInquiryOfferMutation", () => ({
  useMakeInquiryOffer: jest.fn().mockReturnValue({
    submitMutation: jest.fn(),
  }),
}))

jest.mock("Apps/Conversations/ConversationsContext", () => ({
  useConversationsContext: jest.fn().mockReturnValue({
    isConfirmModalVisible: false,
    showSelectEditionSetModal: jest.fn(),
  }),
}))

describe("ConversationMakeOfferButton", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <ConversationMakeOfferButton conversation={props.me.conversation} />
      )
    },
    query: graphql`
      query ConversationMakeOfferButton_Test_Query @relay_test_operation {
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
  const mockMakeInquiryOfferMutation = useMakeInquiryOffer as jest.Mock

  beforeEach(() => {
    mockMakeInquiryOfferMutation.mockImplementation(() => ({
      submitMutation: jest.fn(),
    }))
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders with Make Offer CTA", async () => {
    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
        activeOrders: null,
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Make an Offer")).toBeInTheDocument()
    })
  })

  it("clicking the button on unique artworks creates an offer", async () => {
    const mutationSpy = jest.fn()

    mockMakeInquiryOfferMutation.mockImplementation(() => ({
      submitMutation: mutationSpy,
    }))

    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
      }),
    })

    fireEvent.click(screen.getByText("Make an Offer"))

    await waitFor(() => {
      expect(trackingSpy).toHaveBeenCalledWith({
        action: "tappedMakeOffer",
        context_owner_type: "conversation",
        impulse_conversation_id: "internal-test-id",
      })
      expect(mutationSpy).toHaveBeenCalledTimes(1)
    })
  })

  it("clicking the button on artworks with one edition set creates an offer", async () => {
    const mutationSpy = jest.fn()

    mockMakeInquiryOfferMutation.mockImplementation(() => ({
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

    fireEvent.click(screen.getByText("Make an Offer"))

    await waitFor(() => {
      expect(trackingSpy).toHaveBeenCalledWith({
        action: "tappedMakeOffer",
        context_owner_type: "conversation",
        impulse_conversation_id: "internal-test-id",
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

    fireEvent.click(screen.getByText("Make an Offer"))

    await waitFor(() => {
      expect(showModalSpy).toHaveBeenCalledTimes(1)
      expect(trackingSpy).toHaveBeenCalledWith({
        action: "tappedMakeOffer",
        context_owner_type: "conversation",
        impulse_conversation_id: "internal-test-id",
      })
    })
  })
})
