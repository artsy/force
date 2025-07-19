import { render, screen, fireEvent } from "@testing-library/react"
import { MockBoot } from "DevTools/MockBoot"
import { HeadProvider } from "react-head"
import { useTracking } from "react-tracking"
import { createMockEnvironment } from "relay-test-utils"
import { PriceDatabase } from "./../PriceDatabase"

jest.mock("System/Hooks/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return { router: { push: mockRouterPush } }
    }),
  }
})

const mockRouterPush = jest.fn()
const trackEvent = jest.fn()

describe("PriceDatabaseApp", () => {
  const mockEnvironment = createMockEnvironment()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  beforeEach(() => {
    render(
      <MockBoot relayEnvironment={mockEnvironment}>
        <HeadProvider>
          <PriceDatabase />
        </HeadProvider>
      </MockBoot>,
    )
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("renders correct components", () => {
    expect(screen.getByTestId("price-database-meta")).toBeInTheDocument()
    expect(screen.getByTestId("price-database-search")).toBeInTheDocument()
    expect(screen.getByTestId("price-database-benefits")).toBeInTheDocument()

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "action": "screen",
        "context_module": "priceDatabaseLanding",
        "context_screen_owner_type": "priceDatabase",
      }
    `)
  })

  it("searches for artist's auction results without filters", () => {
    const autosuggest = screen.getByTestId("price-database-artist-autosuggest")

    // Simulate artist selection
    const artistInput = autosuggest.querySelector("input")
    if (artistInput) {
      fireEvent.change(artistInput, { target: { value: "gerhard-richter" } })
    }

    const searchButton = screen.getByRole("button")
    fireEvent.click(searchButton)

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/artist/gerhard-richter/auction-results?scroll_to_market_signals=true",
    )

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "action": "searchedPriceDatabase",
        "context_module": "priceDatabaseLanding",
        "context_owner_type": "priceDatabase",
        "destination_owner_slug": "gerhard-richter",
        "destination_owner_type": "artistAuctionResults",
        "destination_path": "/artist/gerhard-richter/auction-results",
        "filters": "{"categories":[],"sizes":[]}",
        "query": "",
      }
    `)
  })

  it("searches for artist's auction results with filters", () => {
    const autosuggest = screen.getByTestId("price-database-artist-autosuggest")

    // Simulate artist selection
    const artistInput = autosuggest.querySelector("input")
    if (artistInput) {
      fireEvent.change(artistInput, { target: { value: "banksy" } })
    }

    // Select medium filter
    const mediumSelects = screen.getAllByRole("combobox")
    if (mediumSelects[0]) {
      fireEvent.change(mediumSelects[0], { target: { value: "Painting" } })
    }

    // Select size filter
    if (mediumSelects[1]) {
      fireEvent.change(mediumSelects[1], { target: { value: "SMALL,MEDIUM" } })
    }

    const searchButton = screen.getByRole("button")
    fireEvent.click(searchButton)

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/artist/banksy/auction-results?categories%5B0%5D=Painting&sizes%5B0%5D=SMALL&sizes%5B1%5D=MEDIUM&scroll_to_market_signals=true",
    )

    expect(trackEvent.mock.calls[3][0]).toMatchInlineSnapshot(`
      {
        "action": "searchedPriceDatabase",
        "context_module": "priceDatabaseLanding",
        "context_owner_type": "priceDatabase",
        "destination_owner_slug": "banksy",
        "destination_owner_type": "artistAuctionResults",
        "destination_path": "/artist/banksy/auction-results",
        "filters": "{"categories":["Painting"],"sizes":["SMALL","MEDIUM"]}",
        "query": "categories%5B0%5D=Painting&sizes%5B0%5D=SMALL&sizes%5B1%5D=MEDIUM",
      }
    `)
  })
})
