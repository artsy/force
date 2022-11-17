import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionDetailsFragmentContainer } from "../AuctionDetails"
import { AuctionDetailsTestQuery } from "__generated__/AuctionDetailsTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking", () => ({
  useTracking: jest.fn(),
}))

jest.mock("../AuctionInfoSidebar", () => ({
  AuctionInfoSidebarFragmentContainer: () => null,
}))

describe("AuctionDetails", () => {
  const mockUseTracking = useTracking as jest.Mock

  const { getWrapper } = setupTestWrapper<AuctionDetailsTestQuery>({
    Component: (props: any) => {
      return <AuctionDetailsFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionDetailsTestQuery @relay_test_operation {
        sale(id: "foo") {
          ...AuctionDetails_sale
        }
        viewer {
          ...AuctionDetails_viewer @arguments(saleID: "saleID")
        }
      }
    `,
  })

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("shows correct title", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        name: "Auction Name",
      }),
    })
    expect(wrapper.text()).toContain("Auction Name")
  })

  it("shows register button", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        name: "Auction Name",
        isRegistrationClosed: false,
      }),
    })
    expect(wrapper.find("RegisterButton").length).toBe(1)
  })

  it.skip("shows formatted start time", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        auctionsDetailFormattedStartDateTime: "Mar 22, 2022 • 9:22pm GMT",
      }),
    })
    expect(wrapper.text()).toContain("Mar 22, 2022 • 9:22pm GMT")
  })

  it("shows add to calendar button", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        isClosed: false,
      }),
    })
    expect(wrapper.find("AddToCalendar").length).toBe(1)
  })

  it("shows sale description", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        description: "Auction description",
      }),
    })
    expect(wrapper.text()).toContain("Auction description")
  })

  it("shows the sidebar info", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("AuctionInfoSidebarFragmentContainer").length).toBe(1)
  })

  describe.only("cascading end time", () => {
    it("singular form", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          isClosed: false,
          cascadingEndTimeIntervalMinutes: 5,
        }),
        SaleArtworksConnection: () => ({
          counts: {
            total: 1,
          },
        }),
      })

      const message = "Lot close at 5-minute intervals"
      expect(wrapper.text()).toContain(message)
    })

    it("plural form", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          isClosed: false,
          cascadingEndTimeIntervalMinutes: 5,
        }),
        SaleArtworksConnection: () => ({
          counts: {
            total: 5,
          },
        }),
      })

      const message = "Lots close at 5-minute intervals"
      expect(wrapper.text()).toContain(message)
    })
  })
})
