import { fireEvent, render, screen } from "@testing-library/react"
import { MockBoot } from "DevTools"
import { useTracking } from "react-tracking"
import { Breakpoint } from "Utils/Responsive"
import { CtaBannerContent } from "Apps/Consign/Routes/MarketingLanding/Components/CtaBanner"

jest.mock("react-tracking")
jest.mock("System/Analytics/AnalyticsContext", () => ({
  ...jest.requireActual("System/Analytics/AnalyticsContext"),
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))

const trackEvent = useTracking as jest.Mock

const testUser = { id: "1", email: "test@test.test" }

const renderComponent = (breakpoint: Breakpoint, user?: User) =>
  render(
    <MockBoot breakpoint={breakpoint} context={{ user: user }}>
      <CtaBannerContent />
    </MockBoot>
  )

const sharedTests = () => {
  it("tracks get in touch click", () => {
    fireEvent.click(screen.getByText("Get in Touch"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedGetInTouch",
      context_module: "StickyBanner",
      context_page_owner_type: "sell",
      label: "Get in Touch",
    })
  })

  it("tracks submit click", () => {
    fireEvent.click(screen.getByText("Submit an Artwork"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedSubmitAnArtwork",
      context_module: "StickyBanner",
      context_page_owner_type: "sell",
      label: "Submit an Artwork",
      destination_path: "/sell/submission",
    })
  })
}

describe("CtaBannerContent", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  describe("desktop", () => {
    describe("not logged in", () => {
      beforeEach(() => {
        renderComponent("lg")
      })

      it("renders correctly", () => {
        expect(
          screen.queryByText(
            "Submit an artwork, or contact an Artsy specialist to discuss selling with us."
          )
        ).toBeInTheDocument()
        expect(screen.getByText("Get in Touch")).toBeInTheDocument()
        expect(screen.getByText("Submit an Artwork")).toBeInTheDocument()
      })

      sharedTests()
    })

    describe("logged in", () => {
      beforeEach(() => {
        renderComponent("lg", testUser)
      })

      it("tracks get in touch click", () => {
        fireEvent.click(screen.getByText("Get in Touch"))

        expect(trackEvent).toHaveBeenCalled()
        expect(trackEvent).toHaveBeenCalledWith({
          action: "clickedGetInTouch",
          context_module: "StickyBanner",
          context_page_owner_type: "sell",
          label: "Get in Touch",
          user_id: testUser.id,
          user_email: testUser.email,
        })
      })
    })
  })
})

describe("mWeb", () => {
  describe("not logged in", () => {
    beforeEach(() => {
      renderComponent("xs")
    })

    it("doesn't render the component", () => {
      expect(
        screen.queryByText(
          "Submit an artwork, or contact an Artsy specialist to discuss selling with us."
        )
      ).not.toBeInTheDocument()
      expect(() => screen.getByText("Get in Touch")).toThrow()
      expect(() => screen.getByText("Submit an Artwork")).toThrow()
    })
  })
})
