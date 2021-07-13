import React from "react"
import { ShowArtworksRefetchContainer } from "../Components/ShowArtworks"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ShowArtworks_Test_Query } from "v2/__generated__/ShowArtworks_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({ match: { location: { query: {} } } }),
}))
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

const { getWrapper } = setupTestWrapper<ShowArtworks_Test_Query>({
  Component: props => (
    <MockBoot>
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      <ShowArtworksRefetchContainer aggregations={[]} {...props} />
    </MockBoot>
  ),
  query: graphql`
    query ShowArtworks_Test_Query {
      show(id: "catty-show") {
        ...ShowArtworks_show
      }
    }
  `,
})

describe("ShowArtworks", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })
})
