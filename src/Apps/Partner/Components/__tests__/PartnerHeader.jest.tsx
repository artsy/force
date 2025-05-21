import { PartnerHeaderFragmentContainer as PartnerHeader } from "Apps/Partner/Components/PartnerHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { PartnerHeader_Test_Query } from "__generated__/PartnerHeader_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/RouteTabs")

const { renderWithRelay } = setupTestWrapperTL<PartnerHeader_Test_Query>({
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
    renderWithRelay({
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

    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img.png")
    expect(screen.getByText("White cube")).toBeInTheDocument()
    expect(screen.getByText("Jeddah")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /follow/i })).toBeInTheDocument()
  })

  it("displays unique address value", () => {
    renderWithRelay({
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

    expect(screen.getByText("Jeddah")).toBeInTheDocument()
    expect(screen.getAllByText("Jeddah")).toHaveLength(1)
  })

  it("displays few addresses", () => {
    renderWithRelay({
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

    expect(screen.getByText("Jeddah")).toBeInTheDocument()
    expect(screen.getByText("New York")).toBeInTheDocument()
    expect(screen.getByText("San Francisco")).toBeInTheDocument()
  })

  it("does not display address with null city", () => {
    renderWithRelay({
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

    expect(
      screen.queryByText(/Jeddah|New York|San Francisco/),
    ).not.toBeInTheDocument()
  })

  it("displays links to partner profile page", () => {
    renderWithRelay({
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

    const partnerNameLinks = screen.getAllByRole("link", { name: "White cube" })
    partnerNameLinks.forEach(partnerNameLink =>
      expect(partnerNameLink).toHaveAttribute("href", "/partner/white-cube"),
    )

    const image = screen.getByRole("img")
    const imageLink = image.closest("a")
    expect(imageLink).toHaveAttribute("href", "/partner/white-cube")
  })

  it("doesn't display profile address if there is no info", () => {
    renderWithRelay({
      Partner: () => ({
        locations: {
          totalCount: 0,
        },
      }),
    })

    expect(
      screen.queryByText(/Jeddah|New York|San Francisco/),
    ).not.toBeInTheDocument()
  })

  it("doesn't display profile icon if there is no info", () => {
    renderWithRelay({
      Partner: () => ({
        profile: null,
      }),
    })

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("doesn't display follow button if there is no info", () => {
    renderWithRelay({
      Partner: () => ({
        profile: null,
      }),
    })

    expect(
      screen.queryByRole("button", { name: /follow/i }),
    ).not.toBeInTheDocument()
  })

  it("doesn't display follow button if partner type is equal to Auction House", () => {
    renderWithRelay({
      Partner: () => ({
        type: "Auction House",
      }),
    })

    expect(
      screen.queryByRole("button", { name: /follow/i }),
    ).not.toBeInTheDocument()
  })

  it("doesn't display the follow count when it's below the threshold", () => {
    renderWithRelay({
      Partner: () => ({
        name: "White cube",
        hasVisibleFollowsCount: false,
        profile: {
          counts: {
            follows: 100,
          },
        },
      }),
    })

    expect(screen.queryByText("100 Followers")).not.toBeInTheDocument()
  })

  it("displays the follow count when it's above the threshold", () => {
    renderWithRelay({
      Partner: () => ({
        name: "White cube",
        hasVisibleFollowsCount: true,
        profile: {
          counts: {
            follows: 500,
          },
        },
      }),
    })

    expect(screen.getByText("500 Followers")).toBeInTheDocument()
  })
})
