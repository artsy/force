import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { FairEditorialRailArticlesFragmentContainer } from "Apps/Fair/Components/FairEditorial/FairEditorialRailArticles"

jest.unmock("react-relay")

describe("FairEditorialRailArticles", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <FairEditorialRailArticlesFragmentContainer fair={props.fair} />
    },
    query: graphql`
      query FairEditorialRailArticles_Test_Query @relay_test_operation {
        fair(id: "test") {
          ...FairEditorialRailArticles_fair
        }
      }
    `,
  })

  it("renders shelf containing 4 editorial items", () => {
    const { wrapper } = getWrapper({
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

    expect(wrapper.find("Shelf").length).toBe(1)

    expect(wrapper.html()).toContain("/article/article-1")
    expect(wrapper.html()).toContain("/article/article-2")
    expect(wrapper.html()).toContain("/article/article-3")
    expect(wrapper.html()).toContain("/article/article-4")
  })
})
