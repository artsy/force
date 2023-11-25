const mockIsServer = jest.fn()

jest.mock("Utils/device", () => ({
  isServer: mockIsServer,
}))

import {
  SIDEBAR_FETCH_PAGE_SIZE,
  getSidebarTotal,
} from "Apps/Conversations/components/Sidebar/Utils/getSidebarTotal"

describe("YourFileName", () => {
  describe("SIDEBAR_FETCH_PAGE_SIZE", () => {
    it("should have a value of 10", () => {
      expect(SIDEBAR_FETCH_PAGE_SIZE).toBe(10)
    })
  })

  describe("getSidebarTotal", () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it("should return SIDEBAR_FETCH_PAGE_SIZE when isServer is true", () => {
      mockIsServer.mockReturnValue(true)
      expect(getSidebarTotal()).toBe(SIDEBAR_FETCH_PAGE_SIZE)
    })

    it("should return value from searchParams when isServer is false", () => {
      const mockLocationSearch = "?sidebarTotal=20"
      const searchParamsSpy = jest.spyOn(URLSearchParams.prototype, "get")

      global.window = Object.create(window)

      Object.defineProperty(window, "location", {
        value: {
          search: mockLocationSearch,
        },
        writable: true,
      })

      mockIsServer.mockReturnValue(false)

      expect(getSidebarTotal()).toBe("20")
      expect(searchParamsSpy).toHaveBeenCalledWith("sidebarTotal")
    })

    it("should return SIDEBAR_FETCH_PAGE_SIZE if searchParams value is not available", () => {
      const searchParamsSpy = jest.spyOn(URLSearchParams.prototype, "get")

      global.window = Object.create(window)

      Object.defineProperty(window, "location", {
        value: {
          search: "",
        },
        writable: true,
      })

      mockIsServer.mockReturnValue(false)

      expect(getSidebarTotal()).toBe(SIDEBAR_FETCH_PAGE_SIZE)
      expect(searchParamsSpy).toHaveBeenCalledWith("sidebarTotal")
    })
  })
})
