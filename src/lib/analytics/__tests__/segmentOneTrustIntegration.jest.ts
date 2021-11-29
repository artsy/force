import SOI from "../segmentOneTrustIntegration"

let originalConditionallyLoadAnalytics = SOI.conditionallyLoadAnalytics
let originalDelay = SOI.delay
let originalFetchDestinationForWriteKey = SOI.fetchDestinationForWriteKey
let originalGetConsent = SOI.getConsent
let originalGetOneTrustConsent = SOI.getOneTrustConsent
let originalOneTrustReady = SOI.oneTrustReady
let originalSetSegmentDestinationPref = SOI.setSegmentDestinationPref
let originalValidateSegmentResponse = SOI.validateSegmentResponse

describe("getConsentAndLoad", () => {
  afterAll(() => {
    SOI.getConsent = originalGetConsent
    SOI.setSegmentDestinationPref = originalSetSegmentDestinationPref
    SOI.conditionallyLoadAnalytics = originalConditionallyLoadAnalytics
  })
  describe("no change to consent", () => {
    beforeEach(() => {
      SOI.getConsent = jest.fn(() => Promise.resolve(""))
      SOI.setSegmentDestinationPref = jest.fn()
      SOI.conditionallyLoadAnalytics = jest.fn()
    })
    it("does not load segment again", async () => {
      await SOI.getConsentAndLoad()
      expect(SOI.getConsent).toHaveBeenCalled()
      expect(SOI.setSegmentDestinationPref).not.toHaveBeenCalled()
      expect(SOI.conditionallyLoadAnalytics).not.toHaveBeenCalled()
    })
  })
  describe("consent changed", () => {
    beforeEach(() => {
      SOI.getConsent = jest.fn(() => Promise.resolve("C0001"))
      SOI.setSegmentDestinationPref = jest.fn()
      SOI.conditionallyLoadAnalytics = jest.fn()
    })
    it("loads segment again", async () => {
      await SOI.getConsentAndLoad()
      expect(SOI.getConsent).toHaveBeenCalled()
      expect(SOI.setSegmentDestinationPref).toHaveBeenCalled()
      expect(SOI.conditionallyLoadAnalytics).toHaveBeenCalled()
    })
  })
})

describe("getConsent", () => {
  afterAll(() => {
    SOI.getOneTrustConsent = originalGetOneTrustConsent
  })
  it("returns C0001 if does not get onetrust consent", async () => {
    SOI.getOneTrustConsent = jest.fn(() => Promise.resolve(""))
    const result = await SOI.getConsent()
    expect(result).toBe("C0001")
  })
  it("returns onetrust consent if it gets onetrust consent", async () => {
    SOI.getOneTrustConsent = jest.fn(() => Promise.resolve("C0001,C0002"))
    const result = await SOI.getConsent()
    expect(result).toBe("C0001,C0002")
  })
})

describe("getOneTrustConsent", () => {
  beforeEach(() => {
    SOI.delay = jest.fn(() => Promise.resolve())
  })
  afterAll(() => {
    SOI.oneTrustReady = originalOneTrustReady
    SOI.delay = originalDelay
  })
  it("returns empty string if onetrust is never ready", async () => {
    SOI.oneTrustReady = jest.fn(() => {
      return false
    })
    const result = await SOI.getOneTrustConsent()
    expect(result).toBe("")
  })
  it("returns onetrust consent string if onetrust is ready", async () => {
    SOI.oneTrustReady = jest.fn(() => {
      return true
    })
    window.OnetrustActiveGroups = "C0001"
    const result = await SOI.getOneTrustConsent()
    expect(result).toBe("C0001")
  })
})

describe("oneTrustReady", () => {
  it("returns true if onetrust consent string contains C0001", () => {
    window.OnetrustActiveGroups = "C0001"
    const result = SOI.oneTrustReady()
    expect(result).toBe(true)
  })
  it("returns false if onetrust consent string is empty", () => {
    window.OnetrustActiveGroups = ""
    const result = SOI.oneTrustReady()
    expect(result).toBe(false)
  })
  it("returns false if onetrust consent string is non-empty but does not contain C0001", () => {
    window.OnetrustActiveGroups = ",,"
    const result = SOI.oneTrustReady()
    expect(result).toBe(false)
  })
})

describe("fetchDestinations", () => {
  afterAll(() => {
    SOI.fetchDestinationForWriteKey = originalFetchDestinationForWriteKey
  })
  it("returns destinations", async () => {
    SOI.fetchDestinationForWriteKey = jest.fn(() =>
      Promise.resolve([{ id: "foo" }])
    )
    const result = await SOI.fetchDestinations("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
  it("removes repeater destinations", async () => {
    SOI.fetchDestinationForWriteKey = jest.fn(() =>
      Promise.resolve([{ id: "foo" }, { id: "Repeater" }])
    )
    const result = await SOI.fetchDestinations("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
  it("removes duplicate destinations", async () => {
    SOI.fetchDestinationForWriteKey = jest.fn(() =>
      Promise.resolve([{ id: "foo" }, { id: "foo" }])
    )
    const result = await SOI.fetchDestinations("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
})

describe("fetchDestinationForWriteKey", () => {
  afterAll(() => {
    SOI.validateSegmentResponse = originalValidateSegmentResponse
  })
  it("returns destinations if segment api returns them", async () => {
    const res = {
      ok: true,
      json: () => Promise.resolve([{ creationName: "foo" }]),
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await SOI.fetchDestinationForWriteKey("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
  it("returns empty array if segment api returns such", async () => {
    const res = {
      ok: true,
      json: () => Promise.resolve([]),
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await SOI.fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
  it("returns empty array if network error", async () => {
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.reject("foo"))
    const result = await SOI.fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
  it("returns empty array if http error", async () => {
    const res = {
      ok: false,
      status: "404",
      statusText: "not found",
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await SOI.fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
  it("returns empty array if validation error", async () => {
    SOI.validateSegmentResponse = jest.fn(() => {
      return false
    })
    const res = {
      ok: true,
      json: () => Promise.resolve([{ creationName: "foo" }]),
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await SOI.fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
})

describe("setSegmentDestinationPref", () => {
  it("returns base pref when there are no destinations", () => {
    const consent = "C0001,C0002"
    const destinations = []
    const expectedPref = {
      All: false,
      "Segment.io": true,
    }
    const pref = SOI.setSegmentDestinationPref(consent, destinations)
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
    const pref = SOI.setSegmentDestinationPref(consent, destinations)
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
    const pref = SOI.setSegmentDestinationPref(consent, destinations)
    expect(pref).toEqual(expectedPref)
  })
})

describe("conditionallyLoadAnalytics", () => {
  describe("segment already initialized", () => {
    beforeEach(() => {
      window.location.reload = jest.fn()
      window.analytics = {
        initialized: true,
        load: jest.fn(),
      } as any
    })
    it("reloads page if shouldReload is true, and exit", () => {
      SOI.conditionallyLoadAnalytics({
        writeKey: "abc",
        destinationPref: {},
      })
      expect(window.location.reload).toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).not.toHaveBeenCalled()
    })
    it("does not reload page if shouldReload is false, and exit", () => {
      SOI.conditionallyLoadAnalytics({
        writeKey: "abc",
        destinationPref: {},
        shouldReload: false,
      })
      expect(window.location.reload).not.toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).not.toHaveBeenCalled()
    })
  })
  describe("segment not yet initialized", () => {
    beforeEach(() => {
      window.location.reload = jest.fn()
      window.analytics = {
        initialized: false,
        load: jest.fn(),
      } as any
    })
    it("loads analytics if any destination is enabled", () => {
      SOI.conditionallyLoadAnalytics({
        writeKey: "abc",
        destinationPref: { foo: true, bar: false },
      })
      expect(window.location.reload).not.toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).toHaveBeenCalled()
    })
    it("does not load analytics if no destination is enabled", () => {
      SOI.conditionallyLoadAnalytics({
        writeKey: "abc",
        destinationPref: { foo: false },
      })
      expect(window.location.reload).not.toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).not.toHaveBeenCalled()
    })
    it("does not load analytics if destinationPref is empty", () => {
      SOI.conditionallyLoadAnalytics({
        writeKey: "abc",
        destinationPref: {},
      })
      expect(window.location.reload).not.toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).not.toHaveBeenCalled()
    })
  })
})

describe("validateSegmentResponse", () => {
  it("returns true if destinations is an empty array", () => {
    expect(SOI.validateSegmentResponse([])).toBe(true)
  })
  it("returns true if destinations has good data", () => {
    expect(SOI.validateSegmentResponse([{ creationName: "foo" }])).toBe(true)
  })
  it("returns false if destinations is not an array", () => {
    expect(SOI.validateSegmentResponse("foo")).toBe(false)
  })
  it("returns false if a destination has no creationName key", () => {
    const destinations = [{ creationName: "foo" }, { blah: "blah" }]
    expect(SOI.validateSegmentResponse(destinations)).toBe(false)
  })
  it("returns false if a destination has creationName key but its value is not a string", () => {
    const destinations = [{ creationName: "foo" }, { blah: {} }]
    expect(SOI.validateSegmentResponse(destinations)).toBe(false)
  })
})
