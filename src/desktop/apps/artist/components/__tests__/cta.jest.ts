import { setupArtistSignUpModal, query } from "../cta"

jest.mock("lib/metaphysics.coffee", () =>
  jest.fn().mockReturnValue(Promise.resolve({}))
)

jest.mock("desktop/components/split_test/index.coffee", () =>
  jest.fn().mockReturnValue({
    view: jest.fn(),
  })
)

const mockMetaphysics = require("lib/metaphysics.coffee")

jest.mock("sharify", () => ({
  data: {
    ARTIST_PAGE_CTA_ARTIST_ID: "claes-oldenburg",
    ARTIST_PAGE_CTA_ENABLED: true,
    ARTIST_PAGE_SIGNUP_MODAL: "experiment",
  },
}))

describe("CTA", () => {
  const artist = {
    id: "claes-oldenburg",
    name: "Claes Oldenburg",
    href: "/artist/claes-oldenburg",
    image: {
      thumb: {
        resized: {
          url:
            "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg",
        },
      },
    },
    artists: [
      {
        image: {
          thumb: {
            resized: {
              url:
                "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA",
            },
          },
        },
      },
    ],
    artworks: [
      {
        image: {
          cropped: {
            url: "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA",
          },
        },
      },
    ],
  }

  it("should get artist data when artist cta is enabled and there is an artist id", async () => {
    const options = {
      method: "post",
      query: query,
      variables: { artistID: artist.id },
    }
    await setupArtistSignUpModal()

    expect(mockMetaphysics).toBeCalledWith(options)
  })

  it("should set up a scroll event listener when in the experiment group", async () => {
    const spy = jest.spyOn(window, "addEventListener")
    mockMetaphysics.mockReturnValue(Promise.resolve({ artist }))
    await setupArtistSignUpModal()

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe("scroll")
    expect(spy.mock.calls[0][2]).toEqual({ once: true })
  })
})
