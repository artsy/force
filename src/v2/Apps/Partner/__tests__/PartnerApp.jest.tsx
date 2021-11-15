import { graphql } from "react-relay"
import { PartnerApp_Test_Query } from "v2/__generated__/PartnerApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PartnerAppFragmentContainer } from "../PartnerApp"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "../Components/PartnerHeader/PartnerHeaderImage"
import { HeadProvider } from "react-head"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/Router/useRouter", () => ({
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
    query PartnerApp_Test_Query {
      partner(id: "example") {
        ...PartnerApp_partner
      }
    }
  `,
})

describe("PartnerApp", () => {
  it("displays navigation tabs for the partner page", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: true,
      }),
    })
    expect(wrapper.find("NavigationTabs").length).toBe(1)
  })

  it("does not display nav tabs for limited profile", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: false,
      }),
    })
    expect(wrapper.find("NavigationTabs").length).toBe(0)
  })

  it("displays navigation tabs for brand partner", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: false,
        partnerType: "Brand",
      }),
    })
    expect(wrapper.find("NavigationTabs").length).toBe(1)
  })

  it("displays header image for the partner page", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        profile: {
          image: {
            sm: {
              url: "img.jpg",
              srcSet: "img.jpg",
            },
          },
        },
      }),
    })

    expect(wrapper.find(PartnerHeaderImage).length).toEqual(1)
  })

  it("doesn't display profile image if there is no info", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        profile: {
          image: null,
        },
      }),
    })
    const profileImageHtml = wrapper.find(PartnerHeaderImage).html()

    expect(profileImageHtml).toBe("")
  })

  it("doesn't display profile image if the partner isn't eligible for a full profile", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        displayFullPartnerPage: false,
      }),
    })

    expect(wrapper.find(PartnerHeaderImage)).toHaveLength(0)
  })
})
