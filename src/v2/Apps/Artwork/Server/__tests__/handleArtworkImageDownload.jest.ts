import { handleArtworkImageDownload } from "../handleArtworkImageDownload"

jest.mock("desktop/models/artwork.coffee", () => {
  return class {
    fetch() {
      return new Promise<void>(resolve => {
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
    await handleArtworkImageDownload({ req, res })
    expect(spy).toHaveBeenCalled()
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
    await handleArtworkImageDownload({ req, res })
    expect(spy).not.toHaveBeenCalled()
  })
})
