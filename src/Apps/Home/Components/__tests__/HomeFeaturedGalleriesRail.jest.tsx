import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { HomeFeaturedGalleriesRailFragmentContainer } from "Apps/Home/Components/HomeFeaturedGalleriesRail"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HomeFeaturedGalleriesRailFragmentContainer
        orderedSet={props.orderedSet!}
      />
    )
  },
  query: graphql`
    query HomeFeaturedGalleriesRail_Test_Query @relay_test_operation {
      orderedSet(id: "example") {
        ...HomeFeaturedGalleriesRail_orderedSet
      }
    }
  `,
})

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeFeaturedGalleriesRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Partner: () => ({
        name: "Test Gallery",
        href: "/test-href",
      }),
    })

    expect(screen.getByText("Featured Galleries")).toBeInTheDocument()
    expect(screen.getByText("View All Galleries")).toBeInTheDocument()
    expect(screen.getByText("Test Gallery")).toBeInTheDocument()
    expect(screen.getAllByRole("link")[2]).toHaveAttribute("href", "/test-href")
  })

  it("shows initials if no images", () => {
    renderWithRelay({
      Profile: () => ({
        owner: {
          initials: "initials",
        },
        image: {
          cropped: {
            src: null,
          },
        },
      }),
    })

    expect(screen.getByText("initials")).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[2])

      expect(trackEvent).toBeCalledWith({
        action: "clickedGalleryGroup",
        context_module: "featuredGalleriesRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Partner-mock-id-1>",
        destination_page_owner_slug: "<Partner-mock-id-2>",
        destination_page_owner_type: "galleries",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedGalleryGroup",
        context_module: "featuredGalleriesRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "galleries",
        type: "viewAll",
      })
    })
  })
})
