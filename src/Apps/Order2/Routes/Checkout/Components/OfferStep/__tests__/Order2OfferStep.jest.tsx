import { fireEvent, screen, waitFor } from "@testing-library/react"
import { Order2OfferStep } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Order2OfferStep"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2AddInitialOfferMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2OfferStepTestQuery } from "__generated__/Order2OfferStepTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")
jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation",
)
jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation",
)

const mockUseCheckoutContext = useCheckoutContext as jest.Mock
const mockUseOrder2AddInitialOfferMutation =
  useOrder2AddInitialOfferMutation as jest.Mock
const mockUseOrder2UnsetOrderFulfillmentOptionMutation =
  useOrder2UnsetOrderFulfillmentOptionMutation as jest.Mock

const MOCK_PRICE_RANGE_ORDER = {
  internalID: "order-id",
  mode: "OFFER",
  source: "artwork_page",
  buyerStateExpiresAt: null,
  currencyCode: "USD",
  selectedFulfillmentOption: null,
  pendingOffer: null,
  lineItems: [
    {
      artwork: {
        slug: "artwork-slug",
        priceDisplay: "range",
        isPriceRange: true,
        listPrice: {
          __typename: "PriceRange",
          maxPrice: { major: 2000 },
          minPrice: { major: 1000 },
        },
        editionSets: [],
        price: "$1,000 - $2,000",
      },
      artworkOrEditionSet: {
        __typename: "Artwork",
        price: "$1,000 - $2,000",
        listPrice: {
          __typename: "PriceRange",
          maxPrice: { major: 2000 },
          minPrice: { major: 1000 },
        },
      },
    },
  ],
}

const MOCK_EXACT_PRICE_ORDER = {
  internalID: "order-id",
  mode: "OFFER",
  source: "artwork_page",
  buyerStateExpiresAt: null,
  currencyCode: "USD",
  selectedFulfillmentOption: null,
  pendingOffer: null,
  lineItems: [
    {
      artwork: {
        slug: "artwork-slug",
        priceDisplay: "exact",
        isPriceRange: false,
        listPrice: {
          __typename: "Money",
          major: 5000,
        },
        editionSets: [],
        price: "$5,000",
      },
      listPrice: {
        __typename: "Money",
        major: 5000,
      },
      artworkOrEditionSet: {
        __typename: "Artwork",
        listPrice: {
          __typename: "Money",
          major: 5000,
        },
      },
    },
  ],
}

const MOCK_HIDDEN_PRICE_ORDER = {
  internalID: "order-id",
  mode: "OFFER",
  currencyCode: "USD",
  source: "artwork_page",
  buyerStateExpiresAt: null,
  selectedFulfillmentOption: null,
  pendingOffer: null,
  lineItems: [
    {
      artwork: {
        slug: "artwork-slug",
        priceDisplay: "hidden",
        isPriceRange: false,
        isPriceHidden: true,
        listPrice: null,
        editionSets: [],
        price: null,
      },
    },
  ],
}

const MOCK_EDITION_SET_PRICE_RANGE_ORDER = {
  internalID: "order-id",
  mode: "OFFER",
  source: "artwork_page",
  buyerStateExpiresAt: null,
  currencyCode: "USD",
  selectedFulfillmentOption: null,
  pendingOffer: null,
  lineItems: [
    {
      artwork: {
        slug: "artwork-slug",
        priceDisplay: "range",
        isPriceRange: true,
        listPrice: {
          __typename: "PriceRange",
          maxPrice: { major: 3000 },
          minPrice: { major: 1500 },
        },
        editionSets: [],
        price: "$1,500 - $3,000",
      },
      artworkOrEditionSet: {
        __typename: "EditionSet",
        price: "$1,500 - $3,000",
        listPrice: {
          __typename: "PriceRange",
          maxPrice: { major: 3000 },
          minPrice: { major: 1500 },
        },
      },
    },
  ],
}

const MOCK_PARTNER_OFFER_ORDER = {
  internalID: "order-id",
  mode: "OFFER",
  source: "PARTNER_OFFER",
  currencyCode: "USD",
  buyerStateExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  selectedFulfillmentOption: null,
  pendingOffer: null,
  lineItems: [
    {
      artwork: {
        slug: "artwork-slug",
        priceDisplay: "exact",
        isPriceRange: false,
        listPrice: {
          __typename: "Money",
          major: 5000,
        },
        editionSets: [],
        price: "$5,000",
      },
      listPrice: {
        __typename: "Money",
        major: 4500, // Partner offer price
      },
      artworkOrEditionSet: {
        __typename: "Artwork",
        listPrice: {
          __typename: "Money",
          major: 5000, // Original artwork price
        },
      },
    },
  ],
}

describe("Order2OfferStep", () => {
  let mockSetOfferAmountComplete: jest.Mock
  let mockSubmitMutation: jest.Mock
  let mockUnsetFulfillmentOptionMutation: jest.Mock
  let mockCheckoutTracking: {
    clickedOfferOption: jest.Mock
    clickedOrderProgression: jest.Mock
  }

  beforeEach(() => {
    mockSetOfferAmountComplete = jest.fn()
    mockSubmitMutation = jest.fn(async () => ({
      createBuyerOffer: {
        offerOrError: { offer: { internalID: "offer-id" } },
      },
    }))
    mockUnsetFulfillmentOptionMutation = jest.fn(async () => ({
      unsetOrderFulfillmentOption: {
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: { internalID: "order-id" },
        },
      },
    }))
    mockCheckoutTracking = {
      clickedOfferOption: jest.fn(),
      clickedOrderProgression: jest.fn(),
    }

    mockUseCheckoutContext.mockReturnValue({
      steps: [{ name: "OFFER_AMOUNT", state: "ACTIVE" }],
      setOfferAmountComplete: mockSetOfferAmountComplete,
      checkoutTracking: mockCheckoutTracking,
      messages: {},
      setSectionErrorMessage: jest.fn(),
    })
    mockUseOrder2AddInitialOfferMutation.mockReturnValue({
      submitMutation: mockSubmitMutation,
    })
    mockUseOrder2UnsetOrderFulfillmentOptionMutation.mockReturnValue({
      submitMutation: mockUnsetFulfillmentOptionMutation,
    })
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
            orderID: "order-id",
            amountMinor: 150000, // 1500 * 100
            note: "",
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
            orderID: "order-id",
            amountMinor: 180000,
            note: "",
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
            orderID: "order-id",
            amountMinor: 150000,
            note: "I really love this artwork!",
          },
        },
      })
    })
  })

  describe("Order2HiddenPriceOfferForm", () => {
    it("renders the hidden price form with offer input", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_HIDDEN_PRICE_ORDER,
          },
        }),
      })

      // Check that the offer input is rendered
      expect(screen.getByTitle("Your offer")).toBeInTheDocument()

      // Check for note section
      expect(screen.getByText("Offer note")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Additional context to help the gallery evaluate your offer.",
        ),
      ).toBeInTheDocument()

      // Check for note textarea
      expect(screen.getByTitle("Note (recommended)")).toBeInTheDocument()

      // Check for continue button
      expect(
        screen.getByRole("button", { name: "Save and Continue" }),
      ).toBeInTheDocument()
    })

    it("allows entering a custom offer amount and submitting", async () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_HIDDEN_PRICE_ORDER,
          },
        }),
      })

      // Enter offer amount
      const offerInput = screen.getByTitle("Your offer")
      fireEvent.change(offerInput, { target: { value: "3000" } })

      // Click continue
      const continueButton = screen.getByRole("button", {
        name: "Save and Continue",
      })
      fireEvent.click(continueButton)

      await waitFor(() => {
        expect(mockSubmitMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              orderID: "order-id",
              amountMinor: 300000,
              note: "",
            },
          },
        })
      })

      // Check that the context was updated
      expect(mockSetOfferAmountComplete).toHaveBeenCalled()
    })

    it("allows custom note input for hidden price offers", async () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_HIDDEN_PRICE_ORDER,
          },
        }),
      })

      // Enter offer amount
      const offerInput = screen.getByTitle("Your offer")
      fireEvent.change(offerInput, { target: { value: "2500" } })

      // Enter custom note
      const noteTextArea = screen.getByTitle("Note (recommended)")
      fireEvent.change(noteTextArea, {
        target: { value: "This piece would be perfect for my collection!" },
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
              orderID: "order-id",
              amountMinor: 250000,
              note: "This piece would be perfect for my collection!",
            },
          },
        })
      })
    })

    it("shows error when submitting without entering an offer amount", async () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_HIDDEN_PRICE_ORDER,
          },
        }),
      })

      // Click continue without entering an offer
      const continueButton = screen.getByRole("button", {
        name: "Save and Continue",
      })
      fireEvent.click(continueButton)

      // Mutation should not be called
      await waitFor(() => {
        expect(mockSubmitMutation).not.toHaveBeenCalled()
      })

      // Form should mark as dirty to show validation
      expect(mockSetOfferAmountComplete).not.toHaveBeenCalled()
    })

    it("disables submit button while submitting", async () => {
      // Mock a delayed submission to ensure we can test the disabled state
      const delayedMock = jest.fn(
        () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve({
                createBuyerOffer: {
                  offerOrError: { offer: { internalID: "offer-id" } },
                },
              })
            }, 100)
          }),
      )
      mockUseOrder2AddInitialOfferMutation.mockReturnValue({
        submitMutation: delayedMock,
      })

      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_HIDDEN_PRICE_ORDER,
          },
        }),
      })

      // Enter offer amount
      const offerInput = screen.getByTitle("Your offer")
      fireEvent.change(offerInput, { target: { value: "4000" } })

      // Click continue
      const continueButton = screen.getByRole("button", {
        name: "Save and Continue",
      })
      fireEvent.click(continueButton)

      // Button should be disabled during submission
      await waitFor(() => {
        expect(continueButton).toBeDisabled()
      })

      await waitFor(() => {
        expect(delayedMock).toHaveBeenCalled()
      })
    })
  })

  describe("Tracking", () => {
    it("tracks clickedOfferOption with 'Midpoint' when selecting a price range midpoint", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_PRICE_RANGE_ORDER,
          },
        }),
      })

      // Select the midpoint option
      const midPointRadio = screen.getByText("Midpoint")
      fireEvent.click(midPointRadio)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        1500,
        "Midpoint",
      )
    })

    it("tracks clickedOfferOption with 'Top-end of range' when selecting price range maximum", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_PRICE_RANGE_ORDER,
          },
        }),
      })

      // Select the top-end option
      const topEndRadio = screen.getByText("Top-end of range")
      fireEvent.click(topEndRadio)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        2000,
        "Top-end of range",
      )
    })

    it("tracks clickedOfferOption with 'Low-end of range' when selecting price range minimum", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_PRICE_RANGE_ORDER,
          },
        }),
      })

      // Select the low-end option
      const lowEndRadio = screen.getByText("Low-end of range")
      fireEvent.click(lowEndRadio)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        1000,
        "Low-end of range",
      )
    })

    it("tracks clickedOfferOption with 'List price' when selecting list price", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_EXACT_PRICE_ORDER,
          },
        }),
      })

      // Select the list price option
      const listPriceRadio = screen.getByText("List price")
      fireEvent.click(listPriceRadio)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        5000,
        "List price",
      )
    })

    it("tracks clickedOfferOption with '10% below list price' when selecting 10% below", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_EXACT_PRICE_ORDER,
          },
        }),
      })

      // Select the 10% below option
      const tenPercentBelowRadio = screen.getByText("10% below list price")
      fireEvent.click(tenPercentBelowRadio)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        4500,
        "10% below list price",
      )
    })

    it("tracks clickedOfferOption with '20% below list price' when selecting 20% below", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_EXACT_PRICE_ORDER,
          },
        }),
      })

      // Select the 20% below option
      const twentyPercentBelowRadio = screen.getByText("20% below list price")
      fireEvent.click(twentyPercentBelowRadio)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        4000,
        "20% below list price",
      )
    })

    it("tracks clickedOfferOption with 'Custom amount' for custom offers", async () => {
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

      // Blur the input to trigger the tracking
      fireEvent.blur(customInput)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        1800,
        "Custom amount",
      )
    })

    it("tracks clickedOrderProgression when submitting an offer", async () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_PRICE_RANGE_ORDER,
          },
        }),
      })

      // Select an offer
      const midPointRadio = screen.getByText("Midpoint")
      fireEvent.click(midPointRadio)

      // Click continue
      const continueButton = screen.getByRole("button", {
        name: "Save and Continue",
      })
      fireEvent.click(continueButton)

      await waitFor(() => {
        expect(
          mockCheckoutTracking.clickedOrderProgression,
        ).toHaveBeenCalledWith("ordersOffer")
      })
    })
  })

  describe("Edition Sets", () => {
    it("renders price range form for edition sets", async () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_EDITION_SET_PRICE_RANGE_ORDER,
          },
        }),
      })

      // Check that the price range options are rendered
      expect(screen.getByText("Top-end of range")).toBeInTheDocument()
      expect(screen.getByText("Midpoint")).toBeInTheDocument()
      expect(screen.getByText("Low-end of range")).toBeInTheDocument()

      // Check for formatted currency text
      expect(
        screen.getByText((content, element) => {
          return content.includes("3,000")
        }),
      ).toBeInTheDocument()
      expect(
        screen.getByText((content, element) => {
          return content.includes("2,250")
        }),
      ).toBeInTheDocument()
      expect(
        screen.getByText((content, element) => {
          return content.includes("1,500")
        }),
      ).toBeInTheDocument()
    })

    it("allows submitting an offer for edition sets", async () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_EDITION_SET_PRICE_RANGE_ORDER,
          },
        }),
      })

      // Select an offer
      const topEndRadio = screen.getByText("Top-end of range")
      fireEvent.click(topEndRadio)

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
              orderID: "order-id",
              amountMinor: 300000, // 3000 * 100
              note: "",
            },
          },
        })
      })

      // Check that the context was updated
      expect(mockSetOfferAmountComplete).toHaveBeenCalled()
    })
  })

  describe("Fulfillment Option Unsetting", () => {
    it("unsets fulfillment option before submitting offer when one exists", async () => {
      const orderWithFulfillmentOption = {
        ...MOCK_PRICE_RANGE_ORDER,
        selectedFulfillmentOption: {
          type: "PICKUP",
        },
      }

      renderWithRelay({
        Viewer: () => ({
          me: {
            order: orderWithFulfillmentOption,
          },
        }),
      })

      // Select an offer
      const midPointRadio = screen.getByText("Midpoint")
      fireEvent.click(midPointRadio)

      // Click continue
      const continueButton = screen.getByRole("button", {
        name: "Save and Continue",
      })
      fireEvent.click(continueButton)

      await waitFor(() => {
        // Verify unset was called
        expect(mockUnsetFulfillmentOptionMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              id: "order-id",
            },
          },
        })

        // Verify offer mutation was also called
        expect(mockSubmitMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              orderID: "order-id",
              amountMinor: 150000,
              note: "",
            },
          },
        })
      })
    })
  })

  describe("Partner Offer", () => {
    it("displays 'Gallery offer' label instead of 'List price' for partner offers", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_PARTNER_OFFER_ORDER,
          },
        }),
      })

      // Should show "Gallery offer" instead of "List price"
      expect(
        screen.getByText((content, element) => {
          return content.includes("Gallery offer") && content.includes("Exp.")
        }),
      ).toBeInTheDocument()
      expect(screen.queryByText("List price")).not.toBeInTheDocument()

      // Should show modified descriptions (these are in separate Text elements)
      expect(
        screen.getByText((content, element) => {
          return content.includes("10% below gallery offer")
        }),
      ).toBeInTheDocument()
      expect(
        screen.getByText((content, element) => {
          return content.includes("20% below gallery offer")
        }),
      ).toBeInTheDocument()
    })

    it("displays timer with expiration time for active partner offers", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_PARTNER_OFFER_ORDER,
          },
        }),
      })

      // Timer should be displayed
      expect(
        screen.getByText((content, element) => {
          return content.includes("Exp.")
        }),
      ).toBeInTheDocument()
    })

    it("tracks clickedOfferOption with 'Gallery offer' when selecting partner offer", () => {
      renderWithRelay({
        Viewer: () => ({
          me: {
            order: MOCK_PARTNER_OFFER_ORDER,
          },
        }),
      })

      // Select the gallery offer option - it's in the text that includes timer
      const galleryOfferText = screen.getByText((content, element) => {
        return content.includes("Gallery offer") && content.includes("Exp.")
      })
      fireEvent.click(galleryOfferText)

      expect(mockCheckoutTracking.clickedOfferOption).toHaveBeenCalledWith(
        "USD",
        "order-id",
        4500,
        "Gallery offer",
      )
    })
  })
})
