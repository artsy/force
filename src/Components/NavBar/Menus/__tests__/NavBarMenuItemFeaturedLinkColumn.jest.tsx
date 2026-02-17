import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarMenuItemFeaturedLinkColumn } from "Components/NavBar/Menus/NavBarMenuItemFeaturedLinkColumn"
import { render, screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "owner-id",
    contextPageOwnerSlug: "owner-slug",
    contextPageOwnerType: "Artist",
  })),
}))

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useFragment: jest.fn(),
}))

const MOCK_FEATURED_LINK_DATA = {
  items: [
    {
      __typename: "FeaturedLink",
      title: "Test Featured Title",
      subtitle: "Test Featured Subtitle",
      href: "/collection/test-featured",
      image: {
        cropped: {
          src: "https://example.com/image.jpg",
          srcSet: "https://example.com/image.jpg 1x",
          width: 400,
          height: 400,
        },
      },
    },
  ],
}

describe("NavBarMenuItemFeaturedLinkColumn", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    const { useFragment } = require("react-relay")
    ;(useFragment as jest.Mock).mockReturnValue(MOCK_FEATURED_LINK_DATA)

    return render(
      <NavBarMenuItemFeaturedLinkColumn
        orderedSet={{} as any}
        contextModule={
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
        }
        label="Artworks"
        headerText="Get Inspired"
        {...passedProps}
      />,
    )
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  beforeEach(() => {
    trackEvent.mockClear()
  })

  describe("rendering", () => {
    it("renders headerText", () => {
      getWrapper({ headerText: "Get Inspired" })

      expect(screen.getByText("Get Inspired")).toBeInTheDocument()
    })

    it("renders link with title, subtitle and href", () => {
      const { container } = getWrapper()

      expect(screen.getByText("Test Featured Title")).toBeInTheDocument()
      expect(screen.getByText("Test Featured Subtitle")).toBeInTheDocument()

      const link = container.querySelector(
        'a[href="/collection/test-featured"]',
      )
      expect(link).toBeInTheDocument()
    })

    it("renders image when isVisible is true", () => {
      getWrapper({ isVisible: true })

      const img = document.querySelector(
        'img[src="https://example.com/image.jpg"]',
      )
      expect(img).toBeInTheDocument()
    })

    it("does not render image when isVisible is false", () => {
      getWrapper({ isVisible: false })

      const img = document.querySelector("img")
      expect(img).not.toBeInTheDocument()
    })

    it("returns null when no FeaturedLink in items", () => {
      const { useFragment } = require("react-relay")
      ;(useFragment as jest.Mock).mockReturnValue({ items: [] })

      const { container } = render(
        <NavBarMenuItemFeaturedLinkColumn
          orderedSet={{} as any}
          contextModule={
            DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
          }
          label="Artworks"
          headerText="Get Inspired"
        />,
      )

      expect(container.firstChild).toBeNull()
    })

    it("returns null when FeaturedLink has no image.cropped", () => {
      const { useFragment } = require("react-relay")
      ;(useFragment as jest.Mock).mockReturnValue({
        items: [
          {
            __typename: "FeaturedLink",
            title: "No Image",
            subtitle: "Subtitle",
            href: "/link",
            image: { cropped: null },
          },
        ],
      })

      const { container } = render(
        <NavBarMenuItemFeaturedLinkColumn
          orderedSet={{} as any}
          contextModule={
            DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
          }
          label="Artworks"
          headerText="Get Inspired"
        />,
      )

      expect(container.firstChild).toBeNull()
    })
  })

  describe("analytics", () => {
    it("tracks analytics on link click", () => {
      getWrapper()

      const link = screen.getByText("Test Featured Title").closest("a")
      fireEvent.click(link!)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "click",
        flow: "Header",
        context_module:
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown,
        context_page_owner_type: "Artist",
        context_page_owner_id: "owner-id",
        context_page_owner_slug: "owner-slug",
        parent_navigation_item: "Artworks",
        dropdown_group: "Get Inspired",
        subject: "Test Featured Title",
        destination_path: "/collection/test-featured",
      })
    })
  })
})
