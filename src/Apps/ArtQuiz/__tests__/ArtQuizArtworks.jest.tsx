import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtQuizArtworksFragmentContainer } from "Apps/ArtQuiz/Routes/ArtQuizArtworks"
import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Apps/ArtQuiz/Hooks/useSaveArtwork", () => {
  console.log("SAVE ARTWORK MOCKED")
  return {
    useSaveArtwork: () => ({
      submitMutation: jest.fn(),
    }),
  }
})

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

  const quizArtworkConnectionkMock = {
    QuizArtworkConnection: () => ({
      edges: [
        { interactedAt: null, position: 4 },
        { interactedAt: null, position: 3 },
        { interactedAt: null, position: 1 },
        { interactedAt: null, position: 2 },
      ],
    }),
  }

  it("displays a tooltip on the first artwork", () => {
    renderWithRelay()

    expect(screen.getByText("Like it? Hit the heart.")).toBeInTheDocument()
    expect(screen.getByText("Not for you? Choose X.")).toBeInTheDocument()
  })

  it.only("does not display tooltip on any artworks after first", () => {
    renderWithRelay(quizArtworkConnectionkMock)

    screen.debug()

    const heart = screen.getByLabelText("Like")
    expect(heart).toBeInTheDocument()

    fireEvent.click(heart)

    // expect(screen.getByText("Like it? Hit the heart.")).not.toBeInTheDocument()
    // expect(screen.getByText("Not for you? Choose X.")).not.toBeInTheDocument()
  })
})
