import { createCollectUrl } from "../createCollectUrl"

describe("createCollectUrl", () => {
  it("formats the collect page url correctly (large)", async () => {
    const result = createCollectUrl({
      dimension: "LARGE",
      category: "Painting",
      artistId: "evelyn-walg",
    })

    expect(result).toMatchInlineSnapshot(
      `"/collect/painting?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=27.6-%2A&artist_id=evelyn-walg"`
    )
  })
  it("formats the collect page url correctly (medium)", async () => {
    const result = createCollectUrl({
      dimension: "MEDIUM",
      category: "Video/Film/Animation",
      artistId: "evelyn-walg",
    })

    expect(result).toMatchInlineSnapshot(
      `"/collect/film-slash-video?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=15.7-27.6&artist_id=evelyn-walg"`
    )
  })

  it("formats the collect page url correctly (small)", async () => {
    const result = createCollectUrl({
      dimension: "SMALL",
      category: "Drawing, Collage or other Work on Paper",
      artistId: "banksy",
    })

    expect(result).toMatchInlineSnapshot(
      `"/collect/work-on-paper?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=%2A-15.7&artist_id=banksy"`
    )
  })

  it("formats the collect page url correctly when not filtering by dimension", async () => {
    const result = createCollectUrl({
      dimension: null,
      category: "Drawing, Collage or other Work on Paper",
      artistId: "banksy",
    })

    expect(result).toMatchInlineSnapshot(
      `"/collect/work-on-paper?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=%2A-%2A&artist_id=banksy"`
    )
  })

  it("doesn't specify category in some cases", () => {
    const result = createCollectUrl({
      dimension: "SMALL",
      category: "Sound",
      artistId: "banksy",
    })

    expect(result).toMatchInlineSnapshot(
      `"/collect?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true&dimension_range=%2A-15.7&artist_id=banksy"`
    )
  })
})
