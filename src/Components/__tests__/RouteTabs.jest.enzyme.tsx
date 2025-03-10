import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { mount } from "enzyme"

describe("RouteTabs", () => {
  const getWrapper = () => {
    return mount(
      <RouteTabs>
        <RouteTab to="/overview">Overview</RouteTab>
        <RouteTab to="/cv">CV</RouteTab>
        <RouteTab to="/shows">Shows</RouteTab>
      </RouteTabs>,
    )
  }

  it("renders nav items", async () => {
    const wrapper = getWrapper()

    const html = wrapper.html()
    expect(html).toContain("Overview")
    expect(html).toContain("CV")
    expect(html).toContain("Shows")
  })
})
