import { ArtQuizResults } from "Apps/ArtQuiz/ArtQuizResults"
import { screen } from "@testing-library/react"
import { render } from "DevTools/setupTestWrapper"

describe("ArtQuizResults", () => {
  it.each([
    ["title", "Explore Your Quiz Results"],
    [
      "subtitle",
      "Explore these collections and artists recommended for you based on your saved works. Follow them to see their latest works on your Artsy home.",
    ],
    ["email button", "Email My Results"],
    ["tab", "Works You Liked"],
    ["tab", "Recommended Collections"],
    ["tab", "Recommended Artists"],
  ])("displays the expected %s text", (_key, text) => {
    render(<ArtQuizResults />)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
