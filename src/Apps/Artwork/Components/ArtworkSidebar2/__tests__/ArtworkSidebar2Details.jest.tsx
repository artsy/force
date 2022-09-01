import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebar2DetailsFragmentContainer } from "../ArtworkSidebar2Details"
import { ArtworkSidebar2Details_Test_Query } from "__generated__/ArtworkSidebar2Details_Test_Query.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkSidebar2Details_Test_Query
>({
  Component: ({ artwork }) => {
    return <ArtworkSidebar2DetailsFragmentContainer artwork={artwork!} />
  },
  query: graphql`
    query ArtworkSidebar2Details_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebar2Details_artwork
      }
    }
  `,
})

describe("ArtworkSidebar2Details", () => {
  it("renders the correct fields with edition and frame included", () => {
    renderWithRelay({
      Artwork: () => ({
        medium: "Painting",
        dimensions: {
          in: "10 × 10 in",
          cm: "25.4 × 25.4 cm",
        },
        framed: {
          details: "Included",
        },
        editionOf: "Edition of 10",
      }),
    })

    expect(screen.queryByText("Painting")).toBeInTheDocument()
    expect(
      screen.queryByText("10 × 10 in | 25.4 × 25.4 cm")
    ).toBeInTheDocument()
    expect(screen.queryByText(/included/)).toBeInTheDocument()
    expect(screen.queryByText("Edition of 10")).toBeInTheDocument()
  })

  it("renders the correct fields if no frame and no edition", () => {
    renderWithRelay({
      Artwork: () => ({
        medium: "Painting on a piece of wall",
        dimensions: {
          in: "10 × 10 in",
          cm: "25.4 × 25.4 cm",
        },
        framed: {
          details: "Not included",
        },
        editionOf: null,
      }),
    })

    expect(
      screen.queryByText("Painting on a piece of wall")
    ).toBeInTheDocument()
    expect(screen.queryByText(/included/)).not.toBeInTheDocument()
    expect(screen.queryByText(/edition/)).not.toBeInTheDocument()
  })

  it("renders the classification when it exists", () => {
    renderWithRelay({
      Artwork: () => ({
        attributionClass: {
          shortArrayDescription: ["This is a", "unique work"],
        },
      }),
    })

    expect(screen.queryByText("This is a")).toBeInTheDocument()
    expect(screen.queryByText("unique work")).toBeInTheDocument()
  })

  it("doesn't render the classification when it is not there", () => {
    renderWithRelay({
      Artwork: () => ({
        attributionClass: null,
      }),
    })

    expect(
      screen.queryByTestId("artwork-classification")
    ).not.toBeInTheDocument()
  })

  it("renders authenticity certificate info when it exists", () => {
    renderWithRelay({
      Artwork: () => ({
        hasCertificateOfAuthenticity: true,
        isBiddable: false,
      }),
    })

    expect(
      screen.queryByText(
        "artworkPage.sidebar.details.AuthenticityCertificate.includes"
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        "artworkPage.sidebar.details.AuthenticityCertificate.certificateOfAuthenticity"
      )
    ).toBeInTheDocument()
  })

  it("doesn't render authenticity certificate info when it exists but is biddable", () => {
    renderWithRelay({
      Artwork: () => ({
        hasCertificateOfAuthenticity: true,
        isBiddable: true,
      }),
    })

    expect(
      screen.queryByTestId("authenticity-certificate")
    ).not.toBeInTheDocument()
  })

  it("doesn't render authenticity certificate info when it does not exist", () => {
    renderWithRelay({
      Artwork: () => ({
        attributionClass: null,
      }),
    })

    expect(
      screen.queryByTestId("authenticity-certificate")
    ).not.toBeInTheDocument()
  })
})
