import { FairOrganizerLatestArticlesFragmentContainer } from "Apps/FairOrginizer/Components/FairOrganizerLatestArticles"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairOrganizerLatestArticlesTestQuery } from "__generated__/FairOrganizerLatestArticlesTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<FairOrganizerLatestArticlesTestQuery>({
    Component: ({ fairOrganizer }) => (
      <FairOrganizerLatestArticlesFragmentContainer
        fairOrganizer={fairOrganizer!}
      />
    ),
    query: graphql`
      query FairOrganizerLatestArticlesTestQuery @relay_test_operation {
        fairOrganizer(id: "example") {
          ...FairOrganizerLatestArticles_fairOrganizer
        }
      }
    `,
  })

describe("FairOrganizerLatestArticles", () => {
  it("does not render if no articles are present", () => {
    const { container } = renderWithRelay({
      FairOrganizer: () => ({ articlesConnection: { edges: [] } }),
    })
    expect(container.innerHTML).toBe("")
  })

  it("renders a section title with the fair name", () => {
    const { container } = renderWithRelay({
      FairOrganizer: () => ({ name: "Art Paris" }),
    })
    expect(container.textContent).toContain("Latest from Art Paris")
  })

  it("renders 7 article links", () => {
    const { container } = renderWithRelay({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    expect(container.querySelectorAll("a")).toHaveLength(7)
  })

  it("doesn't render read all button if articles count is not greater than 7", () => {
    const { container } = renderWithRelay({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    expect(container.querySelectorAll("button")).toHaveLength(0)
  })

  it("renders read all button if articles count is greater than 7", () => {
    const { container } = renderWithRelay({
      FairOrganizer: () => ({
        articlesConnection: { totalCount: 10 },
      }),
    })
    expect(container.querySelectorAll("button")).toHaveLength(1)
    expect(container.textContent).toContain("Read All Articles")
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
