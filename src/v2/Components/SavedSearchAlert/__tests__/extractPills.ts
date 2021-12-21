import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { extractArtistPill } from "../Utils/extractPills"

describe("getArtistPillFromAttributes", () => {
  it("returns artist pill", () => {
    const attributes: SavedSearchAttributes = {
      slug: "slug",
      name: "name",
      type: "artist",
      id: "id",
    }

    expect(extractArtistPill(attributes)).toEqual({
      isDefault: true,
      name: "slug",
      displayName: "name",
    })
  })

  it("returns null if nothing is passed", () => {
    expect(extractArtistPill()).toBeNull()
  })

  it("returns null if required fields are not passed", () => {
    const attributes = {
      slug: "slug",
      type: "artist",
      id: "id",
    } as SavedSearchAttributes

    expect(extractArtistPill(attributes)).toBeNull()
  })
})
