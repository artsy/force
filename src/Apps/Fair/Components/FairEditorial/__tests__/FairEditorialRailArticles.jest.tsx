import { FairEditorialRailArticlesFragmentContainer } from "Apps/Fair/Components/FairEditorial/FairEditorialRailArticles"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairEditorialRailArticles_Test_Query } from "__generated__/FairEditorialRailArticles_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("FairEditorialRailArticles", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<FairEditorialRailArticles_Test_Query>({
      Component: ({ fair }) => (
        <FairEditorialRailArticlesFragmentContainer fair={fair!} />
      ),
      query: graphql`
        query FairEditorialRailArticles_Test_Query @relay_test_operation {
          fair(id: "test") {
            ...FairEditorialRailArticles_fair
          }
        }
      `,
    })

  it("renders shelf containing 4 editorial items", () => {
    const { container } = renderWithRelay({
      Fair: () => ({
        articlesConnection: {
          edges: [
            {
              node: {
                id: "article-1",
                href: "/article/article-1",
              },
            },
            {
              node: {
                id: "article-2",
                href: "/article/article-2",
              },
            },
            {
              node: {
                id: "article-3",
                href: "/article/article-3",
              },
            },
            {
              node: {
                id: "article-4",
                href: "/article/article-4",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Explore Further")).toBeInTheDocument()

    expect(container.innerHTML).toContain("/article/article-1")
    expect(container.innerHTML).toContain("/article/article-2")
    expect(container.innerHTML).toContain("/article/article-3")
    expect(container.innerHTML).toContain("/article/article-4")
  })
})
