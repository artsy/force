import { fireEvent, screen } from "@testing-library/react"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { PriceQueryRenderer } from "Components/Alert/Components/Filters/Price"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

describe("PriceFilter", () => {
  let alertContext

  const PriceFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <PriceQueryRenderer />
  }

  const TestRenderer = ({ initialCriteria = {} }) => {
    return (
      <AlertProvider visible initialCriteria={initialCriteria}>
        <PriceFilterTestComponent />
      </AlertProvider>
    )
  }

  it("sets price range and only updates alert context", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: () => <TestRenderer />,
    })

    renderWithRelay()

    expect(screen.getByText("Price Range")).toBeInTheDocument()

    fireEvent.input(screen.queryAllByLabelText("Min price")[1], {
      target: { valueAsNumber: 1000 },
    })
    fireEvent.input(screen.queryAllByLabelText("Max price")[1], {
      target: { valueAsNumber: 10000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("1000-10000")
  })

  it("sets only max price value", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: () => <TestRenderer />,
    })

    renderWithRelay()

    fireEvent.input(screen.queryAllByLabelText("Max price")[1], {
      target: { valueAsNumber: 10000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("*-10000")
  })

  it("sets only min price value", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: () => <TestRenderer />,
    })

    renderWithRelay()

    fireEvent.input(screen.queryAllByLabelText("Min price")[1], {
      target: { valueAsNumber: 1000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("1000-*")
  })

  it("fetches aggreagations and renders price range bars", async () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: () => <TestRenderer />,
    })

    const { mockResolveLastOperation } = renderWithRelay()

    await flushPromiseQueue()

    mockResolveLastOperation({
      FilterArtworksConnection: () => ({
        counts: {
          total: 10915,
        },
        aggregations: [
          {
            slice: "SIMPLE_PRICE_HISTOGRAM",
            counts: [
              {
                name: "0",
                value: "42",
                count: 5542,
              },
              {
                name: "50000",
                value: "424242",
                count: 704,
              },
            ],
          },
        ],
      }),
    })

    expect(screen.getByText("$0")).toBeInTheDocument()
    expect(screen.getByText("$50000+")).toBeInTheDocument()
  })
})
