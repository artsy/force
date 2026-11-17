import { fetchStripeClientSecret } from "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret"

describe("fetchStripeClientSecret", () => {
  const fetchMock = jest.fn()

  beforeEach(() => {
    global.fetch = fetchMock
  })

  afterEach(() => {
    fetchMock.mockReset()
  })

  it("posts to Gravity with the access token and returns the client secret", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ client_secret: "accsess_secret" }),
    })

    const secret = await fetchStripeClientSecret({ accessToken: "token" })

    expect(secret).toBe("accsess_secret")
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/me/seller_account_session"),
      { method: "POST", headers: { "X-Access-Token": "token" } },
    )
  })

  it("throws when the request fails", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 502 })

    await expect(
      fetchStripeClientSecret({ accessToken: "token" }),
    ).rejects.toThrow("status 502")
  })

  it("throws without an access token and does not call Gravity", async () => {
    await expect(fetchStripeClientSecret({})).rejects.toThrow(
      "Missing access token",
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
