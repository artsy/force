import { fireEvent, screen } from "@testing-library/react"
import { HomeBasedOnYourRecentSavesRail } from "Apps/Home/Components/HomeBasedOnYourRecentSavesRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <HomeBasedOnYourRecentSavesRail me={props.me!} />
  },
  query: graphql`
    query HomeBasedOnYourRecentSavesRail_Test_Query @relay_test_operation {
      me {
        ...HomeBasedOnYourRecentSavesRail_me
      }
    }
  `,
})

const ARTWORK = {
  internalID: "artwork-1",
  slug: "test-artwork",
  href: "/artwork/test-artwork",
  collectorSignals: null,
}

describe("HomeBasedOnYourRecentSavesRail", () => {
  it("renders the rail with a link to the standalone page", () => {
    renderWithRelay({
      Me: () => ({
        basedOnUserSaves: { edges: [{ node: ARTWORK }] },
      }),
    })

    expect(
      screen.getByText("Inspired by Your Saved Artworks"),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "View All Works" }),
    ).toHaveAttribute("href", "/inspired-by-your-saves")
  })

  it("does not render when there are no artworks", () => {
    const { container } = renderWithRelay({
      Me: () => ({
        basedOnUserSaves: { edges: [] },
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })

  it("tracks artwork click", () => {
    renderWithRelay({
      Me: () => ({
        basedOnUserSaves: { edges: [{ node: ARTWORK }] },
      }),
    })

    fireEvent.click(screen.getByTestId("ShelfArtwork"))

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtworkGroup",
      context_module: "basedOnYourRecentSavesRail",
      context_page_owner_type: "home",
      destination_page_owner_id: "artwork-1",
      destination_page_owner_slug: "test-artwork",
      destination_page_owner_type: "artwork",
      type: "thumbnail",
      signal_label: "",
      signal_bid_count: undefined,
      signal_lot_watcher_count: undefined,
    })
  })

  it("tracks view all click", () => {
    renderWithRelay({
      Me: () => ({
        basedOnUserSaves: { edges: [{ node: ARTWORK }] },
      }),
    })

    fireEvent.click(screen.getByRole("link", { name: "View All Works" }))

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtworkGroup",
      context_module: "basedOnYourRecentSavesRail",
      context_page_owner_type: "home",
      destination_page_owner_type: "basedOnYourRecentSaves",
      destination_page_owner_id: "inspired-by-your-saves",
      destination_page_owner_slug: "inspired-by-your-saves",
      type: "viewAll",
    })
  })
})
