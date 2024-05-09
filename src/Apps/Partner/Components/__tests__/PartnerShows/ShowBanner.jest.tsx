import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ShowBannerFragmentContainer } from "Apps/Partner/Components/PartnerShows"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ({ partner }: any) => {
    return (
      <ShowBannerFragmentContainer
        show={partner.showsConnection.edges[0].node}
      />
    )
  },
  query: graphql`
    query ShowBanner_Test_Query @relay_test_operation {
      partner(id: "white-cube") @principalField {
        showsConnection(first: 1) {
          edges {
            node {
              ...ShowBanner_show
            }
          }
        }
      }
    }
  `,
})

describe("ShowBanner", () => {
  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Show: () => ({
        name: "Ellen Altfest | Nature",
        href: "/show/white-cube-ellen-altfest-nature",
        isFairBooth: false,
        exhibitionPeriod: "April 16 – May 30",
        status: "running",
        description: "Description",
        location: {
          city: "London",
        },
        coverImage: {
          medium: {
            src: "https://d7hftxdivxxvm.cloudfront.net?example-1.jpg",
            srcSet: "https://d7hftxdivxxvm.cloudfront.net?example-2.jpg",
          },
        },
      }),
    })

    wrapper.find("a").every(el => {
      expect(el.props().href).toEqual("/show/white-cube-ellen-altfest-nature")
    })
    expect(wrapper.find("img").props().src).toEqual(
      "https://d7hftxdivxxvm.cloudfront.net?example-1.jpg"
    )
    expect(wrapper.find("img").props().srcSet).toEqual(
      "https://d7hftxdivxxvm.cloudfront.net?example-2.jpg"
    )
    expect(wrapper.find("img").props().alt).toEqual("Ellen Altfest | Nature")

    const text = wrapper.text()

    expect(text).toContain("current show")
    expect(text).toContain("Ellen Altfest | Nature")
    expect(text).toContain("April 16 – May 30")
    expect(text).toContain("London")
    expect(text).toContain("Description")
  })

  it("does not render 'View More' button if show href is null", () => {
    const { wrapper } = getWrapper({
      Show: () => ({
        name: "Ellen Altfest | Nature",
        href: null,
        isFairBooth: false,
        exhibitionPeriod: "April 16 – May 30",
        status: "running",
        description: "Description",
        location: {
          city: "London",
        },
        coverImage: {
          medium: {
            src: "https://d7hftxdivxxvm.cloudfront.net?example-1.jpg",
            srcSet: "https://d7hftxdivxxvm.cloudfront.net?example-2.jpg",
          },
        },
      }),
    })

    expect(wrapper.find("Button")).toHaveLength(0)
    expect(wrapper.text()).not.toContain("View More")
  })

  it.each([
    [true, "running", "current fair booth"],
    [true, "upcoming", "upcoming fair booth"],
    [true, "closed", "past fair booth"],
    [false, "running", "current show"],
    [false, "upcoming", "upcoming show"],
    [false, "closed", "past show"],
  ])(
    "renders correct type label(isFairBooth: %s, status: %s)",
    (isFairBooth, status, result) => {
      const { wrapper } = getWrapper({
        Show: () => ({
          isFairBooth,
          status,
        }),
      })

      expect(wrapper.text()).toContain(result)
    }
  )
})
