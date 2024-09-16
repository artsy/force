// Import the function to be tested
import { isRequestCacheable } from "System/Relay/isRequestCacheable"

describe("isRequestCacheable", () => {
  it("returns true when the query contains @cacheable directive", () => {
    const req = {
      operation: {
        text: `
          query ArtistQuery @cacheable {
            artist(id: "andy-warhol) {
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
            artist(id: "andy-warhol) {
              name
            }
          }
        `,
      },
    }

    expect(isRequestCacheable(req)).toBe(false)
  })
})
