import { graphql } from "react-relay"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "../Components/ShowViewingRoom"
import { ShowViewingRoom_Test_Query } from "v2/__generated__/ShowViewingRoom_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { AnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ShowViewingRoom_Test_Query>({
  Component: props => {
    return (
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "example-show-id",
          contextPageOwnerSlug: "example-show-slug",
          contextPageOwnerType: OwnerType.show,
        }}
      >
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <ShowViewingRoom {...props} />
      </AnalyticsContext.Provider>
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
    const wrapper = getWrapper({
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
    const wrapper = getWrapper({
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
