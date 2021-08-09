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
  it("renders a section title with the fair name", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ name: "Art Paris" }),
    })
    expect(wrapper.text()).toContain("Latest from Art Paris")
  })

  it("renders 7 articles", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articles: articlesFixture }),
    })
    expect(wrapper.find("Article").length).toBe(7)
  })

  it("renders the most recent article in a large card", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articles: articlesFixture }),
    })
    expect(wrapper.find("Article").first().prop("size")).toEqual("large")
  })

  it("renders the next 6 articles in small cards", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ articles: articlesFixture }),
    })
    for (let i = 1; i < 7; i++) {
      expect(wrapper.find("Article").at(i).prop("size")).toEqual("small")
    }
  })

  it("renders a read all button", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("Button").length).toBe(1)
    expect(wrapper.text()).toContain("Read All Articles")
  })
})

const articlesFixture = {
  edges: new Array(7).fill({
    node: {
      __typename: "Article",
    },
  }),
}
