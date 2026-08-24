import { render, screen, waitFor } from "@testing-library/react"
import { ArticleHTML } from "Apps/Article/Components/ArticleHTML"

/**
 * Helper method that asserts the link has _actually_ been checked and possibly
 * transformed.
 *
 * Without this assertion, some tests below give false red or green
 * because `expect toHaveAttribute` assertions are _2 Fast 2 Spurious_,
 * due to the odd lifecycle of `ArticleHTML`.
 *
 * See `ArticleHTML`’s dynamic import of `@artsy/react-html-parser`, and its
 * initial use of `dangerouslySetInnerHTML` which allows `screen.getByRole("link")`
 * to return an element _before_ the transformation has taken place
 */
async function assertLinkHasBeenChecked() {
  let link: HTMLAnchorElement | undefined

  await waitFor(() => {
    link = screen.getByRole<HTMLAnchorElement>("link")
    expect(link).toHaveAttribute("data-link-checked", "true")
  })

  return link
}

describe("ArticleHTML", () => {
  describe("external links", () => {
    it("opens them in a new window", async () => {
      render(
        <ArticleHTML>
          {`<p>
            <a href="https://example.com/story">
              Example
            </a>
          </p>`}
        </ArticleHTML>,
      )

      const link = await assertLinkHasBeenChecked()
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener")
    })
  })

  describe("internal links", () => {
    it("leaves them in the same window", async () => {
      render(
        <ArticleHTML>
          {`<p>
            <a href="https://www.artsy.net/collect">
              Collect
            </a>
          </p>`}
        </ArticleHTML>,
      )

      const link = await assertLinkHasBeenChecked()
      expect(link).not.toHaveAttribute("target")
      expect(link).not.toHaveAttribute("rel")
    })

    it("wraps supported entities in a tooltip", async () => {
      render(
        <ArticleHTML>
          {`<p>
            <a href="https://www.artsy.net/artist/andy-warhol">
              Andy Warhol
            </a>
          </p>`}
        </ArticleHTML>,
      )

      let link: HTMLAnchorElement | undefined

      await waitFor(() => {
        link = screen.getByRole<HTMLAnchorElement>("link")
        expect(link.parentNode).toHaveClass(/EntityTooltip/)
      })
    })
  })

  it("renders non-anchor markup unchanged", async () => {
    render(<ArticleHTML>{"<p>Just text</p>"}</ArticleHTML>)

    expect(screen.getByText("Just text")).toBeInTheDocument()
  })
})
