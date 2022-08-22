import { setSegmentDestinationPref } from "../setSegmentDestinationPref"

describe("setSegmentDestinationPref", () => {
  it("returns base pref when there are no destinations", () => {
    const consent = "C0001,C0002"
    const destinations = []
    const expectedPref = {
      All: false,
      "Segment.io": true,
    }
    const pref = setSegmentDestinationPref(consent, destinations, "C0001")
    expect(pref).toEqual(expectedPref)
  })
  it("returns proper pref when there are destinations", () => {
    const consent = "C0001,C0002"
    const destinations = [
      { id: "Appboy" },
      { id: "Indicative" },
      { id: "Facebook Pixel" },
    ]
    const expectedPref = {
      All: false,
      "Segment.io": true,
      Appboy: true,
      Indicative: true,
      "Facebook Pixel": false,
    }
    const pref = setSegmentDestinationPref(consent, destinations, "C0001")
    expect(pref).toEqual(expectedPref)
  })
  it("returns proper pref when some destinations have no mapping to onetrust consent category", () => {
    const consent = "C0001,C0002,C0003,C0004,C0005"
    const destinations = [{ id: "foo" }]
    const expectedPref = {
      All: false,
      "Segment.io": true,
      foo: false,
    }
    const pref = setSegmentDestinationPref(consent, destinations, "C0001")
    expect(pref).toEqual(expectedPref)
  })
})
