import {
  FairArticlesPaginationContainer,
  FAIR_ARTICLES_QUERY,
} from "../FairArticles"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairArticlesPaginationContainer,
  query: FAIR_ARTICLES_QUERY,
  variables: {
    id: "example",
    first: 10,
  },
})

describe("FairArticles", () => {
  it("renders the articles", () => {
    const wrapper = getWrapper({
      ArticleConnection: () => ({ totalCount: 1 }),
      Article: () => ({ title: "Example Article" }),
      Author: () => ({ name: "Example Author" }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)

    // FIXME: Unable to mock the contents of the connection
    // when using a pagination container
    // const html = wrapper.html()
    // expect(html).toContain("Example Article")
    // expect(html).toContain("Example Author")
  })

  it("renders an empty state when there are no articles", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        articlesConnection: {
          totalCount: 0,
          edges: [],
        },
      }),
    })

    const html = wrapper.html()

    expect(html).not.toContain("Example Article")
    expect(html).not.toContain("Example Author")
    expect(html).toContain("There aren’t any articles at this time.")
  })
})
