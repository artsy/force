import { PriceOptionsFragmentContainer } from "../PriceOptions"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { fireEvent, screen, within } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { PriceOptions_Test_Query } from "v2/__generated__/PriceOptions_Test_Query.graphql"

jest.unmock("react-relay")

const onChange = jest.fn()
const onFocus = jest.fn()
const trackEvent = jest.fn()

const mockUseTracking = useTracking as jest.Mock

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL<PriceOptions_Test_Query>({
  Component: props => (
    <PriceOptionsFragmentContainer
      artwork={props.artwork}
      order={props.order!}
      onChange={onChange}
      onFocus={onFocus}
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
      })
      radios = screen.getAllByRole("radio")
    })
    it("renders all radio options", () => {
      expect(radios).toHaveLength(4)
    })
    it("correctly formats values", () => {
      expect(radios[0]).toHaveTextContent("US$100.00")
      expect(radios[1]).toHaveTextContent("US$150.00")
      expect(radios[2]).toHaveTextContent("US$200.00")
      expect(radios[3]).toHaveTextContent("Different amount")
    })
    it("fires click event with correct value", () => {
      fireEvent.click(radios[1])
      expect(radios[1]).toBeChecked()
      expect(onChange).toHaveBeenLastCalledWith(150)
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
          getTrackingObject("Low-end of range", 100, "USD")
        )
      )
      fireEvent.click(radios[1])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(getTrackingObject("Midpoint", 150, "USD"))
      )
      fireEvent.click(radios[2])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject("Top-end of range", 200, "USD")
        )
      )
      fireEvent.click(radios[3])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(getTrackingObject("Different amount", 0, "USD"))
      )
    })
    it("display and tracks the offer too low notice", async () => {
      fireEvent.click(radios[3])
      const input = await within(radios[3]).findByRole("textbox")
      fireEvent.change(input, { target: { value: 50 } })
      fireEvent.blur(input)
      const notice = await screen.findByText(
        "We recommend changing your offer to US$100.00."
      )
      expect(notice).toBeInTheDocument()
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          action_type: "Viewed offer too low",
          flow: "Make offer",
        })
      )
    })
    it("selects the first option when clicking on the low price notice", async () => {
      fireEvent.click(radios[3])
      const input = await within(radios[3]).findByRole("textbox")
      fireEvent.change(input, { target: { value: 50 } })
      fireEvent.blur(input)
      const notice = await screen.findByText(
        "We recommend changing your offer to US$100.00."
      )
      fireEvent.click(notice)
      const selected = screen.getAllByRole("radio", { checked: true })
      expect(selected[0]).toHaveTextContent("US$100.00")
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject("We recommend changing your offer", 100, "USD")
        )
      )
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
      })
      radios = screen.getAllByRole("radio")
    })
    it("renders all radio options", () => {
      expect(radios).toHaveLength(4)
    })
    it("correctly formats values", () => {
      expect(radios[0]).toHaveTextContent("€80.00")
      expect(radios[1]).toHaveTextContent("€85.00")
      expect(radios[2]).toHaveTextContent("€90.00")
      expect(radios[3]).toHaveTextContent("Different amount")
    })
    it("correctly tracks the clicking of an option", () => {
      fireEvent.click(radios[0])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject("20% below the list price", 80, "EUR")
        )
      )
      fireEvent.click(radios[1])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject("15% below the list price", 85, "EUR")
        )
      )
      fireEvent.click(radios[2])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(
          getTrackingObject("10% below the list price", 90, "EUR")
        )
      )
      fireEvent.click(radios[3])
      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining(getTrackingObject("Different amount", 0, "EUR"))
      )
    })
  })
})
