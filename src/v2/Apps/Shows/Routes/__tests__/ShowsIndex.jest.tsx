import React from "react"
import { ShowsIndexFragmentContainer } from "../ShowsIndex"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ShowsIndex_Test_Query } from "v2/__generated__/ShowsIndex_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({ router: { push: () => {} } }),
}))

const { getWrapper } = setupTestWrapper<ShowsIndex_Test_Query>({
  Component: ({ featuredShows, viewer }) => {
    return (
      <MockBoot>
        <ShowsIndexFragmentContainer
          viewer={viewer!}
          featuredShows={featuredShows!}
        />
      </MockBoot>
    )
  },
  query: graphql`
    query ShowsIndex_Test_Query {
      viewer {
        ...ShowsIndex_viewer
      }
      featuredShows: orderedSet(id: "example") {
        ...ShowsIndex_featuredShows
      }
    }
  `,
})

describe("ShowsIndex", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      OrderedSet: () => ({ name: "Featured Shows" }),
      Show: () => ({ name: "Example Show" }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Featured Shows")
    expect(wrapper.html()).toContain("Example Show")
  })
})
