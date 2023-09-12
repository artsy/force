import { PriceOptionsFragmentContainer } from "Apps/Order/Components/PriceOptions"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { fireEvent, screen, waitFor, within } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { PriceOptions_Test_Query } from "__generated__/PriceOptions_Test_Query.graphql"

jest.unmock("react-relay")

const onChange = jest.fn()
const onFocus = jest.fn()
const trackEvent = jest.fn()
const showError = jest.fn().mockReturnValue(false)

const mockUseTracking = useTracking as jest.Mock

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL<PriceOptions_Test_Query>({
  Component: props => (
    <PriceOptionsFragmentContainer
      artwork={props.artwork}
      order={props.order!}
      onChange={onChange}
      onFocus={onFocus}
      showError={showError()}
    />
  ),
  query: graphql`
    query PriceOptions_Test_Query {
      artwork(id: "artwork-id") {
        ...PriceOptions_artwork
      }
      order: commerceOrder(id: "order-id") {
        ...PriceOptions_order
      }
    }
  `,
})

let radios: HTMLElement[]

const getTrackingObject = (
  offer: string,
  amount: number,
  currency: string
) => ({
  action: "clickedOfferOption",
  flow: "Make offer",
  order_id: '<mock-value-for-field-"internalID">',
  currency,
  offer,
  amount,
})

describe("PriceOptions", () => {
  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))
  })

  describe("Range", () => {
    beforeEach(() => {
      renderWithRelay({
        Artwork: () => ({
          priceCurrency: "USD",
          isPriceRange: true,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 200,
            },
            minPrice: {
              major: 100,
            },
          },
        }),
        CommerceOfferOrder: () => ({
          myLastOffer: {
            amountCents: null,
          },
        }),
      })
      radios = screen.getAllByRole("radio")
    })

    it("renders all radio options", () => {
      expect(radios).toHaveLength(4)
    })
    it("correctly formats values", () => {
      expect(radios[0]).toHaveTextContent("US$200.00")
      expect(radios[1]).toHaveTextContent("US$150.00")
      expect(radios[2]).toHaveTextContent("US$100.00")
      expect(radios[3]).toHaveTextContent("Different amount")
    })
    it("defaults to the correct value", async () => {
      expect(onChange).toHaveBeenCalledWith(200)
      await waitFor(() => expect(radios[0]).toBeChecked())
    })
    it("fires click event with correct value", () => {
      fireEvent.click(radios[1])
      expect(radios[1]).toBeChecked()
      expect(onChange).toHaveBeenCalledWith(150)
    })
    it("conditionally displays input field", async () => {
      expect(within(radios[3]).queryByRole("textbox")).not.toBeInTheDocument()
      fireEvent.click(radios[3])
      const input = await within(radios[3]).findByRole("textbox")
      expect(input).toBeInTheDocument()
    })
    it("sets the correct custom value on input", async () => {
      fireEvent.click(radios[3])
      const input = await within(radios[3]).findByRole("textbox")
      fireEvent.change(input, { target: { value: 1000 } })
      expect(onChange).toHaveBeenLastCalledWith(1000)
    })
    it("correctly tracks the clicking of an option", () => {
      fireEvent.click(radios[0])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject(
            "Top-end of range (high chance of acceptance)",
            200,
            "USD"
          )
        )
      )
      fireEvent.click(radios[1])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject("Midpoint (good chance of acceptance)", 150, "USD")
        )
      )
      fireEvent.click(radios[2])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject(
            "Low-end of range (lower chance of acceptance)",
            100,
            "USD"
          )
        )
      )
      fireEvent.click(radios[3])
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining(getTrackingObject("Different amount", 0, "USD"))
      )
    })
    it("correctly displays and tracks the offer too low notice", async () => {
      fireEvent.click(radios[3])
      const input = await within(radios[3]).findByRole("textbox")
      const notice = await screen.findByText(
        "Offers lower than the displayed price range are often declined. We recommend increasing your offer to US$100.00."
      )
      expect(notice).toBeInTheDocument()
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action_type: "Viewed offer too low",
          flow: "Make offer",
        })
      )
      fireEvent.change(input, { target: { value: 200 } })
      expect(notice).not.toBeInTheDocument()
    })
  })

  describe("Exact", () => {
    beforeEach(() => {
      renderWithRelay({
        Artwork: () => ({
          priceCurrency: "EUR",
          isPriceRange: false,
          listPrice: {
            __typename: "Money",
            major: 100,
          },
        }),
        CommerceOfferOrder: () => ({
          myLastOffer: {
            amountCents: null,
          },
        }),
      })
      radios = screen.getAllByRole("radio")
    })

    it("renders all radio options", () => {
      expect(radios).toHaveLength(4)
    })
    it("correctly formats values", () => {
      expect(radios[0]).toHaveTextContent("€100.00")
      expect(radios[1]).toHaveTextContent("€90.00")
      expect(radios[2]).toHaveTextContent("€80.00")
      expect(radios[3]).toHaveTextContent("Different amount")
    })
    it("defaults to the correct value", async () => {
      expect(onChange).toHaveBeenCalledWith(100)
      await waitFor(() => expect(radios[0]).toBeChecked())
    })
    it("correctly tracks the clicking of an option", async () => {
      fireEvent.click(radios[0])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject(
            "List price (high chance of acceptance)",
            100,
            "EUR"
          )
        )
      )

      fireEvent.click(radios[1])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject(
            "10% below the list price (good chance of acceptance)",
            90,
            "EUR"
          )
        )
      )

      fireEvent.click(radios[2])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject(
            "20% below the list price (substantial reduction, lower chance of acceptance)",
            80,
            "EUR"
          )
        )
      )

      fireEvent.click(radios[3])
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining(getTrackingObject("Different amount", 0, "EUR"))
      )
      const notice = await screen.findByText(
        "Offers less than 20% off the list price are often declined. We recommend increasing your offer to €80.00."
      )
      expect(notice).toBeInTheDocument()
    })
  })

  describe("Error Handling", () => {
    beforeEach(() => {
      showError.mockReturnValueOnce(false).mockReturnValueOnce(true)
      renderWithRelay({
        Artwork: () => ({
          priceCurrency: "AUD",
          isPriceRange: false,
          listPrice: {
            __typename: "Money",
            major: 99,
          },
        }),
        CommerceOfferOrder: () => ({
          myLastOffer: {
            amountCents: null,
          },
        }),
      })
      radios = screen.getAllByRole("radio")
    })

    it("doesn't display an error when none is passed", () => {
      expect(
        screen.queryByText("Offer amount missing or invalid.")
      ).not.toBeInTheDocument()
    })
    it("displays the error and automatically selects the custom value option when an error is passed", async () => {
      await waitFor(() => expect(radios[3]).toBeChecked())

      const selected = await screen.findByRole("radio", { checked: true })

      expect(selected).toBeInTheDocument()
      expect(selected).toHaveTextContent("Different amount")
      expect(selected).toHaveTextContent("Offer amount missing or invalid.")
    })
    it("correctly rounds the values and displays the currency symbol", () => {
      expect(radios[0]).toHaveTextContent("A$99.00") // List price
      expect(radios[1]).toHaveTextContent("A$89.00") // %90 would be A$89.10
      expect(radios[2]).toHaveTextContent("A$79.00") // %80 would be A$79.20
    })
  })

  describe("Custom Price Offer", () => {
    beforeEach(() => {
      renderWithRelay({
        Artwork: () => ({
          priceCurrency: "USD",
          isPriceRange: false,
          listPrice: {
            __typename: "Money",
            major: 100,
          },
        }),
        CommerceOfferOrder: () => ({
          myLastOffer: {
            amountCents: 9500,
          },
        }),
      })
      radios = screen.getAllByRole("radio")
    })

    it("defaults to the custom value if available", async () => {
      await waitFor(() => expect(onChange).toHaveBeenCalledWith(95))

      expect(radios[3]).toBeChecked()

      const input = await within(radios[3]).findByRole("textbox")
      expect(input).toHaveValue("95")
    })
  })
})
