import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairEditorialRailArticlesFragmentContainer } from "../FairEditorialRailArticles"

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
    const wrapper = getWrapper({
      Fair: () => ({
        articlesConnection: {
          edges: [
            {
              node: {
                id: "article-1",
              },
            },
            {
              node: {
                id: "article-2",
              },
            },
            {
              node: {
                id: "article-3",
              },
            },
            {
              node: {
                id: "article-4",
              },
            },
          ],
        },
      }),
    })

    const shelf = wrapper.find("Shelf")
    expect(shelf.length).toBe(1)
    expect(shelf.find("FairEditorialItem").length).toBe(4)
  })
})
