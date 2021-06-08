import { computeTitle } from "../computeTitle"

describe("computeTitle", () => {
  it("includes artworks when count > 0", () => {
    const artist = {
      name: "Artist Name",
      count: 10,
    }
    expect(computeTitle(artist.name, artist.count)).toEqual(
      "Artist Name - 10 Artworks, Bio & Shows on Artsy"
    )
  })

  it("excludes artworks when count = 0", () => {
    const artist = {
      name: "Artist Name",
      count: 0,
    }
    expect(computeTitle(artist.name, artist.count)).toEqual(
      "Artist Name - Bio & Shows on Artsy"
    )
  })
})
