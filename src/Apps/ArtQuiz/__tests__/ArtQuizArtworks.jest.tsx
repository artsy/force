import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { ArtQuizArtworksFragmentContainer } from "Apps/ArtQuiz/Routes/ArtQuizArtworks"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("ArtQuizArtworks", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ArtQuizArtworksFragmentContainer,
    query: graphql`
      query ArtQuizArtworks_Test_Query @relay_test_operation {
        me {
          ...ArtQuizArtworks_me
        }
      }
    `,
  })

  //

  it("displays a tooltip on the first artwork", () => {
    renderWithRelay({
      Artwork: () => ({ dominantColors: [] }),
    })

    expect(screen.queryByText(/Like it\? Hit the heart/)).toBeInTheDocument()
    expect(screen.queryByText(/Not for you\? Choose X/)).toBeInTheDocument()
  })
})
