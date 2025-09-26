import { fireEvent, screen, waitFor } from "@testing-library/react"
import { Order2OfferStep } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Order2OfferStep"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2AddInitialOfferMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useJump } from "Utils/Hooks/useJump"
import { Order2OfferStepTestQuery } from "__generated__/Order2OfferStepTestQuery.graphql"

jest.unmock("react-relay")
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")
jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation",
)
jest.mock("Utils/Hooks/useJump")

const mockUseCheckoutContext = useCheckoutContext as jest.Mock
const mockUseOrder2AddInitialOfferMutation =
  useOrder2AddInitialOfferMutation as jest.Mock
const mockUseJump = useJump as jest.Mock

const MOCK_PRICE_RANGE_ORDER = {
  internalID: "order-id",
  mode: "OFFER",
  currencyCode: "USD",
  lineItems: [
    {
      artwork: {
        slug: "artwork-slug",
        isPriceRange: true,
        listPrice: {
          __typename: "PriceRange",
          maxPrice: { major: 2000 },
          minPrice: { major: 1000 },
        },
        editionSets: [],
        price: "$1,000 - $2,000",
      },
    },
  ],
}

const MOCK_EXACT_PRICE_ORDER = {
  internalID: "order-id",
  mode: "OFFER",
  currencyCode: "USD",
  lineItems: [
    {
      artwork: {
        slug: "artwork-slug",
        isPriceRange: false,
        listPrice: {
          __typename: "Money",
          major: 5000,
        },
        editionSets: [],
        price: "$5,000",
      },
    },
  ],
}

describe("Order2OfferStep", () => {
  let mockSetOfferAmountComplete: jest.Mock
  let mockSubmitMutation: jest.Mock
  let mockJumpTo: jest.Mock

  beforeEach(() => {
    mockSetOfferAmountComplete = jest.fn()
    mockSubmitMutation = jest.fn(() => ({
      commerceAddInitialOfferToOrder: {
        orderOrError: { order: { internalID: "order-id" } },
      },
    }))
    mockJumpTo = jest.fn()

    mockUseCheckoutContext.mockReturnValue({
      steps: [{ name: "OFFER_AMOUNT", state: "ACTIVE" }],
      setOfferAmountComplete: mockSetOfferAmountComplete,
    })
    mockUseOrder2AddInitialOfferMutation.mockReturnValue({
      submitMutation: mockSubmitMutation,
    })
    mockUseJump.mockReturnValue({ jumpTo: mockJumpTo })
  })

  const { renderWithRelay } = setupTestWrapperTL<Order2OfferStepTestQuery>({
    Component: (props: any) => {
      if (props.viewer?.me?.order) {
        return <Order2OfferStep order={props.viewer.me.order} />
      }
      return null
    },
    query: graphql`
      query Order2OfferStepTestQuery @relay_test_operation {
        viewer {
          me {
            order(id: "order-id") {
              ...Order2OfferStep_order
            }
          }
        }
      }
    `,
  })

  it("renders the price range form and allows submitting an offer", async () => {
    renderWithRelay({
      Viewer: () => ({
        me: {
          order: MOCK_PRICE_RANGE_ORDER,
        },
      }),
    })

    // Check that the price range options are rendered
    expect(screen.getByText("Top-end of range")).toBeInTheDocument()
    expect(screen.getByText("Midpoint")).toBeInTheDocument()
    expect(screen.getByText("Low-end of range")).toBeInTheDocument()

    // Check for formatted currency text - might be split across elements
    expect(
      screen.getByText((content, element) => {
        return content.includes("2,000")
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText((content, element) => {
        return content.includes("1,500")
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText((content, element) => {
        return content.includes("1,000")
      }),
    ).toBeInTheDocument()

    // Select an offer
    const midPointRadio = screen.getByText("Midpoint")
    fireEvent.click(midPointRadio)

    // Click continue
    const continueButton = screen.getByRole("button", {
      name: "Save and Continue",
    })
    fireEvent.click(continueButton)

    await waitFor(() => {
      // Check that the mutation was called with the correct values
      expect(mockSubmitMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            orderId: "order-id",
            amountCents: 150000, // 1500 * 100
            note: "I sent an offer for US$1,500.00",
          },
        },
      })
    })

    // Check that the context was updated
    expect(mockSetOfferAmountComplete).toHaveBeenCalled()
  })

  it("renders the expected form for exact price artworks", async () => {
    renderWithRelay({
      Viewer: () => ({
        me: {
          order: MOCK_EXACT_PRICE_ORDER,
        },
      }),
    })

    // Should show preset options for exact price
    expect(screen.getByText("List price")).toBeInTheDocument()
    expect(screen.getByText("10% below list price")).toBeInTheDocument()
    expect(screen.getByText("20% below list price")).toBeInTheDocument()
    expect(screen.getByText("Other amount")).toBeInTheDocument()

    // Check for formatted prices
    expect(
      screen.getByText(content => content.includes("5,000")),
    ).toBeInTheDocument()
    expect(
      screen.getByText(content => content.includes("4,500")),
    ).toBeInTheDocument()
    expect(
      screen.getByText(content => content.includes("4,000")),
    ).toBeInTheDocument()
  })

  it("allows custom amount input for price range offers", async () => {
    renderWithRelay({
      Viewer: () => ({
        me: {
          order: MOCK_PRICE_RANGE_ORDER,
        },
      }),
    })

    // Click on "Other amount" radio button
    const otherAmountRadio = screen.getByText("Other amount")
    fireEvent.click(otherAmountRadio)

    // Custom input should appear
    await waitFor(() => {
      expect(screen.getByTitle("Your offer")).toBeInTheDocument()
    })

    // Enter custom amount
    const customInput = screen.getByTitle("Your offer")
    fireEvent.change(customInput, { target: { value: "1800" } })

    // Submit the offer
    const continueButton = screen.getByRole("button", {
      name: "Save and Continue",
    })
    fireEvent.click(continueButton)

    await waitFor(() => {
      expect(mockSubmitMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            orderId: "order-id",
            amountCents: 180000,
            note: "I sent an offer for US$1,800.00",
          },
        },
      })
    })
  })

  it("allows custom note input", async () => {
    renderWithRelay({
      Viewer: () => ({
        me: {
          order: MOCK_PRICE_RANGE_ORDER,
        },
      }),
    })

    // Select midpoint offer
    const midPointRadio = screen.getByText("Midpoint")
    fireEvent.click(midPointRadio)

    // Enter custom note
    const noteTextArea = screen.getByTitle("Note (recommended)")
    fireEvent.change(noteTextArea, {
      target: { value: "I really love this artwork!" },
    })

    // Submit the offer
    const continueButton = screen.getByRole("button", {
      name: "Save and Continue",
    })
    fireEvent.click(continueButton)

    await waitFor(() => {
      expect(mockSubmitMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            orderId: "order-id",
            amountCents: 150000,
            note: "I really love this artwork!",
          },
        },
      })
    })
  })
})
