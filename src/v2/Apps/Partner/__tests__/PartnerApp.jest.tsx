import React from "react"
import { graphql } from "react-relay"
import { PartnerApp_Test_Query } from "v2/__generated__/PartnerApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PartnerAppFragmentContainer } from "../PartnerApp"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "../Components/PartnerHeader/PartnerHeaderImage"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/Utils/Hooks/useMatchMedia")

const { getWrapper } = setupTestWrapper<PartnerApp_Test_Query>({
  Component: props => {
    return <PartnerAppFragmentContainer {...props} />
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
    const wrapper = getWrapper()
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
})
