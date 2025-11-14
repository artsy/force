import type { Breakpoint } from "@artsy/palette/dist/themes/types"
import { Footer } from "Components/Footer/Footer"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { useRouter } from "System/Hooks/useRouter"
import { render, screen } from "@testing-library/react"
import { fetchQuery } from "react-relay"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn().mockReturnValue({
    match: { location: { pathname: "/" } },
  }),
}))

jest.mock("react-relay", () => ({
  fetchQuery: jest.fn(() => ({
    toPromise: jest.fn().mockResolvedValue(false),
  })),
}))

describe("Footer", () => {
  const mockFetchQuery = fetchQuery as jest.Mock
  const mockUseRouter = useRouter as jest.Mock

  const renderComponent = (breakpoint: Breakpoint) =>
    render(
      <MockBoot breakpoint={breakpoint}>
        <Footer />
      </MockBoot>,
    )

  describe("large screen size", () => {
    it("renders prompts to download the app", () => {
      renderComponent("lg")
      expect(
        screen.getByText("Discover and Buy Art that Moves You"),
      ).toBeInTheDocument()
    })

    it("renders correct routes to partnerships", () => {
      const { container } = renderComponent("lg")

      expect(screen.getByText("Artsy for Galleries")).toBeInTheDocument()
      expect(container.innerHTML).toContain("https://partners.artsy.net")

      expect(screen.getByText("Artsy for Museums")).toBeInTheDocument()
      expect(container.innerHTML).toContain("/institution-partnerships")

      expect(screen.getByText("Artsy for Benefits")).toBeInTheDocument()
      expect(container.innerHTML).toContain("/auction-partnerships")

      expect(screen.getByText("Artsy for Fairs")).toBeInTheDocument()
      expect(container.innerHTML).toContain(
        "https://partners.artsy.net/artsy-fair-partnerships/",
      )
    })

    it("renders links to download the app", () => {
      const { container } = renderComponent("lg")

      expect(screen.getByText("iOS App")).toBeInTheDocument()
      expect(container.innerHTML).toContain(
        "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
      )

      expect(screen.getByText("Android App")).toBeInTheDocument()
      expect(container.innerHTML).toContain(
        "https://play.google.com/store/apps/details?id=net.artsy.app",
      )
    })

    it("renders the CCPA request button", () => {
      renderComponent("xs")
      expect(
        screen.getByRole("button", {
          name: "Do not sell my personal information",
        }),
      ).toBeInTheDocument()
    })

    it("renders the app download banner", () => {
      renderComponent("lg")
      expect(
        screen.getByText("Discover and Buy Art that Moves You"),
      ).toBeInTheDocument()
    })

    it("hides the app download banner if we are on an ignored route", () => {
      mockUseRouter.mockImplementationOnce(() => ({
        match: { location: { pathname: "/meet-your-new-art-advisor" } },
      }))

      renderComponent("lg")
      expect(
        screen.queryByText("Discover and Buy Art that Moves You"),
      ).not.toBeInTheDocument()
    })

    it("hides the app download banner if the artwork is unlisted", async () => {
      mockUseRouter.mockImplementationOnce(() => ({
        match: { params: { artworkID: "foo" } },
      }))

      mockFetchQuery.mockImplementation(() => {
        return {
          toPromise: jest
            .fn()
            .mockResolvedValue({ artwork: { isUnlisted: true } }),
        }
      })

      renderComponent("lg")
      await flushPromiseQueue()
      expect(
        screen.queryByText("Meet your new art advisor."),
      ).not.toBeInTheDocument()
    })

    it("renders footer links", () => {
      const { container } = renderComponent("lg")

      expect(
        screen.getAllByText("Terms and Conditions").length,
      ).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/terms")

      expect(screen.getAllByText("Auction Supplement").length).toBeGreaterThan(
        0,
      )
      expect(container.innerHTML).toContain("/supplemental-cos")

      expect(screen.getAllByText("Buyer Guarantee").length).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/buyer-guarantee")

      expect(screen.getAllByText("Privacy Policy").length).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/privacy")

      expect(screen.getAllByText("Security").length).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/security")
    })
  })

  describe("small screen size", () => {
    it("renders a download banner", () => {
      renderComponent("xs")
      expect(
        screen.getByText("Discover and Buy Art that Moves You"),
      ).toBeInTheDocument()
    })

    it("renders the CCPA request button", () => {
      renderComponent("xs")
      expect(
        screen.getByRole("button", {
          name: "Do not sell my personal information",
        }),
      ).toBeInTheDocument()
    })

    it("renders footer links", () => {
      const { container } = renderComponent("xs")

      expect(
        screen.getAllByText("Terms and Conditions").length,
      ).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/terms")

      expect(screen.getAllByText("Auction Supplement").length).toBeGreaterThan(
        0,
      )
      expect(container.innerHTML).toContain("/supplemental-cos")

      expect(screen.getAllByText("Buyer Guarantee").length).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/buyer-guarantee")

      expect(screen.getAllByText("Privacy Policy").length).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/privacy")

      expect(screen.getAllByText("Security").length).toBeGreaterThan(0)
      expect(container.innerHTML).toContain("/security")
    })
  })
})
