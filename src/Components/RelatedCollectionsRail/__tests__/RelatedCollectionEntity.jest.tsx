import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { RelatedCollectionEntity } from "Components/RelatedCollectionsRail/RelatedCollectionEntity"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe.skip("RelatedCollectionEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeAll(() => {
    props = {
      collection: CollectionsRailFixture[0],
      slideIndex: 1,
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
        <RelatedCollectionEntity {...passedProps} />
      </AnalyticsCombinedContextProvider>
    )
  }

  it("Renders expected fields", () => {
    renderComponent()

    expect(screen.getByText(/Jasper Johns:/)).toBeInTheDocument()
    expect(screen.getByText(/Flags/)).toBeInTheDocument()
    expect(screen.getByText(/From \$1,000/)).toBeInTheDocument()

    const images = document.querySelectorAll("img")
    expect(images).toHaveLength(3)

    const artworkImage = images[0]
    expect(artworkImage.getAttribute("src")).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
    expect(artworkImage.getAttribute("alt")).toBe("Flag")
  })

  it("Returns proper image size if 2 artworks returned", () => {
    props.collection.artworksConnection.edges.pop()
    renderComponent()
    const images = document.querySelectorAll("img")
    expect(images).toHaveLength(2)
  })

  it("Tracks link clicks", () => {
    renderComponent()

    const link = document.querySelector('a[href*="collection"]')
    if (link) {
      fireEvent.click(link)
    }

    expect(trackEvent).toBeCalledWith({
      action: "clickedCollectionGroup",
      context_module: "relatedCollectionsRail",
      context_page_owner_id: "1234",
      context_page_owner_slug: "slug",
      context_page_owner_type: "collection",
      destination_page_owner_id: "54321",
      destination_page_owner_slug: "jasper-johns-flags",
      destination_page_owner_type: "collection",
      horizontal_slide_position: 1,
      type: "thumbnail",
    })
  })
})
