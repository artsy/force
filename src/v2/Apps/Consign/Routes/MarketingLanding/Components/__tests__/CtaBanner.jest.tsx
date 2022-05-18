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
    describe("not logged in", () => {
      beforeEach(() => {
        renderComponent("xs")
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

    describe("logged in", () => {
      beforeEach(() => {
        renderComponent("xs", testUser)
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
