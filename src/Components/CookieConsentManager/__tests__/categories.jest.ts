import {
  mapCustomPreferences,
  remapSegmentCategory,
} from "Components/CookieConsentManager/categories"

describe("mapCustomPreferences", () => {
  // Destinations that are returned by Segment
  const segmentDestinations = [
    {
      name: "Braze Web Device Mode (Actions)",
      description: "Braze Web Mode (Actions)",
      website: "https://www.braze.com/",
      category: "Email Marketing",
      id: "Braze Web Mode (Actions)",
      creationName: "Braze Web Mode (Actions)", // Doesn't actually seem to get returned by Segment. Type expects it.
    },
  ]

  describe("default opt-out preferences", () => {
    const segmentPreferences = {
      necessary: true,
      functional: false,
      performance: false,
      targeting: false,
    }

    it("maps Segment preferences to conform to our own", () => {
      expect(
        mapCustomPreferences(segmentDestinations, segmentPreferences)
      ).toEqual({
        destinationPreferences: {
          "Braze Web Mode (Actions)": true,
          "Google Ads": false,
          YouTube: false,
        },
        customPreferences: {
          necessary: true,
          functional: false,
          performance: false,
          targeting: false,
        },
      })
    })
  })

  describe("with custom saved tracking preferences", () => {
    const segmentPreferences = {
      necessary: true,
      functional: true,
      performance: true,
      targeting: true,
    }

    it("maps Segment preferences to conform to our own", () => {
      expect(
        mapCustomPreferences(segmentDestinations, segmentPreferences)
      ).toEqual({
        destinationPreferences: {
          "Braze Web Mode (Actions)": true,
          "Google Ads": true,
          YouTube: true,
        },
        customPreferences: {
          necessary: true,
          functional: true,
          performance: true,
          targeting: true,
        },
      })
    })
  })
})

describe("remapSegmentCategory", () => {
  const example = {
    name: "Example Service",
    description: "Example Service",
    website: "https://www.example.com/",
    category: "Advertising",
    id: "Example Service",
    creationName: "Example Service",
  }

  it("re-maps Segment's categorization to our own", () => {
    expect(
      remapSegmentCategory({ ...example, category: "Advertising" })
    ).toEqual("targeting")

    expect(
      remapSegmentCategory({ ...example, category: "Heatmaps & Recordings" })
    ).toEqual("performance")

    expect(
      remapSegmentCategory({ ...example, category: "Deep Linking" })
    ).toEqual("functional")

    expect(remapSegmentCategory({ ...example, category: "Garbage" })).toEqual(
      "functional"
    )

    expect(
      remapSegmentCategory({ ...example, id: "Braze Web Mode (Actions)" })
    ).toEqual("necessary")
  })
})
