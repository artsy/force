import { MockBoot } from "v2/DevTools"
import { FairAppFragmentContainer } from "../FairApp"
import { graphql } from "react-relay"
import { FairApp_Test_Query } from "v2/__generated__/FairApp_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { OwnerType } from "@artsy/cohesion"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { useRouter } from "v2/System/Router/useRouter"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { fireEvent, screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
  useIsRouteActive: () => false,
}))
jest.mock("v2/Utils/scrollHelpers", () => ({
  scrollIntoView: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL<FairApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot
        context={{
          analytics: {
            contextPageOwnerId: "bson-fair",
            contextPageOwnerSlug: "miart-2020",
            contextPageOwnerType: OwnerType.fair,
          },
        }}
      >
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <FairAppFragmentContainer {...props} />
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
const sd = require("sharify").data

describe("FairApp", () => {
  const trackEvent = jest.fn()
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "anything",
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

  it("renders the booths tab with an appropriate href", () => {
    renderWithRelay({
      Fair: () => ({
        href: "/fair/miart-2020",
      }),
    })

    expect(screen.getByText("Booths")).toBeInTheDocument()
    expect(screen.getByText("Booths")).toHaveAttribute(
      "href",
      "/fair/miart-2020/booths"
    )
  })

  it("renders the exhibitors tab when env variable is true", () => {
    sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB = true
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

  it("tracks clicks to the booths tab", () => {
    sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB = false

    renderWithRelay({
      Fair: () => ({
        internalID: "bson-fair",
        slug: "miart-2020",
        href: "/fair/miart-2020",
      }),
    })

    fireEvent.click(screen.getByText("Booths"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: "fairInfo",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "/fair/miart-2020/booths",
      subject: "Booths",
    })
  })

  it("renders the artworks tab with a count and appropriate href", () => {
    renderWithRelay({
      Fair: () => ({ href: "/fair/miart-2020" }),
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

    fireEvent.click(screen.getByText("Booths"))
    fireEvent.click(screen.getByText("Artworks"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: "boothsTab",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "/fair/miart-2020/artworks",
      subject: "Artworks",
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

      expect(scrollIntoView).toBeCalled()
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
