import { screen } from "@testing-library/react"
import { PrivateArtworkAboutWork } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutWork"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { PrivateArtworkAboutWorkQuery } from "__generated__/PrivateArtworkAboutWorkQuery.graphql"

jest.unmock("react-relay")
jest.mock("System/useFeatureFlag", () => {
  return {
    useFeatureFlag: jest.fn().mockReturnValue(true),
  }
})

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
          additionalInformation: "Additional Artwork Information",
          visibilityLevel: "UNLISTED",
        }
      },
    })
    expect(
      screen.queryByText("Additional Artwork Information")
    ).toBeInTheDocument()
  })

  it("does not displays artwork information if not present", () => {
    renderWithRelay({
      Artwork: () => {
        return {
          additionalInformation: null,
          visibilityLevel: "UNLISTED",
        }
      },
    })
    expect(
      screen.queryByText("Additional Artwork Information")
    ).not.toBeInTheDocument()
  })
})
