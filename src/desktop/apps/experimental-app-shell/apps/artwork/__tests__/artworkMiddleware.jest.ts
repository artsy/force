import { handleArtworkImageDownload } from "../artworkMiddleware"

jest.mock("desktop/models/artwork.coffee", () => {
  return class {
    fetch() {
      return new Promise(resolve => {
        resolve()
      })
    }
    isDownloadable(user) {
      return user.canDownload
    }
    downloadableUrl() {
      return ""
    }
  }
})

describe("artworkMiddleware", () => {
  it("returns a downloadable request if downloadable", async () => {
    const spy = jest.fn()
    const req = {
      params: {
        artworkID: "test-artwork",
      },
      user: {
        canDownload: true,
        get: jest.fn(),
      },
      pipe: () => ({
        pipe: spy,
      }),
    }

    const res = {}
    const next = jest.fn()
    await handleArtworkImageDownload(req, res, next)
    expect(spy).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it("returns an error if not downloadable", async () => {
    const spy = jest.fn()
    const req = {
      params: {
        artworkID: "test-artwork",
      },
      user: {
        canDownload: false,
        get: jest.fn(),
      },
      pipe: () => ({
        pipe: jest.fn(),
      }),
    }

    const res = {}
    const next = jest.fn()
    await handleArtworkImageDownload(req, res, next)
    expect(spy).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Not authorized to download this image.",
        status: 403,
      })
    )
  })
})
