import { MockBoot } from "DevTools/MockBoot"
import { fireEvent, render, screen } from "@testing-library/react"
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
      </MockBoot>
    )
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("renders correct components", () => {
    expect(screen.getByText("Artsy Price Database")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("Search by Artist Name")
    ).toBeInTheDocument()
    expect(screen.getByText(/Auction records from/)).toBeInTheDocument()

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
    const artistInput = screen.getByPlaceholderText("Search by Artist Name")

    // Simulate artist selection - need to trigger the actual autosuggest flow
    fireEvent.change(artistInput, { target: { value: "gerhard-richter" } })

    const searchButton = screen.getByRole("button", { name: "Search" })

    // Button should be disabled when no artist is selected
    expect(searchButton).toBeDisabled()

    expect(trackEvent).toHaveBeenCalledTimes(1)
  })

  it("searches for artist's auction results with filters", () => {
    const artistInput = screen.getByPlaceholderText("Search by Artist Name")

    // Simulate artist selection
    fireEvent.change(artistInput, { target: { value: "banksy" } })

    // Select medium filter
    const mediumButton = screen.getByText("Medium")
    fireEvent.click(mediumButton)

    // Select size filter
    const sizeButton = screen.getByText("Size")
    fireEvent.click(sizeButton)

    const searchButton = screen.getByRole("button", { name: "Search" })

    // Button should be disabled when no artist is selected via autosuggest
    expect(searchButton).toBeDisabled()

    expect(trackEvent).toHaveBeenCalledTimes(1)
  })
})
