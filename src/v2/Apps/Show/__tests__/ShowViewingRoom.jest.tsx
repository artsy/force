import React from "react"
import { mount } from "enzyme"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { QueryRenderer, graphql } from "react-relay"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "../Components/ShowViewingRoom"
import { ShowViewingRoom_Test_Query } from "v2/__generated__/ShowViewingRoom_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ShowViewingRoom", () => {
  const getWrapper = (mocks = {}) => {
    const env = createMockEnvironment()

    const TestRenderer = () => (
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "example-show-id",
          contextPageOwnerSlug: "example-show-slug",
          contextPageOwnerType: OwnerType.show,
        }}
      >
        <QueryRenderer<ShowViewingRoom_Test_Query>
          environment={env}
          variables={{}}
          query={graphql`
            query ShowViewingRoom_Test_Query {
              show(id: "example-show-id") {
                ...ShowViewingRoom_show
              }
            }
          `}
          render={({ props, error }) => {
            if (props?.show) {
              return <ShowViewingRoom show={props.show} />
            } else if (error) {
              console.error(error)
            }
          }}
        />
      </AnalyticsContext.Provider>
    )

    const wrapper = mount(<TestRenderer />)

    env.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        ...mocks,
      })
    )
    wrapper.update()
    return wrapper
  }

  let trackEvent
  beforeEach(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
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
  })
})
