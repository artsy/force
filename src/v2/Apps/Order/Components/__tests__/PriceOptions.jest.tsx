import { PriceOptionsFragmentContainer } from "../PriceOptions"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { configure, fireEvent, screen, within } from "@testing-library/react"
import { PriceOptions_Test_Query } from "v2/__generated__/PriceOptions_Test_Query.graphql"

configure({ testIdAttribute: "data-test" })

jest.unmock("react-relay")

const setValue = jest.fn()
const onFocus = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<PriceOptions_Test_Query>({
  Component: props => (
    <PriceOptionsFragmentContainer
      artwork={props.artwork}
      setValue={setValue}
      onFocus={onFocus}
    />
  ),
  query: graphql`
    query PriceOptions_Test_Query {
      artwork(id: "xxx") {
        ...PriceOptions_artwork
      }
    }
  `,
})

describe("PriceOptions - Range", () => {
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
  })
  it("renders all radio options", () => {
    const radios = screen.queryAllByTestId("price-option")
    expect(radios).toHaveLength(4)
  })
  it("correctly formats values", () => {
    const radios = screen.queryAllByTestId("price-option")
    expect(radios[0]).toHaveTextContent("$100.00")
    expect(radios[1]).toHaveTextContent("$150.00")
    expect(radios[2]).toHaveTextContent("$200.00")
    expect(radios[3]).toHaveTextContent("Different amount")
  })
  it("fires click event with correct value", () => {
    const radios = screen.queryAllByTestId("price-option")
    fireEvent.click(radios[1])
    expect(radios[1]).toBeChecked()
    expect(setValue).toHaveBeenLastCalledWith(150)
  })
  it("conditionally displays input field", async () => {
    const radios = screen.queryAllByTestId("price-option")
    expect(within(radios[3]).queryByRole("textbox")).not.toBeInTheDocument()
    fireEvent.click(radios[3])
    const input = await within(radios[3]).findByRole("textbox")
    expect(input).toBeInTheDocument()
  })
  it("sets the correct custom value on input", async () => {
    const radios = screen.queryAllByTestId("price-option")
    fireEvent.click(radios[3])
    const input = await within(radios[3]).findByRole("textbox")
    fireEvent.change(input, { target: { value: 1000 } })
    expect(setValue).toHaveBeenLastCalledWith(1000)
  })
})

describe("PriceOptions - Exact", () => {
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
  })
  it("renders all radio options", () => {
    const radios = screen.queryAllByTestId("price-option")
    expect(radios).toHaveLength(4)
  })
  it("correctly formats values", () => {
    const radios = screen.queryAllByTestId("price-option")
    expect(radios[0]).toHaveTextContent("€80.00")
    expect(radios[1]).toHaveTextContent("€85.00")
    expect(radios[2]).toHaveTextContent("€90.00")
    expect(radios[3]).toHaveTextContent("Different amount")
  })
})
