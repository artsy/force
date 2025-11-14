import { MyBidsFragmentContainer } from "Apps/Auctions/Components/MyBids/MyBids"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { MyBidsTestQuery } from "__generated__/MyBidsTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyBids", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL<MyBidsTestQuery>({
    Component: (props: any) => {
      return <MyBidsFragmentContainer me={props.me} />
    },
    query: graphql`
      query MyBidsTestQuery @relay_test_operation {
        me {
          ...MyBids_me
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

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the correct components", () => {
    expect(() => renderWithRelay()).not.toThrow()
  })

  it("renders the Bid Now button if only user interaction is registration and button links out to sale", () => {
    renderWithRelay({
      Me: () => ({
        myBids: {
          active: [
            {
              sale: {
                slug: "some-sale",
              },
              saleArtworks: [],
            },
          ],
        },
      }),
    })

    const button = screen.getByRole("link", { name: "Bid now" })
    expect(button).toHaveAttribute("href", "/auction/some-sale")
  })

  it("tracks clicks on the only registered button", () => {
    renderWithRelay({
      Me: () => ({
        myBids: {
          active: [
            {
              sale: {
                slug: "some-sale",
              },
              saleArtworks: [],
            },
          ],
        },
      }),
    })

    const button = screen.getByRole("link", { name: "Bid now" })
    fireEvent.click(button)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedAuctionGroup",
      context_module: "yourActiveBids",
      destination_page_owner_type: "sale",
      type: "thumbnail",
    })
  })
})
