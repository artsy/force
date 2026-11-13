import {
  getVimeoThumbnailUrl,
  parseVimeoMessage,
} from "Components/LoopingVimeoVideo/utils/vimeo"

describe("parseVimeoMessage", () => {
  it("reads the event from a JSON string", () => {
    expect(parseVimeoMessage(JSON.stringify({ event: "play" }))).toEqual({
      event: "play",
    })
  })

  it("reads the event from an object", () => {
    expect(parseVimeoMessage({ event: "pause" })).toEqual({ event: "pause" })
  })

  it("reads the name of an error", () => {
    expect(
      parseVimeoMessage({ event: "error", data: { name: "NotAllowedError" } }),
    ).toEqual({ event: "error", errorName: "NotAllowedError" })
  })

  it("drops an error name that is not a string", () => {
    expect(
      parseVimeoMessage({ event: "error", data: { name: 1 } })?.errorName,
    ).toBeUndefined()
    expect(
      parseVimeoMessage({ event: "error", data: "NotAllowedError" })?.errorName,
    ).toBeUndefined()
    expect(
      parseVimeoMessage({ event: "error", data: null })?.errorName,
    ).toBeUndefined()
  })

  it.each([
    ["text that is not JSON", "not json"],
    ["null", null],
    ["an object without an event", { data: {} }],
    ["an event that is not a string", { event: 1 }],
  ])("returns null for %s", (_label, raw) => {
    expect(parseVimeoMessage(raw)).toBeNull()
  })
})

describe("getVimeoThumbnailUrl", () => {
  const PLAYER_URL = "https://player.vimeo.com/video/123456"

  const respondWith = (body: unknown, ok = true) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(body),
    })
  }

  it("returns the thumbnail from the oEmbed response", async () => {
    respondWith({ thumbnail_url: "https://i.vimeocdn.com/t.jpg" })

    await expect(getVimeoThumbnailUrl(PLAYER_URL)).resolves.toBe(
      "https://i.vimeocdn.com/t.jpg",
    )
  })

  it("returns null when thumbnail_url is not a string", async () => {
    respondWith({ thumbnail_url: 42 })

    await expect(getVimeoThumbnailUrl(PLAYER_URL)).resolves.toBeNull()
  })

  it("returns null when the response body is null", async () => {
    respondWith(null)

    await expect(getVimeoThumbnailUrl(PLAYER_URL)).resolves.toBeNull()
  })

  it("returns null when the request fails", async () => {
    respondWith({ thumbnail_url: "https://i.vimeocdn.com/t.jpg" }, false)

    await expect(getVimeoThumbnailUrl(PLAYER_URL)).resolves.toBeNull()
  })

  it("returns null, without a request, when the URL has no Vimeo id", async () => {
    respondWith({})

    await expect(
      getVimeoThumbnailUrl("https://example.com/video"),
    ).resolves.toBeNull()
    expect(global.fetch).not.toHaveBeenCalled()
  })
})
