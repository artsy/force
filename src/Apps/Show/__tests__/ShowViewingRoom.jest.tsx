import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "Apps/Show/Components/ShowViewingRoom"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { fireEvent } from "@testing-library/react"
import type { ShowViewingRoomTestQuery } from "__generated__/ShowViewingRoomTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ShowViewingRoomTestQuery>({
  Component: props => {
    return (
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="example-show-id"
        path="/show/example-show-slug"
      >
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <ShowViewingRoom {...props} />
      </AnalyticsCombinedContextProvider>
    )
  },
  query: graphql`
    query ShowViewingRoomTestQuery @relay_test_operation {
      show(id: "example-show-id") {
        ...ShowViewingRoom_show
      }
    }
  `,
})

describe("ShowViewingRoom", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay({
      ViewingRoom: () => ({
        title: "Example Viewing Room",
        status: "closed",
      }),
      Partner: () => ({
        name: "Example Partner Name",
      }),
    })

    const html = container.innerHTML

    expect(html).toContain("Example Viewing Room")
    expect(html).toContain("Example Partner Name")
    expect(html).toContain("Closed")
  })

  it("tracks clicks", () => {
    const { container } = renderWithRelay({
      ViewingRoom: () => ({
        internalID: "example-viewing-room-id",
        slug: "example-viewing-room-slug",
      }),
    })

    const firstLink = container.querySelector("a")!
    fireEvent.click(firstLink)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedViewingRoomCard",
      context_module: "associatedViewingRoom",
      context_page_owner_id: "example-show-id",
      context_page_owner_slug: "example-show-slug",
      context_page_owner_type: "show",
      destination_page_owner_id: "example-viewing-room-id",
      destination_page_owner_slug: "example-viewing-room-slug",
      destination_page_owner_type: "viewingRoom",
      type: "thumbnail",
    })

    expect(trackEvent).toBeCalledTimes(1)
  })
})
