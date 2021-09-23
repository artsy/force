import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeRecentlyViewedRailFragmentContainer } from "../Components/HomeRecentlyViewedRail"
import { HomeRecentlyViewedRail_Test_Query } from "v2/__generated__/HomeRecentlyViewedRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeRecentlyViewedRail_Test_Query>({
  Component: props => {
    return (
      <HomeRecentlyViewedRailFragmentContainer homePage={props.homePage!} />
    )
  },
  query: graphql`
    query HomeRecentlyViewedRail_Test_Query {
      homePage {
        ...HomeRecentlyViewedRail_homePage
      }
    }
  `,
})

describe("HomeRecentlyViewedRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      HomePage: () => ({
        artworkModule: {
          results: [
            {
              title: "Test Artist",
              href: "test-href",
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Test Artist")
    expect(wrapper.html()).toContain("test-href")
  })
})
