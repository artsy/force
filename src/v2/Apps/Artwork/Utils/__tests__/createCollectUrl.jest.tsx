import { createCollectUrl } from "../createCollectUrl"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://staging.artsy.net",
  },
}))

describe("createCollectUrl", () => {
  it("formats the collect page url correctly (large)", async () => {
    const result = createCollectUrl({
      artistId: "evelyn-walg",
      category: "Painting",
      dimension: "LARGE",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/painting?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=27.6-%2A&artist_id=evelyn-walg"`
    )
  })
  it("formats the collect page url correctly (medium)", async () => {
    const result = createCollectUrl({
      artistId: "evelyn-walg",
      category: "Video/Film/Animation",
      dimension: "MEDIUM",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/film-slash-video?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=15.7-27.6&artist_id=evelyn-walg"`
    )
  })

  it("formats the collect page url correctly (small)", async () => {
    const result = createCollectUrl({
      artistId: "banksy",
      category: "Drawing, Collage or other Work on Paper",
      dimension: "SMALL",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/work-on-paper?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=%2A-15.7&artist_id=banksy"`
    )
  })

  it("formats the collect page url correctly when not filtering by dimension", async () => {
    const result = createCollectUrl({
      artistId: "banksy",
      category: "Drawing, Collage or other Work on Paper",
      dimension: null,
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect/work-on-paper?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=%2A-%2A&artist_id=banksy"`
    )
  })

  it("doesn't specify category in some cases", () => {
    const result = createCollectUrl({
      artistId: "banksy",
      category: "Sound",
      dimension: "SMALL",
    })

    expect(result).toMatchInlineSnapshot(
      `"https://staging.artsy.net/collect?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=%2A-15.7&artist_id=banksy"`
    )
  })
})
