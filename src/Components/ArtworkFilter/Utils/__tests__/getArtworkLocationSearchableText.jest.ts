import type { Item } from "@artsy/palette/dist/elements/FilterSelect/Components/FilterSelectContext"
import { getArtworkLocationSearchableText } from "../getArtworkLocationSearchableText"

describe(getArtworkLocationSearchableText, () => {
  it("returns searchable text for an artwork location", () => {
    const item: Item = {
      label: "Potwin, KS, USA",
      value: "Potwin, KS, USA",
    }
    expect(getArtworkLocationSearchableText(item)).toEqual(
      "Potwin, KS, USA; United States of America; U.S.A.; North America",
    )
  })
})
