import { graphql } from "react-relay"
import { FairArticlesFragmentContainer } from "../FairArticles"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairArticlesFragmentContainer,
  query: graphql`
    query FairArticles_Test_Query {
      fair(id: "example") {
        ...FairArticles_fair
      }
    }
  `,
})

describe("FairArticles", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Article: () => ({ title: "Example Article" }),
      Author: () => ({ name: "Example Author" }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)

    const html = wrapper.html()

    expect(html).toContain("Example Article")
    expect(html).toContain("Example Author")
  })
})
