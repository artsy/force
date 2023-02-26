import { SearchMeta } from "Apps/Search/Components/SearchMeta"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import { Link, Title } from "react-head"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "test-url",
  },
}))
describe("Meta tags", () => {
  const getWrapper = () => {
    return mount(
      <MockBoot>
        <SearchMeta term="cats" />
      </MockBoot>
    )
  }

  it("includes the proper title", () => {
    const component = getWrapper()
    const title = component.find(Title)
    expect(title.at(0).text()).toContain("Search Results for 'cats' | Artsy")
  })

  it("includes the proper url", () => {
    const component = getWrapper()
    const link = component.find(Link).at(0).html()

    expect(link).toEqual(
      '<link rel="canonical" href="test-url/search?term=cats">'
    )
  })
})
