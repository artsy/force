import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeCurrentFairsRailFragmentContainer } from "../Components/HomeCurrentFairsRail"
import { HomeCurrentFairsRail_Test_Query } from "v2/__generated__/HomeCurrentFairsRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeCurrentFairsRail_Test_Query>({
  Component: props => {
    return <HomeCurrentFairsRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeCurrentFairsRail_Test_Query {
      viewer {
        ...HomeCurrentFairsRail_viewer
      }
    }
  `,
})

describe("HomeCurrentFairsRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        fairs: [
          {
            name: "Test Fair",
            href: "test-href",
          },
        ],
      }),
    })

    expect(wrapper.text()).toContain("Current Fairs")
    expect(wrapper.text()).toContain("View All Fairs")
    expect(wrapper.text()).toContain("Test Fair")
    expect(wrapper.html()).toContain("test-href")
  })
})
