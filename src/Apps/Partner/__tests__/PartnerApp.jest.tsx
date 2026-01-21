import { PartnerAppFragmentContainer } from "Apps/Partner/PartnerApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { PartnerAppTestQuery } from "__generated__/PartnerAppTestQuery.graphql"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")

const mockRouterMatch = {
  location: {
    pathname: "/partner/example",
    query: {},
  },
}

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: mockRouterMatch,
  }),
  useIsRouteActive: () => false,
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("Utils/getENV", () => ({
  getENV: (key: string) => {
    if (key === "APP_URL") return "https://www.artsy.net"
    return undefined
  },
}))

const { renderWithRelay } = setupTestWrapperTL<PartnerAppTestQuery>({
  Component: props => {
    return (
      <HeadProvider>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <PartnerAppFragmentContainer {...props} />
      </HeadProvider>
    )
  },
  query: graphql`
    query PartnerAppTestQuery @relay_test_operation {
      partner(id: "example") {
        ...PartnerApp_partner
      }
    }
  `,
})

describe("PartnerApp", () => {
  beforeEach(() => {
    mockRouterMatch.location = { pathname: "/partner/example", query: {} }
  })

  it("displays navigation tabs for the partner page", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: true,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        slug: "example-partner",
        counts: {
          eligibleArtworks: 5,
          displayableShows: 3,
        },
      }),
    })
    // Check for the presence of navigation tabs by looking for sub-page links
    const navLinks = container.querySelectorAll(
      "a[href^='/partner/example-partner/']",
    )
    expect(navLinks.length).toBeGreaterThan(0)
  })

  it("does not display nav tabs for limited profile", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: false,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        slug: "example-partner",
      }),
    })
    // Check for navigation tabs specifically - should not find multiple navigation links
    const navLinks = container.querySelectorAll(
      "a[href^='/partner/example-partner/']",
    )
    expect(navLinks).toHaveLength(0)
  })

  it("displays navigation tabs for brand partner", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: false,
        partnerType: "Brand",
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        slug: "brand-partner",
        counts: {
          eligibleArtworks: 5,
        },
      }),
    })
    const navLinks = container.querySelectorAll(
      "a[href^='/partner/brand-partner/']",
    )
    expect(navLinks.length).toBeGreaterThan(0)
  })

  it("displays header image for the partner page", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        profile: {
          image: {
            url: "img.jpg",
          },
        },
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        displayFullPartnerPage: true,
      }),
    })

    // Check for an image element that would be rendered by the FullBleedHeader
    expect(container.querySelector("img")).toBeTruthy()
  })

  it("doesn't display profile image if there is no info", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        profile: {
          image: null,
        },
      }),
    })
    expect(container.querySelector("img")).toBeFalsy()
  })

  it("doesn't display profile image if the partner isn't eligible for a full profile", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: false,
      }),
    })

    expect(container.querySelector("img")).toBeFalsy()
  })

  it("sets canonical URL to current pathname for normal partner subpage", () => {
    mockRouterMatch.location = {
      pathname: "/partner/gagosian/shows",
      query: {},
    }

    renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: true,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        slug: "gagosian",
        meta: {
          title: "Gagosian",
          description: "Gallery description",
        },
      }),
    })

    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical?.getAttribute("href")).toBe(
      "https://www.artsy.net/partner/gagosian/shows",
    )
  })

  it("sets canonical URL with page parameter for paginated pages", () => {
    mockRouterMatch.location = {
      pathname: "/partner/gagosian/articles",
      query: { page: "2" },
    }

    renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: true,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        slug: "gagosian",
        meta: {
          title: "Gagosian - Articles",
          description: "Gallery articles",
        },
      }),
    })

    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical?.getAttribute("href")).toBe(
      "https://www.artsy.net/partner/gagosian/articles?page=2",
    )
  })

  it("includes og:image and thumbnail meta tags when partner has image", () => {
    renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: true,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        slug: "example-partner",
        meta: {
          title: "Example Partner",
          description: "Partner description",
          image: "https://example.com/partner-image.jpg",
        },
      }),
    })

    const ogImage = document.querySelector('meta[property="og:image"]')
    expect(ogImage?.getAttribute("content")).toBe(
      "https://example.com/partner-image.jpg",
    )

    const thumbnail = document.querySelector('meta[name="thumbnail"]')
    expect(thumbnail?.getAttribute("content")).toBe(
      "https://example.com/partner-image.jpg",
    )
  })

  it("does not include og:image meta tags when partner has no image", () => {
    renderWithRelay({
      Partner: () => ({
        displayFullPartnerPage: true,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        slug: "example-partner",
        meta: {
          title: "Example Partner",
          description: "Partner description",
          image: null,
        },
      }),
    })

    const ogImage = document.querySelector('meta[property="og:image"]')
    expect(ogImage).toBeNull()

    const thumbnail = document.querySelector('meta[name="thumbnail"]')
    expect(thumbnail).toBeNull()
  })
})
