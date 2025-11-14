import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { OtherCollectionEntity } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/OtherCollectionsRail/OtherCollectionEntity"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe.skip("OtherCollectionEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeAll(() => {
    props = {
      member: CollectionHubFixture.linkedCollections[0].members[0],
      itemNumber: 1,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const renderComponent = (passedProps = props) => {
    return render(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <OtherCollectionEntity {...passedProps} />
      </AnalyticsCombinedContextProvider>,
    )
  }

  it("Renders collection's meta data", () => {
    renderComponent()
    expect(screen.getByText("Artist Posters")).toBeInTheDocument()
    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(
        "posters_thumbnail.png&width=60&height=60&quality=80&convert_to=jpg",
      ),
    )

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("artist-poster"),
    )
  })

  it("Returns entity with just text when there is no image", () => {
    props.member = CollectionHubFixture.linkedCollections[0].members[1]
    renderComponent()
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      renderComponent()
      const link = screen.getByRole("link")
      fireEvent.click(link)

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "otherCollectionsRail",
        context_page_owner_type: "collection",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        destination_page_owner_id: "123456",
        destination_page_owner_slug: "artist-posters",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 1,
        type: "thumbnail",
      })
    })
  })
})
