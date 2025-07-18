import { render, screen } from "@testing-library/react"
import { MockRouter } from "DevTools/MockRouter"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { RouterLink } from "System/Components/RouterLink"

jest.mock("System/Router/Utils/shouldUpdateScroll", () => ({
  shouldUpdateScroll: () => true,
}))

jest.mock("found", () => ({
  ...jest.requireActual("found"),
  Link: ({ to }) => (to.pathname === "/foo" ? "FooLink" : "Link"),
}))

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => "NavBar",
}))

jest.mock("Utils/Hooks/useAuthValidation")

describe("RouterLink", () => {
  it("uses the <Link> component if within a router context", async () => {
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
      />,
    )
    await flushPromiseQueue()

    expect((await screen.findAllByText("FooLink")).length).toBe(1)
  })

  it("uses the <Link> component if within a router context and targeting the same browsing context", async () => {
    render(
      <MockRouter
        initialRoute="/foo"
        routes={[
          {
            path: "/*",
            Component: () => {
              return (
                <RouterLink to="/foo" target="_self">
                  Foo
                </RouterLink>
              )
            },
          },
        ]}
      />,
    )
    await flushPromiseQueue()

    expect((await screen.findAllByText("FooLink")).length).toBe(1)
  })

  it("uses an <a> tag if within a router context but targeting different browsing context", async () => {
    render(
      <MockRouter
        initialRoute="/foo"
        routes={[
          {
            path: "/*",
            Component: () => {
              return (
                <RouterLink to="/foo" target="_blank">
                  Foo
                </RouterLink>
              )
            },
          },
        ]}
      />,
    )
    await flushPromiseQueue()

    expect(screen.queryByText("FooLink")).not.toBeInTheDocument()
    expect(await screen.findByRole("link", { name: "Foo" })).toBeInTheDocument()
  })

  it("falls back to an <a> tag if missing a router context", () => {
    render(<RouterLink to="/foo">Foo</RouterLink>)
    expect(screen.queryByText("FooLink")).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Foo" })).toBeInTheDocument()
  })
})
