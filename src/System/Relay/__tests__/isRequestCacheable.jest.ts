import {
  hasPersonalizedArguments,
  isRequestCacheable,
} from "System/Relay/isRequestCacheable"

describe("isRequestCacheable", () => {
  it("returns true when the query contains @cacheable directive", () => {
    const req = {
      operation: {
        text: `
          query ArtistQuery @cacheable {
            artist(id: "andy-warhol") {
              name
            }
          }
        `,
      },
    }

    expect(isRequestCacheable(req)).toBe(true)
  })

  it("returns false when the query does not contain @cacheable directive", () => {
    const req = {
      operation: {
        text: `
          query ArtistQuery {
            artist(id: "andy-warhol") {
              name
            }
          }
        `,
      },
    }

    expect(isRequestCacheable(req)).toBe(false)
  })
})

describe("hasPersonalizedArguments", () => {
  it("returns true when requestedVersionState is DRAFT", () => {
    expect(hasPersonalizedArguments({ requestedVersionState: "DRAFT" })).toBe(
      true,
    )
  })

  it("returns a falsy value when requestedVersionState is LIVE", () => {
    expect(
      hasPersonalizedArguments({ requestedVersionState: "LIVE" }),
    ).toBeFalsy()
  })

  it("returns a falsy value when requestedVersionState is absent", () => {
    expect(hasPersonalizedArguments({})).toBeFalsy()
  })
})
