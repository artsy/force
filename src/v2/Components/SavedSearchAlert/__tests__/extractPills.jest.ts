import { SavedSearchEntityArtist } from "../types"
import { extractArtistPills } from "../Utils/extractPills"

describe("extractArtistPills", () => {
  it("returns artist pill", () => {
    const artists: SavedSearchEntityArtist[] = [
      {
        id: "id",
        slug: "slug",
        name: "name",
      },
    ]

    expect(extractArtistPills(artists)).toEqual([
      {
        isDefault: true,
        filterName: "artistIDs",
        name: "id",
        label: "name",
      },
    ])
  })

  it("returns empty array if nothing is passed", () => {
    expect(extractArtistPills()).toHaveLength(0)
  })
})
