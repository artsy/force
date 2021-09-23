import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeWorksByArtistsYouFollowRailFragmentContainer } from "../Components/HomeWorksByArtistsYouFollowRail"
import { HomeWorksByArtistsYouFollowRail_Test_Query } from "v2/__generated__/HomeWorksByArtistsYouFollowRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<
  HomeWorksByArtistsYouFollowRail_Test_Query
>({
  Component: props => {
    return (
      <HomeWorksByArtistsYouFollowRailFragmentContainer
        homePage={props.homePage!}
      />
    )
  },
  query: graphql`
    query HomeWorksByArtistsYouFollowRail_Test_Query {
      homePage {
        ...HomeWorksByArtistsYouFollowRail_homePage
      }
    }
  `,
})

describe("HomeWorksByArtistsYouFollowRail", () => {
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
