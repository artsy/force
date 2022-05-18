import { fireEvent, render, screen } from "@testing-library/react"
import { MockBoot } from "v2/DevTools"
import { useTracking } from "v2/System/Analytics"
import { Breakpoint } from "v2/Utils/Responsive"
import { CtaBannerContent } from "../CtaBanner"

jest.mock("v2/System/Analytics/useTracking")

jest.mock("v2/System/Analytics/AnalyticsContext", () => ({
  ...jest.requireActual("System/Analytics/AnalyticsContext"),
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))

const trackEvent = useTracking as jest.Mock

const renderWithBreakpoint = (breakpoint: Breakpoint = "lg") =>
  render(
    <MockBoot breakpoint={breakpoint}>
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
      destination_path: "/sell/submission/artwork-details",
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("mobile", () => {
    beforeEach(() => {
      renderWithBreakpoint("xs")
    })

    it("renders correctly", () => {
      expect(
        screen.queryByText(
          "Submit an artwork, or contact an Artsy specialist to discuss selling with us."
        )
      ).not.toBeInTheDocument()
      expect(screen.getByText("Get in Touch")).toBeInTheDocument()
      expect(screen.getByText("Submit an Artwork")).toBeInTheDocument()
    })

    sharedTests()
  })

  describe("desktop", () => {
    beforeEach(() => {
      renderWithBreakpoint()
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
})
