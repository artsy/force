import { SearchMeta } from "Apps/Search/Components/SearchMeta"
import { MockBoot } from "DevTools/MockBoot"
import { render } from "@testing-library/react"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "test-url",
  },
}))

describe("Meta tags", () => {
  const getWrapper = () => {
    return render(
      <MockBoot>
        <SearchMeta term="cats" />
      </MockBoot>
    )
  }

  it("includes the proper title", () => {
    getWrapper()
    // react-head updates the document head directly
    const titleElement = document.querySelector("title")
    expect(titleElement?.textContent).toContain(
      "Search Results for 'cats' | Artsy"
    )
  })

  it("includes the proper url", () => {
    getWrapper()
    const linkElement = document.querySelector('link[rel="canonical"]')

    expect(linkElement?.getAttribute("href")).toBe("test-url/search?term=cats")
  })
})
