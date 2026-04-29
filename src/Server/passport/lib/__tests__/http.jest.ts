import { requestGravity } from "../http"

const fakeResponse = (body: string, init: { ok: boolean; status: number }) => ({
  ok: init.ok,
  status: init.status,
  statusText: init.ok ? "OK" : "Error",
  text: jest.fn().mockResolvedValue(body),
})

describe("requestGravity", () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
  })

  it("resolves with parsed JSON for 2xx responses", async () => {
    global.fetch = jest.fn().mockResolvedValue(
      fakeResponse(JSON.stringify({ access_token: "yes" }), {
        ok: true,
        status: 200,
      }),
    ) as unknown as typeof fetch

    const response = await requestGravity({
      method: "GET",
      url: "https://api.artsy.net/oauth2/access_token",
    })

    expect(response.ok).toBe(true)
    expect(response.body).toEqual({ access_token: "yes" })
  })

  it("rejects with err.response for non-2xx HTML responses", async () => {
    global.fetch = jest.fn().mockResolvedValue(
      fakeResponse("<!DOCTYPE html><html>Error</html>", {
        ok: false,
        status: 500,
      }),
    ) as unknown as typeof fetch

    await expect(
      requestGravity({
        method: "POST",
        url: "https://api.artsy.net/oauth2/access_token",
      }),
    ).rejects.toMatchObject({
      response: {
        body: {},
        ok: false,
        status: 500,
        text: "<!DOCTYPE html><html>Error</html>",
      },
    })
  })

  it("rejects with err.response populated when fetch itself throws", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(
        new TypeError("Network down"),
      ) as unknown as typeof fetch

    await expect(
      requestGravity({
        method: "GET",
        url: "https://api.artsy.net/api/v1/me",
      }),
    ).rejects.toMatchObject({
      message: "Network down",
      response: { body: {}, ok: false, status: 0, text: "" },
    })
  })

  it("aborts the request after the configured timeout", async () => {
    global.fetch = jest.fn(
      (_url: RequestInfo, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new Error("aborted"))
          })
        }),
    ) as unknown as typeof fetch

    await expect(
      requestGravity({
        method: "GET",
        timeoutMs: 5,
        url: "https://api.artsy.net/api/v1/me",
      }),
    ).rejects.toMatchObject({
      response: { ok: false, status: 0 },
    })
  })
})
