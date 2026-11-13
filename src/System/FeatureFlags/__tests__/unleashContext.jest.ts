import { getUnleashContext } from "System/FeatureFlags/unleashContext"

describe("getUnleashContext", () => {
  it("identifies the visitor by user and session", () => {
    expect(
      getUnleashContext({
        user: { id: "example-user" },
        sessionId: "example-session",
      }),
    ).toEqual({ userId: "example-user", sessionId: "example-session" })
  })

  it("sends roles as a single comma-separated property", () => {
    expect(
      getUnleashContext({
        user: { id: "example-user", roles: ["team", "admin"] },
        sessionId: "example-session",
      }),
    ).toEqual({
      userId: "example-user",
      sessionId: "example-session",
      properties: { roles: "team,admin" },
    })
  })

  it("handles logged out visitors", () => {
    expect(
      getUnleashContext({ user: null, sessionId: "example-session" }),
    ).toEqual({ userId: undefined, sessionId: "example-session" })
  })
})
