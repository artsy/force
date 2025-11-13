import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import "jest-styled-components"
import { OtherCollectionsRail } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/OtherCollectionsRail/index"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { paginateCarousel } from "@artsy/palette"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.mock("@artsy/palette", () => {
  const moduleMock = jest.requireActual("@artsy/palette")
  return {
    ...moduleMock,
    useMutationObserver: jest.fn(),
    paginate: () => [0, 100],
  }
})

jest.mock("react-tracking")
jest.mock("found", () => ({
  Link: props => <div>{props.children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
  useRouter: jest.fn(),
}))

describe("CollectionsRail", () => {
  let props
  const trackEvent = jest.fn()

  beforeAll(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[0],
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(paginateCarousel as jest.Mock).mockImplementation(() => [0, 100, 200])
  })

  const renderComponent = (passedProps = props) => {
    return render(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <OtherCollectionsRail {...passedProps} />
      </AnalyticsCombinedContextProvider>
    )
  }

  it("Renders expected fields", () => {
    renderComponent()

    expect(screen.getByText("Other Collections")).toBeInTheDocument()
    expect(screen.getByText("Artist Posters")).toBeInTheDocument()
    expect(screen.getByText("KAWS: Bearbricks")).toBeInTheDocument()
  })

  describe("Tracking", () => {
    it("Tracks link click", () => {
      renderComponent()
      const links = screen.getAllByRole("link")
      fireEvent.click(links[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "otherCollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        destination_page_owner_id: "123457",
        destination_page_owner_slug: "kaws-bearbrick",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 2,
        type: "thumbnail",
      })
    })
  })
})
