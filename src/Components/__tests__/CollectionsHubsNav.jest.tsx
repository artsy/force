import { screen } from "@testing-library/react"
import { CollectionsHubsNavFragmentContainer } from "Components/CollectionsHubsNav"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { CollectionsHubsNavFragmentContainer_Test_Query } from "__generated__/CollectionsHubsNavFragmentContainer_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<CollectionsHubsNavFragmentContainer_Test_Query>({
    Component: CollectionsHubsNavFragmentContainer,
    query: graphql`
      query CollectionsHubsNavFragmentContainer_Test_Query
      @relay_test_operation {
        marketingCollections(slugs: ["contemporary", "emerging-art"]) {
          ...CollectionsHubsNav_marketingCollections
        }
        genes(slugs: ["painting", "graffiti-and-street-art"]) {
          ...CollectionsHubsNav_genes
        }
      }
    `,
  })

describe("CollectionsHubsNav", () => {
  it("renders a tile for both a marketing collection and a gene", () => {
    renderWithRelay({
      MarketingCollection: () => ({
        slug: "contemporary",
        title: "Contemporary Art",
        thumbnail: "https://example.com/contemporary.jpg",
      }),
      Gene: () => ({
        slug: "painting",
        name: "Painting",
        image: {
          cropped: {
            src: "https://example.com/painting.jpg",
            srcSet: "https://example.com/painting.jpg 1x",
          },
        },
      }),
    })

    expect(screen.getByText("Contemporary Art")).toBeInTheDocument()
    expect(screen.getByText("Painting")).toBeInTheDocument()
  })

  it("links collection tiles to /collection/:slug", () => {
    renderWithRelay({
      MarketingCollection: () => ({
        slug: "contemporary",
        title: "Contemporary Art",
      }),
    })

    expect(screen.getByText("Contemporary Art").closest("a")).toHaveAttribute(
      "href",
      "/collection/contemporary",
    )
  })

  it("links gene tiles to /gene/:slug", () => {
    renderWithRelay({
      Gene: () => ({
        slug: "graffiti-and-street-art",
        name: "Graffiti and Street Art",
      }),
    })

    expect(
      screen.getByText("Graffiti and Street Art").closest("a"),
    ).toHaveAttribute("href", "/gene/graffiti-and-street-art")
  })

  it("skips a null gene without throwing", () => {
    renderWithRelay({
      MarketingCollection: () => ({
        slug: "contemporary",
        title: "Contemporary Art",
      }),
      Genes: () => [null, null],
    })

    expect(screen.getByText("Contemporary Art")).toBeInTheDocument()
  })
})
