import { ArticleMetaTagsFragmentContainer } from "Apps/Article/Components/ArticleMetaTags"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleMetaTagsFragmentContainer,
  query: graphql`
    query ArticleMetaTags_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleMetaTags_article
      }
    }
  `,
})

const getMetaTag = (property: string) => {
  const tag = [...document.getElementsByTagName("meta")].find(
    el => el.getAttribute("property") === property,
  )
  return tag
}

const getMetaContent = (property: string) => {
  return getMetaTag(property)?.getAttribute("content") ?? null
}

afterEach(() => {
  document.getElementsByTagName("html")[0].innerHTML = ""
})

describe("ArticleMetaTags", () => {
  it("renders article:published_time", () => {
    renderWithRelay({
      Article: () => ({
        metaPublishedAt: "2026-01-01T00:00:00+00:00",
        updatedAt: null,
      }),
    })

    expect(getMetaContent("article:published_time")).toBe(
      "2026-01-01T00:00:00+00:00",
    )
  })

  it("renders article:modified_time when updatedAt is more than 24 hours after publishedAt", () => {
    renderWithRelay({
      Article: () => ({
        metaPublishedAt: "2026-01-01T00:00:00+00:00",
        updatedAt: "2026-01-02T01:00:00+00:00",
      }),
    })

    expect(getMetaContent("article:modified_time")).toBe(
      "2026-01-02T01:00:00+00:00",
    )
  })

  it("does not render article:modified_time when updatedAt is within 24 hours of publishedAt", () => {
    renderWithRelay({
      Article: () => ({
        metaPublishedAt: "2026-01-01T00:00:00+00:00",
        updatedAt: "2026-01-01T23:00:00+00:00",
      }),
    })

    expect(getMetaContent("article:modified_time")).toBeNull()
    expect(getMetaTag("article:modified_time")).toBeUndefined()
  })

  it("does not render article:modified_time when updatedAt is absent", () => {
    renderWithRelay({
      Article: () => ({
        metaPublishedAt: "2026-01-01T00:00:00+00:00",
        updatedAt: null,
      }),
    })

    expect(getMetaContent("article:modified_time")).toBeNull()
    expect(getMetaTag("article:modified_time")).toBeUndefined()
  })
})
