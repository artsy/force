import { act, screen } from "@testing-library/react"
import { InspiredByYourSavesArtworksGrid } from "Apps/InspiredByYourSaves/Components/InspiredByYourSavesArtworksGrid"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { intersect } from "Utils/Hooks/__tests__/mockIntersectionObserver"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: () => ({
    contextPageOwnerType: "basedOnYourRecentSaves",
  }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <InspiredByYourSavesArtworksGrid me={props.me!} />
  },
  query: graphql`
    query InspiredByYourSavesArtworksGrid_Test_Query @relay_test_operation {
      me {
        ...InspiredByYourSavesArtworksGrid_me
      }
    }
  `,
})

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
  jest.useRealTimers()
})

describe("InspiredByYourSavesArtworksGrid", () => {
  it("renders an empty state when there are no recommendations", () => {
    renderWithRelay({
      ArtworkConnection: () => ({
        totalCount: 0,
        edges: [],
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })

  it("tracks artwork item viewed impressions", () => {
    jest.useFakeTimers()

    renderWithRelay({
      ArtworkConnection: () => ({
        totalCount: 1,
        edges: [
          {
            node: {
              internalID: "artwork-1-id",
              slug: "artwork-1",
            },
          },
        ],
      }),
    })

    const item = screen.getAllByTestId("ArtworkItemImpression")[0]

    act(() => intersect(item, true))
    act(() => jest.advanceTimersByTime(500))

    expect(trackEvent).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(501))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "item_viewed",
      context_module: "artworkGrid",
      context_screen: "basedOnYourRecentSaves",
      item_id: "artwork-1-id",
      item_type: "artwork",
      position: 0,
    })
  })
})
