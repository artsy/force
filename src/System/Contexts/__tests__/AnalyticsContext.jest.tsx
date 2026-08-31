import { OwnerType } from "@artsy/cohesion"
import { pathToOwnerType } from "System/Contexts/AnalyticsContext"

describe("pathToOwnerType", () => {
  it("maps artwork recommendations to the artwork recommendations owner type", () => {
    expect(pathToOwnerType("/recommendations/artworks")).toBe(
      OwnerType.artworkRecommendations,
    )
  })

  it("maps inspired by your saves to the based on your recent saves owner type", () => {
    expect(pathToOwnerType("/inspired-by-your-saves")).toBe(
      OwnerType.basedOnYourRecentSaves,
    )
  })
})
