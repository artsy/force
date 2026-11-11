import { debugRoutes } from "Apps/Debug/debugRoutes"
import { getENV } from "Utils/getENV"

jest.mock("Utils/getENV")

describe("/debug/feature-flags access", () => {
  const route = debugRoutes[0].children?.find(({ path }) => {
    return path === "feature-flags"
  })

  const render = (user: User) => {
    return route?.render?.({
      Component: () => null,
      props: {},
      match: { context: { user } },
    } as any)
  }

  const mockEnvironment = (environment: string) => {
    ;(getENV as jest.Mock).mockImplementation((key: string) => {
      return key === "NODE_ENV" ? environment : undefined
    })
  }

  it("is open outside of production", () => {
    mockEnvironment("development")

    expect(render(null)).toBeTruthy()
  })

  it("is limited to team members in production", () => {
    mockEnvironment("production")

    expect(() => render(null)).toThrow()
    expect(() => render({ id: "example-user", roles: ["user"] })).toThrow()
    expect(render({ id: "example-user", roles: ["team"] })).toBeTruthy()
  })
})
