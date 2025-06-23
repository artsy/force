import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2DetailsOrderSummary_Test_Query } from "__generated__/Order2DetailsOrderSummary_Test_Query.graphql"
import { graphql } from "react-relay"
import { Order2DetailsOrderSummary } from "../Order2DetailsOrderSummary"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<Order2DetailsOrderSummary_Test_Query>({
    Component: ({ me }) =>
      me?.order && <Order2DetailsOrderSummary order={me.order!} />,
    query: graphql`
      query Order2DetailsOrderSummary_Test_Query @raw_response_type {
        me {
          order(id: "123") {
            ...Order2DetailsOrderSummary_order
          }
        }
      }
    `,
  })

describe("Order2DetailsOrderSummary", () => {
  it("renders artwork image, artist, title, partner, and price", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
      }),
    })

    expect(screen.getByAltText("Test Artwork Title")).toBeInTheDocument()
    expect(screen.getByText("Test Artist")).toBeInTheDocument()
    expect(screen.getByText("Test Artwork Title")).toBeInTheDocument()
    expect(screen.getByText("Test Partner")).toBeInTheDocument()
    expect(screen.getByText("List price: $10,000")).toBeInTheDocument()
  })

  it("renders attribution class and dimensions", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
      }),
    })

    expect(screen.getByText("Limited Edition")).toBeInTheDocument()
    expect(screen.getByText("20 × 30 in | 50 × 76 cm")).toBeInTheDocument()
  })

  it("renders buyer guarantee message", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
      }),
    })

    expect(
      screen.getByText(/Your purchase is protected with/),
    ).toBeInTheDocument()
    expect(screen.getByText(/Artsy’s Buyer Guarantee/)).toBeInTheDocument()
  })

  it("renders artwork image wrapped in a link if artwork.slug and artwork.published are present", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
        lineItems: [
          {
            ...orderData.lineItems[0],
            artwork: {
              ...orderData.lineItems[0].artwork,
              slug: "test-artwork-slug",
              published: true,
            },
          },
        ],
      }),
    })

    const image = screen.getByAltText("Test Artwork Title")
    const parentLink = image.closest("a")
    expect(parentLink).toHaveAttribute("href", "/artwork/test-artwork-slug")
  })

  it("renders artwork image NOT wrapped in a link if artwork.published is false", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
        lineItems: [
          {
            ...orderData.lineItems[0],
            artwork: {
              ...orderData.lineItems[0].artwork,
              slug: "artwork-test",
              published: false,
            },
          },
        ],
      }),
    })

    const image = screen.getByAltText("Test Artwork Title")
    expect(image).toBeInTheDocument()

    const parentLink = image.closest("a")
    expect(parentLink).toBeNull()
  })

  it("renders artwork image NOT wrapped in a link if artwork.slug is missing", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
        lineItems: [
          {
            ...orderData.lineItems[0],
            artwork: {
              ...orderData.lineItems[0].artwork,
              slug: null,
              published: true,
            },
          },
        ],
      }),
    })

    const image = screen.getByAltText("Test Artwork Title")
    expect(image).toBeInTheDocument()

    const parentLink = image.closest("a")
    expect(parentLink).toBeNull()
  })
})

const orderData = {
  totalListPrice: { display: "$10,000" },
  itemsTotal: { display: "$10,000" },
  shippingTotal: { display: "$500" },
  taxTotal: { display: "$100" },
  source: "BUY_NOW",
  lineItems: [
    {
      artwork: {
        slug: "test-artwork-slug",
        partner: { name: "Test Partner" },
      },
      artworkVersion: {
        title: "Test Artwork Title",
        artistNames: "Test Artist",
        date: "2023",
        attributionClass: { shortDescription: "Limited Edition" },
        dimensions: { in: "20 × 30 in", cm: "50 × 76 cm" },
        image: {
          resized: {
            url: "https://example.com/image.jpg",
            width: 700,
            height: 360,
          },
        },
      },
    },
  ],
}
