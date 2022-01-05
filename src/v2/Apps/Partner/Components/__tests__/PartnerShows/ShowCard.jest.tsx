import { ShowCardFragmentContainer } from "../../PartnerShows/ShowCard"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ({ partner }: any) => {
    return (
      <ShowCardFragmentContainer show={partner.showsConnection.edges[0].node} />
    )
  },
  query: graphql`
    query ShowCard_Test_Query @relay_test_operation {
      partner(id: "white-cube") @principalField {
        showsConnection(first: 10) {
          edges {
            node {
              internalID
              ...ShowCard_show
            }
          }
        }
      }
    }
  `,
})

describe("ShowCard", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Show: () => ({
        name: "Ellen Altfest | Nature",
        href: "/show/white-cube-ellen-altfest-nature",
        isFairBooth: false,
        exhibitionPeriod: "April 16 – May 30",
        coverImage: {
          medium: {
            src: "https://d7hftxdivxxvm.cloudfront.net?example-1.jpg",
            srcSet: "https://d7hftxdivxxvm.cloudfront.net?example-2.jpg",
          },
        },
      }),
    })

    expect(wrapper.find("a").props().href).toEqual(
      "/show/white-cube-ellen-altfest-nature"
    )
    expect(wrapper.find("img").props().src).toEqual(
      "https://d7hftxdivxxvm.cloudfront.net?example-1.jpg"
    )
    expect(wrapper.find("img").props().srcSet).toEqual(
      "https://d7hftxdivxxvm.cloudfront.net?example-2.jpg"
    )
    expect(wrapper.find("img").props().alt).toEqual("Ellen Altfest | Nature")
    expect(wrapper.find("h5").first().text()).toEqual("show")
    expect(wrapper.find("h4").first().text()).toEqual("Ellen Altfest | Nature")
    expect(wrapper.find("h6").first().text()).toEqual("April 16 – May 30")
  })

  it("renders 'Show' type when isFairBooth is false", () => {
    const wrapper = getWrapper({
      Show: () => ({
        isFairBooth: false,
      }),
    })
    expect(wrapper.find("h5").first().text()).toEqual("show")
  })

  it("renders 'Fair Booth' type when isFairBooth is true", () => {
    const wrapper = getWrapper({
      Show: () => ({
        isFairBooth: true,
      }),
    })
    expect(wrapper.find("h5").first().text()).toEqual("fair booth")
  })
  it("not renders the text if no data is null/undefined", () => {
    const wrapper = getWrapper({
      Show: () => ({
        name: null,
        isFairBooth: null,
        exhibitionPeriod: null,
        coverImage: null,
      }),
    })
    expect(wrapper.find("img").length).toEqual(0)
    expect(wrapper.find("h5").length).toEqual(0)
    expect(wrapper.find("h4").length).toEqual(0)
    expect(wrapper.find("h6").length).toEqual(0)
  })
})
