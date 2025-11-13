import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import "jest-styled-components"
import { FeaturedCollectionsRails } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/FeaturedCollectionsRails/index"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { paginateCarousel } from "@artsy/palette"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.mock("react-tracking")

jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
  useRouter: jest.fn(),
}))

describe("FeaturedCollectionsRails", () => {
  let props
  const trackEvent = jest.fn()
  const renderComponent = (passedProps = props) => {
    return render(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <FeaturedCollectionsRails {...passedProps} />
      </AnalyticsCombinedContextProvider>
    )
  }

  beforeAll(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[1],
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(paginateCarousel as jest.Mock).mockImplementation(() => [0, 100, 200])
    trackEvent.mockClear()
  })

  it("renders expected fields", () => {
    renderComponent()
    expect(screen.getByText("Featured Collections")).toBeInTheDocument()
    expect(screen.getByText("Art Inspired by Cartoons")).toBeInTheDocument()
    expect(
      screen.getByText("Street Art: Celebrity Portraits")
    ).toBeInTheDocument()
    expect(
      screen.getByText("Street Art: Superheroes and Villains")
    ).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks rails clicks", () => {
      renderComponent()
      const links = screen.getAllByRole("link")
      fireEvent.click(links[0])

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "featuredCollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        destination_page_owner_id: "123450",
        destination_page_owner_slug: "art-inspired-by-cartoons",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 0,
        type: "thumbnail",
      })
    })
  })

  it("does not render price guidance for FeaturedCollectionEntity when it is null", () => {
    props.collectionGroup.members[0].priceGuidance = null
    renderComponent()
    expect(screen.queryByText(/From \$/)).not.toBeInTheDocument()
  })
})
