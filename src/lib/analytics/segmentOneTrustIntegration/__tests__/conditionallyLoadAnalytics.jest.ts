import { conditionallyLoadAnalytics } from "../conditionallyLoadAnalytics"

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
      conditionallyLoadAnalytics({
        destinationPref: {},
        writeKey: "abc",
      })
      expect(window.location.reload).toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).not.toHaveBeenCalled()
    })
    it("does not reload page if shouldReload is false, and exit", () => {
      conditionallyLoadAnalytics({
        destinationPref: {},
        shouldReload: false,
        writeKey: "abc",
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
      conditionallyLoadAnalytics({
        destinationPref: { foo: true, bar: false },
        writeKey: "abc",
      })
      expect(window.location.reload).not.toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).toHaveBeenCalled()
    })
    it("does not load analytics if no destination is enabled", () => {
      conditionallyLoadAnalytics({
        destinationPref: { foo: false },
        writeKey: "abc",
      })
      expect(window.location.reload).not.toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).not.toHaveBeenCalled()
    })
    it("does not load analytics if destinationPref is empty", () => {
      conditionallyLoadAnalytics({
        destinationPref: {},
        writeKey: "abc",
      })
      expect(window.location.reload).not.toHaveBeenCalled()
      // @ts-ignore
      expect(window.analytics.load).not.toHaveBeenCalled()
    })
  })
})
