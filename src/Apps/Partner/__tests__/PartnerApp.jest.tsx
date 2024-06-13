import { graphql } from "react-relay"
import { PartnerApp_Test_Query } from "__generated__/PartnerApp_Test_Query.graphql"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { PartnerAppFragmentContainer } from "Apps/Partner/PartnerApp"
import { PartnerHeaderImageFragmentContainer } from "Apps/Partner/Components/PartnerHeader/PartnerHeaderImage"
import { HeadProvider } from "react-head"

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

const { getWrapper } = setupTestWrapper<PartnerApp_Test_Query>({
  Component: props => {
    return (
      <HeadProvider>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <PartnerAppFragmentContainer {...props} />
      </HeadProvider>
    )
  },
  query: graphql`
    query PartnerApp_Test_Query @relay_test_operation {
      partner(id: "example") {
        ...PartnerApp_partner
      }
    }
  `,
})

describe("PartnerApp", () => {
  it("displays navigation tabs for the partner page", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: true,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
      }),
    })
    expect(wrapper.find("NavigationTabs").length).toBe(1)
  })

  it("does not display nav tabs for limited profile", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: false,
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
      }),
    })
    expect(wrapper.find("NavigationTabs").length).toBe(0)
  })

  it("displays navigation tabs for brand partner", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: false,
        partnerType: "Brand",
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
      }),
    })
    expect(wrapper.find("NavigationTabs").length).toBe(1)
  })

  it("displays header image for the partner page", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        profile: {
          image: {
            sm: {
              url: "img.jpg",
              srcSet: "img.jpg",
            },
          },
        },
        isDefaultProfilePublic: true,
        partnerPageEligible: true,
        displayFullPartnerPage: true,
      }),
    })

    expect(wrapper.find(PartnerHeaderImageFragmentContainer).length).toEqual(1)
  })

  it("doesn't display profile image if there is no info", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        profile: {
          image: null,
        },
      }),
    })
    expect(wrapper.find(PartnerHeaderImageFragmentContainer).length).toBe(0)
  })

  it("doesn't display profile image if the partner isn't eligible for a full profile", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: false,
      }),
    })

    expect(wrapper.find(PartnerHeaderImageFragmentContainer)).toHaveLength(0)
  })
})
