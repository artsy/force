import { useTracking } from "react-tracking"
import { graphql } from "react-relay"
import { ArtistConsignRouteFragmentContainer } from "Apps/Artist/Routes/Consign/ArtistConsignRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("../Components/ArtistConsignMeta", () => ({
  ArtistConsignMetaFragmentContainer: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistConsignRouteFragmentContainer,
  query: graphql`
    query ArtistConsignRoute_Test_Query {
      artist(id: "example") {
        ...ArtistConsignRoute_artist
      }
    }
  `,
})

describe("ConsignRoute", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Alex Katz",
        href: "/artist/alex-katz",
      }),
    })

    expect(screen.getByText("Sell Works by Alex Katz")).toBeInTheDocument()

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.queryAllByText("Request a price estimate")[0].closest("a")
    ).toHaveAttribute(
      "href",
      "/consign/submission?contextPath=%2Fartist%2Falex-katz%2Fconsign&subject=Request%20a%20price%20estimate"
    )
  })

  it("tracks event", () => {
    renderWithRelay()

    screen.queryAllByText("Request a price estimate")[0].click()

    expect(trackEvent).toHaveBeenCalledWith({
      action_type: "Click",
      context_module: "Sell Works by",
      flow: "Consignments",
      subject: "Request a price estimate",
    })
  })
})
