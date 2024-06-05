import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebarDetailsFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarDetails"
import { ArtworkSidebarDetails_Test_Query } from "__generated__/ArtworkSidebarDetails_Test_Query.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkSidebarDetails_Test_Query
>({
  Component: ({ artwork }) => {
    return <ArtworkSidebarDetailsFragmentContainer artwork={artwork!} />
  },
  query: graphql`
    query ArtworkSidebarDetails_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebarDetails_artwork
      }
    }
  `,
})

describe("ArtworkSidebarDetails", () => {
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
    expect(screen.queryByText(/Frame included/)).toBeInTheDocument()
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
    expect(screen.queryByText(/Frame not included/)).not.toBeInTheDocument()
    expect(screen.queryByText(/edition/)).not.toBeInTheDocument()
  })

  it("renders the classification when it exists", () => {
    renderWithRelay({
      Artwork: () => ({
        attributionClass: {
          shortArrayDescription: ["", "Unique work"],
        },
      }),
    })

    expect(screen.queryByText("Unique work")).toBeInTheDocument()
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

    expect(screen.queryByText(/Includes a/)).toBeInTheDocument()
    expect(
      screen.queryByText("Certificate of Authenticity")
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

  describe("with edition set size of 1", () => {
    it("renders dimensions", () => {
      renderWithRelay({
        Artwork: () => ({
          editionSets: [
            {
              internalID: "1",
            },
          ],
          dimensions: {
            in: "10 × 10 in",
            cm: "25.4 × 25.4 cm",
          },
        }),
      })

      expect(screen.queryByText(/cm/)).toBeInTheDocument()
      expect(screen.queryByText(/in/)).toBeInTheDocument()
    })
  })
  describe("with edition set size > 1", () => {
    it("doesn't render dimensions", () => {
      renderWithRelay({
        Artwork: () => ({
          editionSets: [
            {
              internalID: "1",
            },
            {
              internalID: "2",
            },
          ],
          dimensions: {
            in: "10 × 10 in",
            cm: "25.4 × 25.4 cm",
          },
        }),
      })

      expect(screen.queryByText(/cm/)).not.toBeInTheDocument()
      expect(screen.queryByText(/in/)).not.toBeInTheDocument()
    })
  })

  describe("with a private work", () => {
    it("renders Frame not included text when frame is not included", () => {
      renderWithRelay({
        Artwork: () => ({
          isUnlisted: true,
          dimensions: {
            in: "10 × 10 in",
            cm: "25.4 × 25.4 cm",
          },
        }),
      })

      expect(screen.queryByText(/Frame not included/)).toBeInTheDocument()
    })

    it("renders Frame included text when frame is included", () => {
      renderWithRelay({
        Artwork: () => ({
          isUnlisted: true,
          dimensions: {
            in: "10 × 10 in",
            cm: "25.4 × 25.4 cm",
          },
          framed: {
            details: "Included",
          },
        }),
      })

      expect(screen.queryByText(/Frame included/)).toBeInTheDocument()
    })
  })
})
