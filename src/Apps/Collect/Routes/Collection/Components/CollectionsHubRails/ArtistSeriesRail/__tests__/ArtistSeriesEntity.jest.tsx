import { CollectionsHubLinkedCollections } from "Apps/__tests__/Fixtures/Collections"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import { ArtistSeriesEntity } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/ArtistSeriesRail/ArtistSeriesEntity"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { Image } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

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

  const getWrapper = (passedProps = props) => {
    return mount(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <ArtistSeriesEntity {...passedProps} />
      </AnalyticsCombinedContextProvider>
    )
  }

  it("showing the correct text, price guidance, amount of hits and image", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Flags unique collections")
    expect(component.text()).toMatch("From $1,000")
    expect(component.find(Image).length).toBe(3)
    expect(component.find(Image).at(0).getElement().props.src).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
  })

  it("uses small image width when there are more than 2 hits", () => {
    const component = getWrapper()
    expect(component.find(Image).length).toBe(3)
    expect(component.find(Image).at(0).getElement().props.width).toBe(72)
  })

  it("uses medium image width when there are only 2 hits", () => {
    props.member.artworksConnection.edges.pop()
    const component = getWrapper()
    expect(component.find(Image).length).toBe(2)
    expect(component.find(Image).at(0).getElement().props.width).toBe(109)
  })

  it("uses large image width when there is exactly 1 hit", () => {
    props.member.artworksConnection.edges.pop()
    const component = getWrapper()
    expect(component.find(Image).length).toBe(1)
    expect(component.find(Image).at(0).getElement().props.width).toBe(221)
  })

  it("uses the hit title for alt text if there is no artist", () => {
    const component = getWrapper()
    expect(component.find(Image).at(0).getElement().props.alt).toMatch(
      "A great flag from Jasper"
    )
  })

  it("uses the artist name and title for alt text if there is an artist", () => {
    props.member.artworksConnection.edges[0].node.artist.name = "Jasper Johns"
    const component = getWrapper()
    expect(component.find(Image).at(0).getElement().props.alt).toMatch(
      "Jasper Johns, A great flag from Jasper"
    )
  })

  it("if price_guidance is missing, NOT showing 'From $'", () => {
    delete props.member.price_guidance
    const component = getWrapper()
    expect(component.text()).not.toMatch("From $")
  })

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      const component = getWrapper()
      component.find(RouterLink).at(0).simulate("click")

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
