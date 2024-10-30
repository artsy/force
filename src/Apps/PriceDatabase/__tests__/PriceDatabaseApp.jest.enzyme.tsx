import { Button, MultiSelect } from "@artsy/palette"
import { mount, ReactWrapper } from "enzyme"
import { HeadProvider } from "react-head"
import { createMockEnvironment } from "relay-test-utils"
import { PriceDatabaseArtistAutosuggest } from "./../Components/PriceDatabaseArtistAutosuggest"
import { PriceDatabase } from "./../PriceDatabase"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"

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
  let wrapper: ReactWrapper
  let mockEnvironment = createMockEnvironment()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })

    wrapper = mount(
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
    expect(wrapper.find("PriceDatabaseMeta").length).toBe(1)
    expect(wrapper.find("PriceDatabaseSearch").length).toBe(1)
    expect(wrapper.find("PriceDatabaseBenefits").length).toBe(1)

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
    wrapper
      .find(PriceDatabaseArtistAutosuggest)
      .props()
      .onChange("gerhard-richter")
    wrapper.find(Button).simulate("click")

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/artist/gerhard-richter/auction-results?scroll_to_market_signals=true"
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
    wrapper.find(PriceDatabaseArtistAutosuggest).props().onChange("banksy")

    const mediumFilter = wrapper.find(MultiSelect).at(0)
    mediumFilter.props().onSelect([{ value: "Painting", text: "Painting" }])

    const sizeFilter = wrapper.find(MultiSelect).at(1)
    sizeFilter.props().onSelect([
      { value: "SMALL", text: "SMALL" },
      { value: "MEDIUM", text: "MEDIUM" },
    ])

    wrapper.find(Button).simulate("click")

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/artist/banksy/auction-results?categories%5B0%5D=Painting&sizes%5B0%5D=SMALL&sizes%5B1%5D=MEDIUM&scroll_to_market_signals=true"
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
