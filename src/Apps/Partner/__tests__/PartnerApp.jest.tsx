import { PartnerAppFragmentContainer } from "Apps/Partner/PartnerApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { PartnerAppTestQuery } from "__generated__/PartnerAppTestQuery.graphql"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        artistId: "andy-warhol",
      },
      location: {
        pathname: "/partner/example",
      },
    },
  }),
  useIsRouteActive: () => false,
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
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
      "a[href^='/partner/example-partner/']"
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
      "a[href^='/partner/example-partner/']"
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
      "a[href^='/partner/brand-partner/']"
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
})
