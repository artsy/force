import { MockBoot } from "DevTools/MockBoot"
import { FairAppFragmentContainer } from "Apps/Fair/FairApp"
import { graphql } from "react-relay"
import { FairApp_Test_Query } from "__generated__/FairApp_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { fireEvent, screen } from "@testing-library/react"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"

const mockJumpTo = jest.fn()

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
  useIsRouteActive: () => false,
}))
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: mockJumpTo }),
  Jump: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<FairApp_Test_Query>({
  Component: props => {
    if (!props.fair) return null

    return (
      <MockBoot>
        <AnalyticsCombinedContextProvider
          path="/fair/miart-2020"
          contextPageOwnerId="bson-fair"
        >
          <FairAppFragmentContainer fair={props.fair} />
        </AnalyticsCombinedContextProvider>
      </MockBoot>
    )
  },
  query: graphql`
    query FairApp_Test_Query @relay_test_operation {
      fair(id: "example") {
        ...FairApp_fair
      }
    }
  `,
})

describe("FairApp", () => {
  const trackEvent = jest.fn()
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "fair/miart-2020",
        },
      },
    }))
  })

  afterEach(() => {
    mockUseRouter.mockReset()
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders the overview tab by default", () => {
    renderWithRelay()

    expect(screen.getByText("Overview")).toBeInTheDocument()
  })

  it("sets a title tag", () => {
    renderWithRelay({
      Fair: () => ({ name: "Miart 2020" }),
    })

    expect(document.title).toBe("Miart 2020 | Artsy")
  })

  it("renders the exhibitors tab", () => {
    renderWithRelay({
      Fair: () => ({
        href: "/fair/miart-2020",
      }),
    })

    expect(screen.getByText("Exhibitors A-Z")).toBeInTheDocument()
    expect(screen.getByText("Exhibitors A-Z")).toHaveAttribute(
      "href",
      "/fair/miart-2020/exhibitors"
    )
  })

  it("renders the artworks tab with a count and appropriate href", () => {
    renderWithRelay({
      Fair: () => ({ href: "/fair/miart-2020", counts: { artworks: 2 } }),
    })

    expect(screen.getByText("Artworks")).toBeInTheDocument()
    expect(screen.getByText("Artworks")).toHaveAttribute(
      "href",
      "/fair/miart-2020/artworks"
    )
  })

  it("tracks clicks to the artworks tab", () => {
    renderWithRelay({
      Fair: () => ({
        internalID: "bson-fair",
        slug: "miart-2020",
        href: "/fair/miart-2020",
      }),
    })

    fireEvent.click(screen.getByText("Artworks"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: "fairInfo",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "/fair/miart-2020/artworks",
      subject: "Artworks",
    })
  })

  it("tracks clicks to the exhibitors tab", () => {
    renderWithRelay({
      Fair: () => ({
        internalID: "bson-fair",
        slug: "miart-2020",
        href: "/fair/miart-2020",
      }),
    })

    fireEvent.click(screen.getByText("Exhibitors A-Z"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: "fairInfo",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "/fair/miart-2020/exhibitors",
      subject: "Exhibitors",
    })
  })

  describe("Exhibitors tab", () => {
    beforeEach(() => {
      mockUseRouter.mockImplementation(() => ({
        match: {
          location: {
            pathname: "/exhibitors",
          },
        },
      }))
    })

    it("renders the letters nav", () => {
      renderWithRelay(FAIR_FIXTURE)

      expect(screen.getByText("A")).toBeInTheDocument()
      expect(screen.getByText("B")).toBeInTheDocument()
      expect(screen.getByText("C")).toBeInTheDocument()
    })

    it("scrolls down the page on letter click", () => {
      renderWithRelay(FAIR_FIXTURE)

      fireEvent.click(screen.getByText("C"))

      expect(mockJumpTo).toBeCalled()
    })
  })
})

const FAIR_FIXTURE = {
  Fair: () => ({
    exhibitorsGroupedByName: [
      {
        letter: "A",
        exhibitors: [],
      },
      {
        letter: "C",
        exhibitors: [],
      },
      {
        letter: "D",
        exhibitors: [],
      },
    ],
  }),
}
