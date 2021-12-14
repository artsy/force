import { SavedSearchAttributes } from "../../SavedSearch/types"
import { getArtistPillFromAttributes } from "../getArtistPillFromAttributes"

describe("getArtistPillFromAttributes", () => {
  it("returns artist pill", () => {
    const attributes: SavedSearchAttributes = {
      slug: "slug",
      name: "name",
      type: "artist",
      id: "id",
    }

    expect(getArtistPillFromAttributes(attributes)).toEqual({
      isDefault: true,
      name: "slug",
      displayName: "name",
    })
  })

  it("returns null if nothing is passed", () => {
    expect(getArtistPillFromAttributes()).toBeNull()
  })

  it("returns null if required fields are not passed", () => {
    const attributes = {
      slug: "slug",
      type: "artist",
      id: "id",
    } as SavedSearchAttributes

    expect(getArtistPillFromAttributes(attributes)).toBeNull()
  })
})
