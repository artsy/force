import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { MakeOfferOnInquiryButtonFragmentContainer } from "../MakeOfferOnInquiryButton"
import { MakeInquiryOffer } from "v2/Apps/Conversation/Mutation/MakeInquiryOfferMutation"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")
jest.mock("v2/Apps/Conversation/Mutation/MakeInquiryOfferMutation")

const openInquiryModalFn = jest.fn()

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <MakeOfferOnInquiryButtonFragmentContainer
        conversation={props.me.conversation}
        openInquiryModal={openInquiryModalFn}
      />
    )
  },
  query: graphql`
    query MakeOfferOnInquiryButton_Test_Query @relay_test_operation {
      me {
        conversation(id: "123") {
          ...MakeOfferOnInquiryButton_conversation
        }
      }
    }
  `,
})

describe("MakeOfferOnInquiryButton", () => {
  const mockuseTracking = useTracking as jest.Mock
  const mockMakeInquiryOfferMutation = MakeInquiryOffer as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders with Make Offer CTA", () => {
    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
        activeOrders: null,
      }),
    })

    const link = screen.getByText("The Artsy Guarantee")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/buyer-guarantee")
    expect(screen.getByText("Make an Offer")).toBeInTheDocument()
  })

  it("clicking the button on unique artworks creates an offer", async () => {
    renderWithRelay({
      Me: () => ({
        Conversation: () => ({ ahot: "there" }),
      }),
      Conversation: () => ({
        internalID: "internal-test-id",
      }),
    })

    fireEvent.click(screen.getByText("Make an Offer"))

    await waitFor(() => {
      expect(mockMakeInquiryOfferMutation).toHaveBeenCalledTimes(1)
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
      expect(mockMakeInquiryOfferMutation).toHaveBeenCalledTimes(1)
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
    expect(openInquiryModalFn).toHaveBeenCalledTimes(1)
  })
})
