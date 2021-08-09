import React from "react"
import { graphql } from "react-relay"
import { FairOrganizerApp_Test_Query } from "v2/__generated__/FairOrganizerApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerLatestArticlesFragmentContainer } from "../FairOrganizerLatestArticles"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FairOrganizerApp_Test_Query>({
  Component: props => {
    return <FairOrganizerLatestArticlesFragmentContainer {...(props as any)} />
  },
  query: graphql`
    query FairOrganizerLatestArticles_Test_Query {
      fairOrganizer(id: "example") {
        ...FairOrganizerLatestArticles_fairOrganizer
      }
    }
  `,
})

describe("FairOrganizerLatestArticles", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ name: "Art Paris", articles: articlesFixture }),
    })
    expect(wrapper.text()).toContain("Latest from Art Paris")
    expect(wrapper.text()).toContain("Read All Articles")
    expect(wrapper.find("Article").length).toBe(7)
    expect(wrapper.find("Article").first().prop("size")).toEqual("large")
    for (let i = 1; i < 7; i++) {
      expect(wrapper.find("Article").at(i).prop("size")).toEqual("small")
    }
  })
})

const articlesFixture = {
  edges: new Array(7).fill({
    node: {
      __typename: "Article",
    },
  }),
}
