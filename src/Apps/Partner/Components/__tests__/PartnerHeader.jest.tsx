import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { PartnerHeader_Test_Query } from "__generated__/PartnerHeader_Test_Query.graphql"
import {
  HeaderImage,
  PartnerHeaderFragmentContainer as PartnerHeader,
} from "Apps/Partner/Components/PartnerHeader"
import { RouterLink } from "System/Components/RouterLink"
import { PartnerHeaderAddress } from "Apps/Partner/Components/PartnerHeader/PartnerHeaderAddress"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"

jest.unmock("react-relay")
jest.mock("Components/RouteTabs")

const { getWrapper } = setupTestWrapper<PartnerHeader_Test_Query>({
  Component: ({ partner }: any) => {
    return <PartnerHeader partner={partner} />
  },
  query: graphql`
    query PartnerHeader_Test_Query @raw_response_type @relay_test_operation {
      partner(id: "white-cube") {
        ...PartnerHeader_partner
      }
    }
  `,
})

describe("PartnerHeader", () => {
  it("displays basic information about partner profile", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        name: "White cube",
        profile: {
          icon: {
            resized: {
              src: "/img.png",
              srcSet: "/img.png",
            },
          },
        },
        locations: {
          totalCount: 1,
          edges: [
            {
              node: {
                city: "Jeddah",
              },
            },
          ],
        },
      }),
    })
    const text = wrapper.text()

    expect(wrapper.find(HeaderImage).length).toEqual(1)
    expect(wrapper.find(HeaderImage).prop("src")).toEqual("/img.png")
    expect(wrapper.find(FollowProfileButtonQueryRenderer).length).toEqual(1)
    expect(text).toContain("White cube")
    expect(text).toContain("Jeddah")
  })

  it("displays unique address value", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        locations: {
          totalCount: 4,
          edges: [
            {
              node: {
                city: "Jeddah",
              },
            },
            {
              node: {
                city: "Jeddah",
              },
            },
            {
              node: {
                city: " Jeddah",
              },
            },
            {
              node: {
                city: "Jeddah ",
              },
            },
          ],
        },
      }),
    })

    const Address = wrapper.find(PartnerHeaderAddress)

    expect(Address.length).toEqual(1)
    expect(Address.text()).toContain("Jeddah")
  })

  it("displays few addresses", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        locations: {
          totalCount: 4,
          edges: [
            {
              node: {
                city: "Jeddah",
              },
            },
            {
              node: {
                city: "New York",
              },
            },
            {
              node: {
                city: "San Francisco",
              },
            },
            {
              node: {
                city: null,
              },
            },
          ],
        },
      }),
    })

    const Address = wrapper.find(PartnerHeaderAddress)

    expect(Address.length).toEqual(1)
    expect(Address.text()).toContain(
      "Jeddah\u00a0\u00a0•\u00a0 New York\u00a0\u00a0•\u00a0 San Francisco"
    )
  })

  it("does not display address", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        name: "White cube",
        locations: {
          totalCount: 1,
          edges: [
            {
              node: {
                city: null,
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.find(PartnerHeaderAddress).text()).toContain("")
  })

  it("displays links to partner profile page", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        name: "White cube",
        slug: "white-cube",
        profile: {
          icon: {
            resized: {
              src: "/img.png",
            },
          },
        },
      }),
    })

    const PartnerNameLink = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "White cube")

    const PartnerIconLink = wrapper
      .find(RouterLink)
      .filterWhere(
        c =>
          c.children().find(HeaderImage).length > 0 &&
          c.children().find(HeaderImage).prop("src") === "/img.png"
      )

    expect(PartnerNameLink.length).toEqual(1)
    expect(PartnerNameLink.first().prop("to")).toEqual("/partner/white-cube")
    expect(PartnerIconLink.length).toEqual(1)
    expect(PartnerIconLink.first().prop("to")).toEqual("/partner/white-cube")
  })

  it("doesn't display profile address if there is no info", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        locations: {
          totalCount: 0,
        },
      }),
    })

    expect(wrapper.find(PartnerHeaderAddress).length).toEqual(0)
  })

  it("doesn't display profile icon if there is no info", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        profile: null,
      }),
    })

    expect(wrapper.find(HeaderImage).length).toEqual(0)
  })

  it("doesn't display follow button if there is no info", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        profile: null,
      }),
    })

    expect(wrapper.find(FollowProfileButtonQueryRenderer).length).toEqual(0)
  })

  it("doesn't display follow button if partner type is equal to Auction House", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        type: "Auction House",
      }),
    })

    expect(wrapper.find(FollowProfileButtonQueryRenderer).length).toEqual(0)
  })

  it("doesn't display the follow count", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        name: "White cube",
        profile: {
          counts: {
            follows: 100,
          },
        },
      }),
    })

    expect(wrapper.text()).not.toContain("100 Followers")
  })

  it("displays the follow count", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        name: "White cube",
        profile: {
          counts: {
            follows: 500,
          },
        },
      }),
    })

    expect(wrapper.text()).toContain("500 Followers")
  })
})
