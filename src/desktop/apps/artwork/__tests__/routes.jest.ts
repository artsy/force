import { handleDownload } from "../server"

const Artwork = require("desktop/models/artwork.coffee")

jest.mock("superagent", () => {
  return {
    get: () => {
      return { set: jest.fn() }
    },
  }
})

jest.mock("desktop/models/artwork.coffee")

describe("Request handler for download artwork route", () => {
  let req
  let res
  let next
  const pipeMock = jest.fn()

  describe("/artwork/:artworkID/download/:filename", () => {
    beforeEach(() => {
      req = {
        params: { artworkID: "percy-painting" },
        user: { get: () => "token" },
        pipe: () => {
          return { pipe: pipeMock }
        },
      }

      next = jest.fn()
    })

    it("serves a 403", done => {
      Artwork.mockImplementation(() => {
        return {
          isDownloadable: () => {
            return false
          },
          fetch: () => jest.fn(),
        }
      })
      handleDownload(req, res, next).then(() => {
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            message: "Not authorized to download this image.",
            status: 403,
          })
        )
        done()
      })
    })

    it("pipes the image when the request is authorized", done => {
      Artwork.mockImplementation(() => {
        return {
          isDownloadable: () => {
            return true
          },
          fetch: () => jest.fn(),
          downloadableUrl: () => jest.fn(),
        }
      })
      handleDownload(req, res, next).then(() => {
        expect(pipeMock).toHaveBeenCalled()
        done()
      })
    })
  })
})
