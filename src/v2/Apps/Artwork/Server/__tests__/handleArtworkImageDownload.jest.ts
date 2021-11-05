import { handleArtworkImageDownload } from "../handleArtworkImageDownload"

jest.mock("desktop/models/artwork", () => {
  return { 
    Artwork: class {
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
    }

    const res = {
      redirect: spy,
    }
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
    }

    const res = {
      redirect: spy,
    }
    await handleArtworkImageDownload({ req, res })
    expect(spy).not.toHaveBeenCalled()
  })
})
