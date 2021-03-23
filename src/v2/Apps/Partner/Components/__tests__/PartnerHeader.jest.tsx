import React from "react"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PartnerHeader_Test_Query } from "v2/__generated__/PartnerHeader_Test_Query.graphql"
import {
  HeaderImage,
  PartnerHeaderFragmentContainer as PartnerHeader,
} from "v2/Apps/Partner/Components/PartnerHeader"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerHeaderAddress } from "../PartnerHeader/PartnerHeaderAddress"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "../PartnerHeader/PartnerHeaderImage"

jest.unmock("react-relay")
jest.mock("v2/Components/RouteTabs")

const { getWrapper } = setupTestWrapper<PartnerHeader_Test_Query>({
  Component: ({ partner }: any) => {
    return <PartnerHeader partner={partner} />
  },
  query: graphql`
    query PartnerHeader_Test_Query @raw_response_type {
      partner(id: "white-cube") {
        ...PartnerHeader_partner
      }
    }
  `,
})

describe("PartnerHeader", () => {
  it("displays basic information about partner profile", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        name: "White cube",
        profile: {
          cropped: {
            src: "/img.png",
            srcSet: "/img.png",
          },
          image: {
            sm: {
              url: "img.jpg",
              srcSet: "img.jpg",
            },
          },
        },
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
    const text = wrapper.text()

    expect(wrapper.find(PartnerHeaderImage).length).toEqual(1)
    expect(wrapper.find(HeaderImage).length).toEqual(1)
    expect(wrapper.find(FollowProfileButton).length).toEqual(1)
    expect(text).toContain("White cube")
    expect(text).toContain(
      "Jeddah\u00a0\u00a0•\u00a0 Jeddah\u00a0\u00a0•\u00a0 Jeddah"
    )
  })

  it("displays links to partner profile page", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        name: "White cube",
        href: "/white-cube",
        profile: {
          cropped: {
            src: "/img.png",
            srcSet: "/img.png",
          },
        },
      }),
    })

    const PartnerNameLink = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "White cube")

    const PartnerIconLink = wrapper
      .find(RouterLink)
      .filterWhere(c => c.children().find(HeaderImage).length > 0)

    expect(PartnerNameLink.length).toEqual(1)
    expect(PartnerNameLink.first().prop("to")).toEqual("/white-cube")
    expect(PartnerIconLink.length).toEqual(1)
    expect(PartnerIconLink.first().prop("to")).toEqual("/white-cube")
  })

  it("doesn't display profile address if there is no info", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        locations: {
          totalCount: 0,
        },
      }),
    })

    expect(wrapper.find(PartnerHeaderAddress).length).toEqual(0)
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

  it("doesn't display profile icon if there is no info", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        profile: null,
      }),
    })

    expect(wrapper.find(HeaderImage).length).toEqual(0)
  })

  it("doesn't display follow button if there is no info", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        profile: null,
      }),
    })

    expect(wrapper.find(FollowProfileButton).length).toEqual(0)
  })

  it("doesn't display follow button if partner type is equal to Auction House", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        type: "Auction House",
      }),
    })

    expect(wrapper.find(FollowProfileButton).length).toEqual(0)
  })
})
