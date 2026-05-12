import { OwnerType } from "@artsy/cohesion"
import { pathToOwnerType } from "System/Contexts/AnalyticsContext"

describe("pathToOwnerType", () => {
  it("maps artwork recommendations to the artwork recommendations owner type", () => {
    expect(pathToOwnerType("/recommendations/artworks")).toBe(
      OwnerType.artworkRecommendations,
    )
  })
})
