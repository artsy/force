import { screen } from "@testing-library/react"
import { ArticleTableOfContents } from "Apps/Article/Components/ArticleTableOfContents"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Article/Hooks/useTocJump", () => ({
  useTocJump: (articleSlug: string) => ({
    jump: jest.fn(),
    getHref: (slug: string) => `#JUMP--${articleSlug}--${slug}`,
  }),
}))

jest.mock("Utils/getENV", () => ({
  getENV: (key: string) =>
    key === "APP_URL" ? "https://www.artsy.net" : undefined,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => <ArticleTableOfContents article={props.article} />,
  query: graphql`
    query ArticleTableOfContents_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleTableOfContents_article
      }
    }
  `,
})

const THREE_HEADINGS = [
  { heading: "Section One", slug: "section-one" },
  { heading: "Section Two", slug: "section-two" },
  { heading: "Section Three", slug: "section-three" },
]

describe("ArticleTableOfContents", () => {
  describe("when the outline has fewer than three entries", () => {
    it("renders nothing", () => {
      renderWithRelay({
        Article: () => ({
          slug: "example-article",
          href: "/article/example-article",
          outline: THREE_HEADINGS.slice(0, 2),
        }),
      })

      expect(
        screen.queryByRole("navigation", { name: "Table of contents" }),
      ).not.toBeInTheDocument()
    })
  })

  describe("when the outline has at least three entries", () => {
    const renderToc = () =>
      renderWithRelay({
        Article: () => ({
          slug: "example-article",
          href: "/article/example-article",
          outline: THREE_HEADINGS,
        }),
      })

    it("renders a labelled <nav> with an ordered list of links", () => {
      renderToc()

      const nav = screen.getByRole("navigation", { name: "Table of contents" })
      expect(nav).toBeInTheDocument()

      const list = nav.querySelector("ol")
      expect(list).not.toBeNull()
      expect(list?.querySelectorAll("li")).toHaveLength(THREE_HEADINGS.length)

      for (const { heading, slug } of THREE_HEADINGS) {
        const link = screen.getByRole("link", { name: heading })
        expect(link).toHaveAttribute("href", `#JUMP--example-article--${slug}`)
      }
    })

    it("emits ItemList JSON-LD with absolute URLs in document order", () => {
      renderToc()

      const scripts = Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      )
      const itemListScript = scripts.find(node =>
        node.textContent?.includes('"ItemList"'),
      )
      expect(itemListScript).toBeDefined()

      const data = JSON.parse(itemListScript!.textContent ?? "{}")
      expect(data).toMatchObject({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Table of contents",
      })
      expect(data.itemListElement).toEqual(
        THREE_HEADINGS.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.heading,
          url: `https://www.artsy.net/article/example-article#JUMP--example-article--${entry.slug}`,
        })),
      )
    })
  })
})
