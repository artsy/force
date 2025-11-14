import { CollectionsHubLinkedCollections } from "Apps/__tests__/Fixtures/Collections"
import { ArtistSeriesEntity } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/ArtistSeriesRail/ArtistSeriesEntity"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

// TODO: Update specs
describe.skip("ArtistSeriesEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeAll(() => {
    props = {
      member: CollectionsHubLinkedCollections.linkedCollections[0].members[0],
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
        <ArtistSeriesEntity {...passedProps} />
      </AnalyticsCombinedContextProvider>,
    )
  }

  it("showing the correct text, price guidance, amount of hits and image", () => {
    renderComponent()
    expect(screen.getByText(/Flags unique collections/)).toBeInTheDocument()
    expect(screen.getByText(/From \$1,000/)).toBeInTheDocument()
    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(3)
    expect(images[0]).toHaveAttribute(
      "src",
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
    )
  })

  it("uses small image width when there are more than 2 hits", () => {
    renderComponent()
    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(3)
    expect(images[0]).toHaveAttribute("width", "72")
  })

  it("uses medium image width when there are only 2 hits", () => {
    props.member.artworksConnection.edges.pop()
    renderComponent()
    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute("width", "109")
  })

  it("uses large image width when there is exactly 1 hit", () => {
    props.member.artworksConnection.edges.pop()
    renderComponent()
    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(1)
    expect(images[0]).toHaveAttribute("width", "221")
  })

  it("uses the hit title for alt text if there is no artist", () => {
    renderComponent()
    const images = screen.getAllByRole("img")
    expect(images[0]).toHaveAttribute(
      "alt",
      expect.stringMatching(/A great flag from Jasper/),
    )
  })

  it("uses the artist name and title for alt text if there is an artist", () => {
    props.member.artworksConnection.edges[0].node.artist.name = "Jasper Johns"
    renderComponent()
    const images = screen.getAllByRole("img")
    expect(images[0]).toHaveAttribute(
      "alt",
      expect.stringMatching(/Jasper Johns, A great flag from Jasper/),
    )
  })

  it("if price_guidance is missing, NOT showing 'From $'", () => {
    delete props.member.price_guidance
    renderComponent()
    expect(screen.queryByText(/From \$/)).not.toBeInTheDocument()
  })

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      renderComponent()
      const link = screen.getByRole("link")
      fireEvent.click(link)

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtistSeriesGroup",
        context_module: "artistSeriesRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        curation_boost: false,
        destination_page_owner_id: "4321",
        destination_page_owner_slug: "many-flags",
        destination_page_owner_type: "artistSeries",
        horizontal_slide_position: 1,
        type: "thumbnail",
      })
    })
  })
})
