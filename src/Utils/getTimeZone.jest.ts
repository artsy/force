import { getTimeZone } from "Utils/getTimeZone"
import { DateTime } from "luxon"

describe("getTimeZone", () => {
  describe("When Intl is available", () => {
    beforeAll(() => {
      const originalDateResolvedOptions = new Intl.DateTimeFormat().resolvedOptions()
      jest
        .spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions")
        .mockReturnValue({
          ...originalDateResolvedOptions,
          timeZone: "America/New_York",
        })
    })
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it("should return Intl timezone when it's available", () => {
      expect(getTimeZone()).toEqual("America/New_York")
    })
  })

  describe("When Intl is not available", () => {
    beforeAll(() => {
      const originalDateResolvedOptions = new Intl.DateTimeFormat().resolvedOptions()
      jest
        .spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions")
        .mockReturnValue({
          ...originalDateResolvedOptions,
          // timeZone is undefined in the latest chrome updates
          // see https://support.google.com/chrome/thread/231926653/timezone-return-undefined?hl=en
          timeZone: undefined as any,
        })

      const fakeLocal = DateTime.local(1982, 5, 25, {
        zone: "Asia/Seoul",
      })

      DateTime.local = jest.fn(() => fakeLocal)
    })
    afterAll(() => {
      jest.restoreAllMocks()
    })
    it("should return Luxon timezon", () => {
      expect(getTimeZone()).toEqual("Asia/Seoul")
    })
  })
})
