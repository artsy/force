import { screen } from "@testing-library/react"
import { PrivateArtworkAboutWork } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutWork"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { PrivateArtworkAboutWorkQuery } from "__generated__/PrivateArtworkAboutWorkQuery.graphql"

jest.unmock("react-relay")

describe("PrivateArtworkAboutWork", () => {
  const { renderWithRelay } = setupTestWrapperTL<PrivateArtworkAboutWorkQuery>({
    Component: props => <PrivateArtworkAboutWork artwork={props.artwork!} />,
    query: graphql`
      query PrivateArtworkAboutWorkQuery {
        artwork(id: "foo") {
          ...PrivateArtworkAboutWork_artwork
        }
      }
    `,
  })

  it("displays artwork information if present", () => {
    renderWithRelay({
      Artwork: () => {
        return {
          additionalInformationHTML: "Additional Artwork Information",
        }
      },
    })
    expect(
      screen.getByText("Additional Artwork Information")
    ).toBeInTheDocument()
  })

  it("does not displays artwork information if not present", () => {
    renderWithRelay({
      Artwork: () => {
        return {
          additionalInformationHTML: null,
        }
      },
    })
    expect(
      screen.queryByText("Additional Artwork Information")
    ).not.toBeInTheDocument()
  })
})
