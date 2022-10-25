import { ArtQuizResults } from "Apps/ArtQuiz/ArtQuizResults"
import { screen } from "@testing-library/react"
import { render } from "DevTools/setupTestWrapper"

describe("ArtQuizResults", () => {
  it("displays the expected text", () => {
    render(<ArtQuizResults />)
    expect(screen.getByText("Explore Your Quiz Results")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Explore these collections and artists recommended for you based on your saved works. Follow them to see their latest works on your Artsy home."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Email My Results")).toBeInTheDocument()
    expect(screen.getByText("Works You Liked")).toBeInTheDocument()
    expect(screen.getByText("Recommended Collections")).toBeInTheDocument()
    expect(screen.getByText("Recommended Artists")).toBeInTheDocument()
  })
})
