import { ShowsIndexFragmentContainer } from "Apps/Shows/Routes/ShowsIndex"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ShowsIndex_Test_Query } from "__generated__/ShowsIndex_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
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
    query ShowsIndex_Test_Query @relay_test_operation {
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
    const { wrapper } = getWrapper({
      OrderedSet: () => ({ name: "Featured Shows" }),
      Show: () => ({ name: "Example Show" }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Featured Shows")
    expect(wrapper.html()).toContain("Example Show")
  })
})
