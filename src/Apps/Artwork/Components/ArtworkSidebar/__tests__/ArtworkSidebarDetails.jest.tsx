import { ArtworkSidebarDetailsFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarDetails"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ArtworkSidebarDetails_Test_Query } from "__generated__/ArtworkSidebarDetails_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<ArtworkSidebarDetails_Test_Query>({
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

      expect(screen.queryByText(/25.4/)).toBeInTheDocument()
      expect(screen.queryByText(/10 × 10/)).toBeInTheDocument()
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

      expect(screen.queryByText(/25.4/)).not.toBeInTheDocument()
      expect(screen.queryByText(/10 × 10/)).not.toBeInTheDocument()
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

  describe("collector signals", () => {
    it("renders showing now info when the artwork is in a show", () => {
      renderWithRelay({
        Artwork: () => ({
          collectorSignals: {
            primaryLabel: null,
            runningShow: {
              name: "Art Basel",
              href: "/show/art-basel",
              startAt: "2021-06-17T00:00:00+00:00",
              endAt: "2021-06-20T00:00:00+00:00",
            },
          },
        }),
      })

      expect(screen.queryByText(/Showing now/)).toBeInTheDocument()
      expect(screen.queryByText(/Jun 17–Jun 20/)).toBeInTheDocument()
      expect(screen.queryByText(/Art Basel/)).toBeInTheDocument()
    })

    it("doesn't render showing now info when the artwork is not in a show", () => {
      renderWithRelay({
        Artwork: () => ({
          collectorSignals: {
            primaryLabel: null,
            runningShow: null,
          },
        }),
      })

      expect(screen.queryByText(/Showing now/)).not.toBeInTheDocument()
    })

    it("renders curators pick info when it's the primary label", () => {
      renderWithRelay({
        Artwork: () => ({
          collectorSignals: {
            primaryLabel: "CURATORS_PICK",
            runningShow: null,
          },
        }),
      })

      expect(screen.queryByText(/Curators’ Pick/)).toBeInTheDocument()
      expect(
        screen.queryByText(/Hand selected by Artsy curators this week/)
      ).toBeInTheDocument()
    })

    it("renders increased interest info when it's the primary label", () => {
      renderWithRelay({
        Artwork: () => ({
          collectorSignals: {
            primaryLabel: "INCREASED_INTEREST",
            runningShow: null,
          },
        }),
      })

      expect(screen.queryByText(/Increased Interest/)).toBeInTheDocument()
      expect(
        screen.queryByText(/Based on collector activity in the past 14 days/)
      ).toBeInTheDocument()
    })
  })
})
