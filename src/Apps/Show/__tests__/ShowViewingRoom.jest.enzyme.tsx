import { graphql } from "react-relay"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "Apps/Show/Components/ShowViewingRoom"
import { ShowViewingRoom_Test_Query } from "__generated__/ShowViewingRoom_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ShowViewingRoom_Test_Query>({
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
    query ShowViewingRoom_Test_Query @relay_test_operation {
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
    const { wrapper } = getWrapper({
      ViewingRoom: () => ({
        title: "Example Viewing Room",
        status: "closed",
      }),
      Partner: () => ({
        name: "Example Partner Name",
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("Example Viewing Room")
    expect(html).toContain("Example Partner Name")
    expect(html).toContain("Closed")
  })

  it("tracks clicks", () => {
    const { wrapper } = getWrapper({
      ViewingRoom: () => ({
        internalID: "example-viewing-room-id",
        slug: "example-viewing-room-slug",
      }),
    })

    wrapper.find("a").first().simulate("click")

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
