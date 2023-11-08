import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MyBidsBidHeaderFragmentContainer } from "Apps/Auctions/Components/MyBids/MyBidsBidHeader"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyBidsBidHeaderFragmentContainer", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <MyBidsBidHeaderFragmentContainer sale={props.sale} />
    },
    query: graphql`
      query MyBidsBidHeader_Test_Query @relay_test_operation {
        sale(id: "foo") {
          ...MyBidsBidHeader_sale
        }
      }
    `,
  })

  beforeAll(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correct components and data", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        coverImage: {
          cropped: {
            src: "coverImageResizedSrc",
            srcSet: "coverImageResizedSrcSet",
          },
        },
        formattedStartDateTime: "formattedStartDateTime",
        name: "saleName",
        partner: {
          name: "partnerName",
        },
        slug: "saleSlug",
      }),
    })

    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").props().to).toBe("/auction/saleSlug")
    expect(wrapper.find("CalendarIcon")).toBeDefined()
    expect(wrapper.find("Image")).toBeDefined()
    expect(wrapper.find("Image").props().src).toEqual("coverImageResizedSrc")
    expect(wrapper.find("Image").props().srcSet).toEqual(
      "coverImageResizedSrcSet"
    )

    const text = wrapper.text()
    expect(text).toContain("partnerName")
    expect(text).toContain("saleName")
    expect(text).toContain("formattedStartDateTime")
  })

  it("tracks clicks", () => {
    const { wrapper } = getWrapper()
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedAuctionGroup",
      context_module: "yourActiveBids",
      destination_page_owner_type: "sale",
      type: "thumbnail",
    })
  })
})
