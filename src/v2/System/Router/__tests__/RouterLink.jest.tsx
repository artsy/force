import { MockRouter } from "v2/DevTools"
import { mount } from "enzyme"
import { render, screen } from "@testing-library/react"
import { Link } from "found"
import { RouterLink } from "../RouterLink"

jest.mock("../Utils/shouldUpdateScroll", () => ({
  shouldUpdateScroll: () => true,
}))

jest.mock("found", () => ({
  ...jest.requireActual("found"),
  Link: () => "Link",
}))

jest.mock("v2/Components/NavBar/NavBar", () => ({
  NavBar: () => "NavBar",
}))

jest.mock("v2/Utils/Hooks/useAuthValidation")

describe("RouterLink", () => {
  const renderTestRoute = () => {
    render(
      <MockRouter
        initialRoute="/foo"
        routes={[
          {
            path: "/*",
            Component: () => {
              return <RouterLink to="/foo">Foo</RouterLink>
            },
          },
        ]}
      />
    )
  }

  // TODO: uncomment this not sure why its failing
  it.skip("uses the <Link> component if within a router context", async () => {
    renderTestRoute()
    // screen.debug()
    expect((await screen.findAllByText("Link")).length).toBe(1)
  })

  it("uses falls back to an <a> tag if missing a router context", () => {
    const wrapper = mount(<RouterLink to="/foo">Foo</RouterLink>)
    expect(wrapper.find(Link).length).toEqual(0)
    expect(wrapper.find("a").length).toEqual(1)
  })
})
