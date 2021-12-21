import { PriceOptionsFragmentContainer } from "../PriceOptions"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { fireEvent, screen, within } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { PriceOptions_Test_Query } from "v2/__generated__/PriceOptions_Test_Query.graphql"

jest.unmock("react-relay")

const setValue = jest.fn()
const onFocus = jest.fn()
const mockUseTracking = useTracking as jest.Mock

const { renderWithRelay } = setupTestWrapperTL<PriceOptions_Test_Query>({
  Component: props => (
    <PriceOptionsFragmentContainer
      artwork={props.artwork}
      order={props.order!}
      setValue={setValue}
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

describe("PriceOptions - Range", () => {
  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
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
    expect(setValue).toHaveBeenLastCalledWith(150)
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
    expect(setValue).toHaveBeenLastCalledWith(1000)
  })
})

describe("PriceOptions - Exact", () => {
  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
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
})
