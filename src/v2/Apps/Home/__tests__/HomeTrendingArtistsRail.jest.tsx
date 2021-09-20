import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeTrendingArtistsRailFragmentContainer } from "../Components/HomeTrendingArtistsRail"
import { HomeTrendingArtistsRail_Test_Query } from "v2/__generated__/HomeTrendingArtistsRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeTrendingArtistsRail_Test_Query>({
  Component: props => {
    return <HomeTrendingArtistsRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeTrendingArtistsRail_Test_Query {
      viewer {
        ...HomeTrendingArtistsRail_viewer
      }
    }
  `,
})

describe("HomeTrendingArtistsRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        artistsConnection: {
          edges: [
            {
              node: {
                name: "Test Artist",
                href: "test-href",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Trending Artists on Artsy")
    expect(wrapper.text()).toContain("View All Artists")
    expect(wrapper.text()).toContain("Test Artist")
    expect(wrapper.text()).toContain("Following")
    expect(wrapper.html()).toContain("test-href")
  })
})
