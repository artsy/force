import React from "react"
import { graphql } from "react-relay"
import { FairOrganizerDedicatedArticles_Test_Query } from "v2/__generated__/FairOrganizerDedicatedArticles_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerDedicatedArticlesFragmentContainer } from "../FairOrganizerDedicatedArticles"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
      },
    },
  }),
}))

const { getWrapper } = setupTestWrapper<
  FairOrganizerDedicatedArticles_Test_Query
>({
  Component: props => {
    return (
      <FairOrganizerDedicatedArticlesFragmentContainer {...(props as any)} />
    )
  },
  query: graphql`
    query FairOrganizerDedicatedArticles_Test_Query {
      fairOrganizer(id: "example") {
        ...FairOrganizerDedicatedArticles_fairOrganizer
      }
    }
  `,
  variables: {
    first: 10,
    page: 1,
  },
})

describe("FairOrganizerDedicatedArticles", () => {
  it("renders a section title with the fair organizer name", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ name: "The Armory Show" }),
    })
    expect(wrapper.text()).toContain(
      "All Articles for The Armory Show on Artsy"
    )
  })

  it("renders 10 articles", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    expect(wrapper.find("FairOrganizerArticle").length).toBe(10)
  })

  it("renders pagination", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("Pagination").length).toBe(1)
  })
})

const edge = {
  node: {
    __typename: "FairOrganizerArticle",
  },
}

const articlesFixture = {
  edges: new Array(10).fill(edge),
  totalCount: 10,
}
