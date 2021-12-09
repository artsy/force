import { graphql } from "react-relay"
import { FairOrganizerLatestArticles_Test_Query } from "v2/__generated__/FairOrganizerLatestArticles_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerLatestArticlesFragmentContainer } from "../FairOrganizerLatestArticles"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FairOrganizerLatestArticles_Test_Query>(
  {
    Component: props => {
      return (
        <FairOrganizerLatestArticlesFragmentContainer {...(props as any)} />
      )
    },
    query: graphql`
      query FairOrganizerLatestArticles_Test_Query @relay_test_operation {
        fairOrganizer(id: "example") {
          ...FairOrganizerLatestArticles_fairOrganizer
        }
      }
    `,
  }
)

describe("FairOrganizerLatestArticles", () => {
  it("does not render if no articles are present", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articlesConnection: { edges: [] } }),
    })
    expect(wrapper.html()).toBe("")
  })

  it("renders a section title with the fair name", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ name: "Art Paris" }),
    })
    expect(wrapper.text()).toContain("Latest from Art Paris")
  })

  it("renders 7 articles", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    expect(wrapper.find("FairOrganizerArticle").length).toBe(7)
  })

  it("renders the most recent article in a large card", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    expect(wrapper.find("FairOrganizerArticle").first().prop("size")).toEqual(
      "large"
    )
  })

  it("renders the next 6 articles in small cards", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    for (let i = 1; i < 7; i++) {
      expect(wrapper.find("FairOrganizerArticle").at(i).prop("size")).toEqual(
        "small"
      )
    }
  })

  it("doesn't render read all button if articles count is not greater than 7", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("Button").length).toBe(0)
  })

  it("renders read all button if articles count is greater than 7", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({
        articlesConnection: { totalCount: 10 },
      }),
    })
    expect(wrapper.find("Button").length).toBe(1)
    expect(wrapper.text()).toContain("Read All Articles")
  })
})

const edge = {
  node: {
    __typename: "FairOrganizerArticle",
  },
}

const articlesFixture = {
  edges: new Array(7).fill(edge),
  totalCount: 7,
}
