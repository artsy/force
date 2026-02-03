import { fireEvent, render, screen } from "@testing-library/react"
import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import "jest-styled-components"
import { RelatedCollectionsRail } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { clone, drop } from "lodash"
import { useTracking } from "react-tracking"

jest.mock("@artsy/palette", () => {
  const moduleMock = jest.requireActual("@artsy/palette")
  return {
    ...moduleMock,
    paginateCarousel: jest.fn(() => [0, 100, 200]),
  }
})

jest.mock("react-tracking")

describe.skip("CollectionsRail", () => {
  let props
  const trackEvent = jest.fn()

  const renderComponent = (passedProps = props) => {
    return render(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <RelatedCollectionsRail {...passedProps} />
      </AnalyticsCombinedContextProvider>,
    )
  }

  beforeAll(() => {
    props = {
      title: "Street Art",
      collections: CollectionsRailFixture,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("Renders expected fields", () => {
    const { container } = renderComponent()

    expect(screen.getByText(/More like Street Art/)).toBeInTheDocument()
    expect(
      container.querySelectorAll('[data-test-id="related-collection-entity"]'),
    ).toHaveLength(8)
    expect(screen.getByText(/Flags/)).toBeInTheDocument()
    expect(screen.getByText(/From \$1,000/)).toBeInTheDocument()
    expect(screen.getByText(/Street Art Now/)).toBeInTheDocument()
    expect(screen.getByText(/From \$200/)).toBeInTheDocument()
  })

  it("does not render a carousel entry if it has no artworks", () => {
    const collectionsCopy = clone(props.collections)
    collectionsCopy.push({
      slug: "jasper-johns-flags2",
      headerImage: "https://files.artsy.net/images/jasperjohnsflag.png",
      title: "Jasper Johns: Flags Part 2",
      price_guidance: 1000,
      artworksConnection: null,
    })

    const { container } = renderComponent({ collections: collectionsCopy })
    expect(
      container.querySelectorAll('[data-test-id="related-collection-entity"]'),
    ).toHaveLength(8)
  })

  it("Does not render carousel if less than 4 entries", () => {
    props.collections = drop(CollectionsRailFixture, 1)
    const { container } = renderComponent()

    expect(container.textContent).toBeFalsy()
    expect(
      container.querySelectorAll('[data-test-id="related-collection-entity"]'),
    ).toHaveLength(0)
  })

  describe("Tracking", () => {
    it("Tracks impressions", () => {
      renderComponent()

      // Simulate waypoint intersection
      const waypoint = document.querySelector('[data-test-id="waypoint"]')
      if (waypoint) {
        fireEvent.scroll(waypoint)
      }

      expect(trackEvent).toBeCalledWith({
        action_type: "Impression",
        context_module: "CollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "Collection",
      })
    })

    it("Tracks carousel navigation", () => {
      const collectionsCopy = clone(props.collections)
      collectionsCopy.push({
        slug: "jasper-johns-flags2",
        headerImage: "https://files.artsy.net/images/jasperjohnsflag.png",
        title: "Jasper Johns: Flags Part 2",
        price_guidance: 1000,
        artworksConnection: {
          edges: [
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag",
                image: {
                  resized: {
                    url: "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                },
              },
            },
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag (Moratorium)",
                image: {
                  resized: {
                    url: "https://d32dm0rphc51dk.cloudfront.net/Jyhryk2bLDdkpNflvWO0Lg/small.jpg",
                  },
                },
              },
            },
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag I",
                image: {
                  resized: {
                    url: "https://d32dm0rphc51dk.cloudfront.net/gM-IwaZ9C24Y_RQTRW6F5A/small.jpg",
                  },
                },
              },
            },
          ],
        },
      })

      renderComponent({ collections: collectionsCopy })

      const links = document.querySelectorAll("a")
      if (links.length > 2) {
        fireEvent.click(links[2])
      }

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "relatedCollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        destination_page_owner_id: "65432",
        destination_page_owner_slug: "contemporary-limited-editions",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 2,
        type: "thumbnail",
      })
    })
  })
})
