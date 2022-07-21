import { render, screen } from "@testing-library/react"
import { MarketingLandingApp } from "../MarketingLandingApp"
import { HeadProvider } from "react-head"
import { useTracking } from "System/Analytics"

let sessionStore = {}
Object.defineProperty(window, "sessionStorage", {
  value: { getItem: key => sessionStore[key] || null, setItem: jest.fn() },
})

let mockQueryUtmParams = {}
const mockSessionUtmParams = {
  utmMedium: "SessionMedium",
  utmSource: "SessionSource",
  utmTerm: "SessionTerm",
}
jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { location: { query: mockQueryUtmParams } },
  })),
}))

jest.mock("System/Analytics/useTracking")
const trackEventMock = jest.fn()

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("MarketingLandingApp", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEventMock }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Initial render", () => {
    it("renders correctly", async () => {
      render(
        <HeadProvider>
          <MarketingLandingApp />
        </HeadProvider>
      )

      expect(
        screen.queryByText("Sell Artworks from Your Collection")
      ).toBeInTheDocument()
      expect(screen.queryByText(/^Gallery or art dealer/)).toBeInTheDocument()
      expect(screen.queryByText("Why Sell with Artsy")).toBeInTheDocument()
      expect(screen.queryByText("How It Works")).toBeInTheDocument()
      expect(
        screen.queryByText("Frequently Asked Questions")
      ).toBeInTheDocument()
    })
  })

  describe("Saving UTM params to session storage", () => {
    it("save if session storage is empty", async () => {
      mockQueryUtmParams = {
        utm_medium: "QueryMedium",
        utm_source: "QuerySource",
        utm_term: "QueryTerm",
      }

      const savedQueryUtmParams = {
        utmMedium: "QueryMedium",
        utmSource: "QuerySource",
        utmTerm: "QueryTerm",
      }

      render(
        <HeadProvider>
          <MarketingLandingApp />
        </HeadProvider>
      )

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "utmParams",
        JSON.stringify({ ...savedQueryUtmParams })
      )
    })

    it("don't save if session storage already has UTM params", async () => {
      sessionStore = { utmParams: JSON.stringify({ ...mockSessionUtmParams }) }

      render(
        <HeadProvider>
          <MarketingLandingApp></MarketingLandingApp>
        </HeadProvider>
      )

      expect(sessionStorage.setItem).toHaveBeenCalledTimes(0)
    })
  })
})
