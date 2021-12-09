import { ShowsCityRefetchContainer } from "../ShowsCity"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ShowsCity_Test_Query } from "v2/__generated__/ShowsCity_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({ router: { push: () => {} } }),
}))

jest.mock("v2/Components/Pagination", () => ({
  PaginationFragmentContainer: () => null,
}))

jest.mock("v2/Utils/Hooks/useScrollTo", () => ({
  useScrollTo: () => ({ scrollTo: jest.fn() }),
}))

const { getWrapper } = setupTestWrapper<ShowsCity_Test_Query>({
  Component: ({ viewer, city }) => {
    return (
      <MockBoot>
        <ShowsCityRefetchContainer viewer={viewer!} city={city!} />
      </MockBoot>
    )
  },
  query: graphql`
    query ShowsCity_Test_Query @relay_test_operation {
      viewer {
        ...ShowsCity_viewer
      }
      city(slug: "example") {
        ...ShowsCity_city
      }
    }
  `,
})

describe("ShowsCity", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      City: () => ({ name: "Sunnydale" }),
      Show: () => ({ name: "Example Show", startAt: new Date().toISOString() }),
      ShowConnection: () => ({ totalCount: 44 }),
    })

    expect(wrapper.find("h2")).toHaveLength(3)
    expect(wrapper.find("h2").map(node => node.text())).toEqual([
      "Opening This Week in Sunnydale 1",
      "Current Shows in Sunnydale 44",
      "Past Shows in Sunnydale",
    ])
  })
})
