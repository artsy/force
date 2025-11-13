import { MyBidsBidHeaderFragmentContainer } from "Apps/Auctions/Components/MyBids/MyBidsBidHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { MyBidsBidHeaderTestQuery } from "__generated__/MyBidsBidHeaderTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyBidsBidHeaderFragmentContainer", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL<MyBidsBidHeaderTestQuery>({
    Component: (props: any) => {
      return <MyBidsBidHeaderFragmentContainer sale={props.sale} />
    },
    query: graphql`
      query MyBidsBidHeaderTestQuery @relay_test_operation {
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
    renderWithRelay({
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

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/auction/saleSlug")

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("src", "coverImageResizedSrc")
    expect(image).toHaveAttribute("srcset", "coverImageResizedSrcSet")

    expect(screen.getByText("partnerName")).toBeInTheDocument()
    expect(screen.getByText("saleName")).toBeInTheDocument()
    expect(screen.getByText("formattedStartDateTime")).toBeInTheDocument()
  })

  it("tracks clicks", () => {
    renderWithRelay()

    const link = screen.getByRole("link")
    fireEvent.click(link)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedAuctionGroup",
      context_module: "yourActiveBids",
      destination_page_owner_type: "sale",
      type: "thumbnail",
    })
  })
})
