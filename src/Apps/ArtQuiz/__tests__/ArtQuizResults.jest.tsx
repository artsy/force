import { ArtQuizResultsFragmentContainer } from "Apps/ArtQuiz/Routes/ArtQuizResults"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtQuizResultsFragmentContainer,
  query: graphql`
    query ArtQuizResults_Test_Query @relay_test_operation {
      me {
        ...ArtQuizResults_me
      }
    }
  `,
})

describe("ArtQuizResults", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  describe("when you have not saved any artworks", () => {
    it("renders the empty state", () => {
      renderWithRelay({
        Quiz: () => ({
          savedArtworks: [],
        }),
      })

      expect(
        screen.getByText("Explore Trending Collections and Artists")
      ).toBeInTheDocument()
    })
  })

  describe("when you have saved artworks", () => {
    it("renders your results", async () => {
      renderWithRelay({
        Quiz: () => ({
          savedArtworks: [{ __typename: "Artwork" }],
        }),
      })

      expect(screen.getByText("Explore Your Quiz Results")).toBeInTheDocument()
      expect(
        screen.getByText(
          "We think you’ll enjoy these works and artists based on your likes. To tailor your recommendations to your art tastes, follow artists and save works you love."
        )
      ).toBeInTheDocument()

      expect(screen.getByText("Email My Results")).toBeInTheDocument()
      expect(screen.getByText("Works You Liked")).toBeInTheDocument()
      expect(screen.getByText("Explore Artworks")).toBeInTheDocument()
      expect(screen.getByText("Explore Artists")).toBeInTheDocument()
    })
  })
})
