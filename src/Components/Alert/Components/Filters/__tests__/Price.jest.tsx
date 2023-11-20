import { fireEvent, render, screen } from "@testing-library/react"
import {
  AlertProvider,
  useAlertContext,
} from "Components/Alert/Hooks/useAlertContext"
import { PriceQueryRenderer } from "Components/Alert/Components/Filters/Price"
import { MockBoot } from "DevTools/MockBoot"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.unmock("react-relay")

describe("PriceFilter", () => {
  let alertContext
  const environment = createMockEnvironment()

  const PriceFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <PriceQueryRenderer />
  }

  const renderPriceRangeFilter = (contextProps = {}, initialCriteria = {}) => {
    return render(
      <MockBoot relayEnvironment={environment}>
        <AlertProvider initialCriteria={initialCriteria}>
          <PriceFilterTestComponent />
        </AlertProvider>
      </MockBoot>
    )
  }

  it("sets price range and only updates alert context", () => {
    renderPriceRangeFilter()

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
    renderPriceRangeFilter()

    fireEvent.input(screen.queryAllByLabelText("Max price")[1], {
      target: { valueAsNumber: 10000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("*-10000")
  })

  it("sets only min price value", () => {
    renderPriceRangeFilter()

    fireEvent.input(screen.queryAllByLabelText("Min price")[1], {
      target: { valueAsNumber: 1000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("1000-*")
  })

  it("fetches aggreagations and renders price range bars", async () => {
    renderPriceRangeFilter({}, { artistIDs: ["artist-id"] })

    await flushPromiseQueue()

    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Artist: () => ({
          filterArtworksConnection: {
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
          },
        }),
      })
    )

    expect(screen.getByText("$0")).toBeInTheDocument()
    expect(screen.getByText("$50000+")).toBeInTheDocument()
  })
})
