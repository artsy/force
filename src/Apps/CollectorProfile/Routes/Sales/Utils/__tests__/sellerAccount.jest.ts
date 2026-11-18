import {
  deleteSellerAccount,
  fetchSellerAccount,
} from "Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount"

describe("sellerAccount", () => {
  const fetchMock = jest.fn()

  beforeEach(() => {
    global.fetch = fetchMock
  })

  afterEach(() => {
    fetchMock.mockReset()
  })

  describe("fetchSellerAccount", () => {
    it("gets the seller account from Gravity with the access token", async () => {
      const sellerAccount = { id: "1", external_id: "acct_123" }
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => sellerAccount,
      })

      await expect(fetchSellerAccount({ accessToken: "token" })).resolves.toBe(
        sellerAccount,
      )
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/me/seller_account"),
        { method: "GET", headers: { "X-Access-Token": "token" } },
      )
    })

    it("resolves to null when there is no active seller account", async () => {
      fetchMock.mockResolvedValue({ ok: false, status: 404 })

      await expect(
        fetchSellerAccount({ accessToken: "token" }),
      ).resolves.toBeNull()
    })

    it("throws on other failures", async () => {
      fetchMock.mockResolvedValue({ ok: false, status: 502 })

      await expect(
        fetchSellerAccount({ accessToken: "token" }),
      ).rejects.toThrow("status 502")
    })

    it("throws without an access token", async () => {
      await expect(fetchSellerAccount({})).rejects.toThrow(
        "Missing access token",
      )
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })

  describe("deleteSellerAccount", () => {
    it("sends a DELETE to Gravity with the access token", async () => {
      fetchMock.mockResolvedValue({ ok: true, status: 200 })

      await deleteSellerAccount({ accessToken: "token" })

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/me/seller_account"),
        { method: "DELETE", headers: { "X-Access-Token": "token" } },
      )
    })

    it("throws when the request fails", async () => {
      fetchMock.mockResolvedValue({ ok: false, status: 502 })

      await expect(
        deleteSellerAccount({ accessToken: "token" }),
      ).rejects.toThrow("status 502")
    })

    it("throws without an access token", async () => {
      await expect(deleteSellerAccount({})).rejects.toThrow(
        "Missing access token",
      )
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })
})
