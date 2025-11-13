import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { render } from "@testing-library/react"

describe("RouteTabs", () => {
  const getWrapper = () => {
    return render(
      <RouteTabs>
        <RouteTab to="/overview">Overview</RouteTab>
        <RouteTab to="/cv">CV</RouteTab>
        <RouteTab to="/shows">Shows</RouteTab>
      </RouteTabs>
    )
  }

  it("renders nav items", async () => {
    const { container } = getWrapper()

    const html = container.innerHTML
    expect(html).toContain("Overview")
    expect(html).toContain("CV")
    expect(html).toContain("Shows")
  })
})
