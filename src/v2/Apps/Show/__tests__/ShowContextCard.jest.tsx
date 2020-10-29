import React from "react"
import { ShowContextCardFragmentContainer } from "../Components/ShowContextCard"
import { QueryRenderer, graphql } from "react-relay"
import { ShowContextCard_Test_Query } from "v2/__generated__/ShowContextCard_Test_Query.graphql"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { mount } from "enzyme"
import { useTracking } from "react-tracking"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ShowContextCard", () => {
  let env = createMockEnvironment() as ReturnType<typeof createMockEnvironment>

  const getWrapper = (mocks = {}) => {
    const TestRenderer = () => (
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "example-show-id",
          contextPageOwnerSlug: "example-show-slug",
          contextPageOwnerType: OwnerType.show,
        }}
      >
        <QueryRenderer<ShowContextCard_Test_Query>
          environment={env}
          query={graphql`
            query ShowContextCard_Test_Query($slug: String!) {
              show(id: $slug) {
                ...ShowContextCard_show
              }
            }
          `}
          variables={{ slug: "show-id" }}
          render={({ props, error }) => {
            if (props?.show) {
              return <ShowContextCardFragmentContainer show={props.show} />
            } else if (error) {
              console.error(error)
            }
          }}
        />
      </AnalyticsContext.Provider>
    )

    const wrapper = mount(<TestRenderer />)
    env.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, mocks)
    )
    wrapper.update()
    return wrapper
  }

  let trackEvent
  beforeEach(() => {
    env = createMockEnvironment()
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly for a fair", () => {
    const wrapper = getWrapper({
      Fair: () => {
        return {
          name: "Catty Art Fair",
        }
      },
    })
    expect(wrapper.text()).toContain("Part of Catty Art Fair")
  })

  it("renders correctly for a partner", () => {
    const wrapper = getWrapper({
      Show: () => {
        return {
          isFairBooth: false,
        }
      },
      Partner: () => {
        return {
          name: "Catty Gallery",
          locations: [{ city: "Wakefield" }],
        }
      },
    })
    expect(wrapper.text()).toContain("Presented by Catty Gallery")
    expect(wrapper.text()).toContain("Wakefield")
  })

  it("tracks clicks for partner cards", () => {
    const wrapper = getWrapper({
      Show: () => ({ isFairBooth: false }),
      Partner: () => ({
        internalID: "catty-gallery-id",
        slug: "catty-gallery-slug",
      }),
    })

    wrapper.find("a").first().simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedPartnerCard",
      context_module: "presentingPartner",
      context_page_owner_id: "example-show-id",
      context_page_owner_slug: "example-show-slug",
      context_page_owner_type: "show",
      destination_page_owner_id: "catty-gallery-id",
      destination_page_owner_slug: "catty-gallery-slug",
      destination_page_owner_type: "partner",
      type: "thumbnail",
    })
  })

  it("tracks clicks for fair cards", () => {
    const wrapper = getWrapper({
      Show: () => ({ isFairBooth: true }),
      Fair: () => ({
        internalID: "catty-fair-id",
        slug: "catty-fair-slug",
      }),
    })

    wrapper.find("a").first().simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedFairCard",
      context_module: "presentingFair",
      context_page_owner_id: "example-show-id",
      context_page_owner_slug: "example-show-slug",
      context_page_owner_type: "show",
      destination_page_owner_id: "catty-fair-id",
      destination_page_owner_slug: "catty-fair-slug",
      destination_page_owner_type: "fair",
      type: "thumbnail",
    })
  })
})
