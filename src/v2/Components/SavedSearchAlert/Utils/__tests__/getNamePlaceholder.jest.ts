import { FilterPill } from "v2/Components/ArtworkFilter/SavedSearch/Utils/FilterPillsContext"
import { getNamePlaceholder } from "../getNamePlaceholder"

describe("getNamePlaceholder", () => {
  it("returns the singular form", () => {
    const pills: FilterPill[] = [
      {
        isDefault: true,
        name: "banksy",
        displayName: "Banksy",
      },
      {
        filterName: "attributionClass",
        name: "unique",
        displayName: "Unique",
      },
    ]
    expect(getNamePlaceholder("artistName", pills)).toBe(
      "artistName • 1 filter"
    )
  })

  it("returns the plural form", () => {
    const pills: FilterPill[] = [
      {
        isDefault: true,
        name: "banksy",
        displayName: "Banksy",
      },
      {
        filterName: "attributionClass",
        name: "unique",
        displayName: "Unique",
      },
      {
        filterName: "attributionClass",
        name: "limited edition",
        displayName: "Limited Edition",
      },
    ]
    expect(getNamePlaceholder("artistName", pills)).toBe(
      "artistName • 2 filters"
    )
  })

  it("returns only artist name when pills are empty", () => {
    expect(getNamePlaceholder("artistName", [])).toBe("artistName")
  })
})
