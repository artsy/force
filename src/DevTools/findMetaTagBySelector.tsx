import { waitFor } from "@testing-library/react"

/**
 * This helper makes it easier to make assertions about <meta> tags,
 * which are not easily accessed from Testing Library, in accordance
 * with its emphasis on testing interfaces the way your user would.
 *
 * Nonetheless we might want to assert about SEO metadata etc, and thus need
 * access to meta tags, which we can obtain as follows.
 *
 * This assumes you have already rendered your component with
 * React Testing Library's `render()` method or with
 * Force's `renderWithRelay()` helper.
 *
 * ```typescript
 *  it("renders title into the meta description", async () => {
 *     renderWithRelay({
 *       Artwork: () => ({
 *         title: "Very nice painting",
 *       }),
 *     })

 *     const descriptionMeta = await findMetaTagBySelector(
 *       "meta[name=description]"
 *     )

 *     expect(descriptionMeta).toHaveAttribute("content", "Very nice painting")
 *  })
```
 *
 * @param selector a selector for identifying the meta tag
 * @returns a Promise for an HTML Element
 */
export async function findMetaTagBySelector(selector: string) {
  await waitFor(() =>
    /* eslint-disable testing-library/no-node-access */
    expect(document.querySelectorAll("meta").length).toBeGreaterThan(0)
  )
  return document.querySelector(selector)
}
