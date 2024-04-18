import { screen } from "@testing-library/react"
import { PrivateArtworkMetadata } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkMetadata"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { PrivateArtworkMetadataQuery } from "__generated__/PrivateArtworkMetadataQuery.graphql"

jest.unmock("react-relay")

describe("PrivateArtworkMetadata", () => {
  const { renderWithRelay } = setupTestWrapperTL<PrivateArtworkMetadataQuery>({
    Component: props => <PrivateArtworkMetadata artwork={props.artwork!} />,
    query: graphql`
      query PrivateArtworkMetadataQuery {
        artwork(id: "foo") {
          ...PrivateArtworkMetadata_artwork
        }
      }
    `,
  })

  it("displays condition info when condition info is present", async () => {
    renderWithRelay({
      Artwork: () => {
        return {
          conditionDescription: {
            details: "Test Condition Description Details",
          },
        }
      },
    })
    expect(
      screen.queryByText("Test Condition Description Details")
    ).toBeInTheDocument()
  })

  it("does not display condition info when condition info is not present", async () => {
    renderWithRelay({
      Artwork: () => {
        return {
          conditionDescription: {
            details: null,
          },
        }
      },
    })
    expect(
      screen.queryByText("Test Condition Description Details")
    ).not.toBeInTheDocument()
  })

  it("displays provenance info by default when provenance is present and conditionDescription is lacking", async () => {
    renderWithRelay({
      Artwork: () => {
        return {
          conditionDescription: {
            details: null,
          },
          provenance: "Test Provenance Details",
        }
      },
    })
    expect(screen.queryByText("Test Provenance Details")).toBeInTheDocument()
  })

  it("does not display provenance info when provenance is not present", async () => {
    renderWithRelay({
      Artwork: () => {
        return {
          provenance: null,
        }
      },
    })
    expect(
      screen.queryByText("Test Provenance Details")
    ).not.toBeInTheDocument()
  })

  it("displays exhibition history by default when exhibition history is present yet other options are null", async () => {
    renderWithRelay({
      Artwork: () => {
        return {
          conditionDescription: {
            details: null,
          },
          provenance: null,
          exhibitionHistory: "Test Exhibition History Details",
        }
      },
    })
    expect(
      screen.queryByText("Test Exhibition History Details")
    ).toBeInTheDocument()
  })

  it("does not display exhibition history when exhibition history is not present", async () => {
    renderWithRelay({
      Artwork: () => {
        return {
          exhibitionHistory: null,
        }
      },
    })
    expect(
      screen.queryByText("Test Exhibition History Details")
    ).not.toBeInTheDocument()
  })
})
