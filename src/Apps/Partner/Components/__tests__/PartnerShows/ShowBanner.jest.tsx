import { ShowBannerFragmentContainer } from "Apps/Partner/Components/PartnerShows"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ partner }: any) => {
    return (
      <ShowBannerFragmentContainer
        show={partner.showsConnection.edges[0].node}
      />
    )
  },
  query: graphql`
    query ShowBannerTestQuery @relay_test_operation {
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
    renderWithRelay({
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

    const links = screen.getAllByRole("link")
    links.forEach(link => {
      expect(link).toHaveAttribute(
        "href",
        "/show/white-cube-ellen-altfest-nature"
      )
    })

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute(
      "src",
      "https://d7hftxdivxxvm.cloudfront.net?example-1.jpg"
    )
    expect(image).toHaveAttribute(
      "srcSet",
      "https://d7hftxdivxxvm.cloudfront.net?example-2.jpg"
    )
    expect(image).toHaveAttribute("alt", "Ellen Altfest | Nature")

    expect(screen.getByText("current show")).toBeInTheDocument()
    expect(screen.getByText("Ellen Altfest | Nature")).toBeInTheDocument()
    expect(screen.getByText("April 16 – May 30")).toBeInTheDocument()
    expect(screen.getByText("London")).toBeInTheDocument()
    expect(screen.getByText("Description")).toBeInTheDocument()
  })

  it("does not render 'View More' button if show href is null", () => {
    renderWithRelay({
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

    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    expect(screen.queryByText("View More")).not.toBeInTheDocument()
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
      renderWithRelay({
        Show: () => ({
          isFairBooth,
          status,
        }),
      })

      expect(screen.getByText(result)).toBeInTheDocument()
    }
  )
})
