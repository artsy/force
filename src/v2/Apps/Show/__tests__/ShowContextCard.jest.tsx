import { ShowContextCardFragmentContainer } from "../Components/ShowContextCard"
import { graphql } from "react-relay"
import { ShowContextCard_Test_Query } from "v2/__generated__/ShowContextCard_Test_Query.graphql"
import { AnalyticsContextProvider } from "v2/System/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<ShowContextCard_Test_Query>({
  Component: props => (
    <AnalyticsContextProvider
      value={{
        contextPageOwnerId: "example-show-id",
        contextPageOwnerSlug: "example-show-slug",
        contextPageOwnerType: OwnerType.show,
      }}
    >
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ShowContextCardFragmentContainer {...props} />
    </AnalyticsContextProvider>
  ),
  query: graphql`
    query ShowContextCard_Test_Query @relay_test_operation {
      show(id: "xxx") {
        ...ShowContextCard_show
      }
    }
  `,
})

describe("ShowContextCard", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly for a fair", () => {
    const wrapper = getWrapper({
      Fair: () => {
        return {
          name: "Catty Art Fair",
        }
      },
    })
    expect(wrapper.text()).toContain(
      'Presented by <mock-value-for-field-"name"><mock-value-for-field-"name"><mock-value-for-field-"city">'
    )
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

    expect(trackEvent).toBeCalledTimes(1)
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

    expect(trackEvent).toBeCalledTimes(1)
  })
})
