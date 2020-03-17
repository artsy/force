import { setupArtistSignUpModal, query } from "../cta"
import * as helpers from "desktop/apps/authentication/helpers"

jest.mock("lib/metaphysics.coffee", () =>
  jest.fn().mockReturnValue(Promise.resolve({}))
)

jest.spyOn(helpers, "handleScrollingAuthModal")

const handleScrollingAuthModal = require("desktop/apps/authentication/helpers")
  .handleScrollingAuthModal
const mockMetaphysics = require("lib/metaphysics.coffee")

jest.mock("sharify", () => ({
  data: {
    ARTIST_PAGE_CTA_ARTIST_ID: "claes-oldenburg",
    ARTIST_PAGE_CTA_ENABLED: true,
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

  let addEventListener
  beforeEach(() => {
    addEventListener = jest.spyOn(window, "addEventListener")
    mockMetaphysics.mockReturnValue(Promise.resolve({ artist }))
  })

  it("should get artist data when artist cta is enabled and there is an artist id", async () => {
    await setupArtistSignUpModal()

    expect(mockMetaphysics).toBeCalledWith({
      method: "post",
      query: query,
      variables: { artistID: artist.id },
    })
  })

  it("should set up a scroll event listener", async () => {
    await setupArtistSignUpModal()

    expect(handleScrollingAuthModal).toBeCalledWith({
      copy:
        "Join Artsy to discover new works by Claes Oldenburg and more artists you love",
      destination: "https://artsy.net/",
      image: "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA",
      intent: "signup",
      trigger: "timed",
      triggerSeconds: 4,
    })

    expect(addEventListener).toHaveBeenCalled()
    expect(addEventListener.mock.calls[0][0]).toBe("scroll")
    expect(addEventListener.mock.calls[0][2]).toEqual({ once: true })
  })
})
