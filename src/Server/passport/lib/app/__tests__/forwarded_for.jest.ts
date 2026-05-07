import forwardedFor from "../forwarded_for"

describe("forwardedFor", () => {
  it("returns the remote address when there are no existing forwarded IPs", () => {
    const req = {
      connection: { remoteAddress: "99.99.99.99" },
      headers: {},
    }

    expect(forwardedFor(req as any)).toEqual("99.99.99.99")
  })

  it("resolves IPv4-mapped IPv6 addresses", () => {
    const req = {
      connection: { remoteAddress: "::ffff:99.99.99.99" },
      headers: {},
    }

    expect(forwardedFor(req as any)).toEqual("99.99.99.99")
  })

  it("appends the remote address to existing forwarded IPs", () => {
    const req = {
      connection: { remoteAddress: "99.99.99.99" },
      headers: { "x-forwarded-for": "88.88.88.88" },
    }

    expect(forwardedFor(req as any)).toEqual("88.88.88.88,99.99.99.99")
  })
})
