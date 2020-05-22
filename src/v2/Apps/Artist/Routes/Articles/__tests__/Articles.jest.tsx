import { Articles_Test_QueryRawResponse } from "v2/__generated__/Articles_Test_Query.graphql"
import { ArticlesFixture } from "v2/Apps/__tests__/Fixtures/Artist/Routes/ArticlesFixture"
import { ArticlesRouteFragmentContainer as ArticlesRoute } from "v2/Apps/Artist/Routes/Articles"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "v2/Utils/Responsive"

jest.unmock("react-relay")

describe("Articles Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: ArticlesRoute,
      query: graphql`
        query Articles_Test_Query($artistID: String!) @raw_response_type {
          artist(id: $artistID) {
            ...Articles_artist
          }
        }
      `,
      mockData: ArticlesFixture as Articles_Test_QueryRawResponse,
      variables: {
        artistID: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.find("ArticleItem").length).toBe(10)
      expect(wrapper.find("Pagination").length).toBe(1)
      expect(wrapper.find("Pagination").find("button").length).toBe(4)
    })

    it("renders proper article contents", () => {
      // TODO
      expect(true).toBe(true)
    })
  })

  describe("xs", () => {
    beforeAll(async () => {
      wrapper = await getWrapper("xs")
    })

    it("renders SmallArticleItem", () => {
      expect(wrapper.find("SmallArticleItem").length).toBe(10)
      expect(wrapper.find("LargeArticleItem").length).toBe(0)
    })
  })

  describe("md and up", () => {
    beforeAll(async () => {
      wrapper = await getWrapper("md")
    })

    it("renders LargeArticleItem", () => {
      expect(wrapper.find("LargeArticleItem").length).toBe(10)
      expect(wrapper.find("SmallArticleItem").length).toBe(0)
    })
  })
})
