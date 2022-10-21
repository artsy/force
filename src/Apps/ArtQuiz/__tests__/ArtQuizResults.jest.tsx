import { ArtQuizResults } from "Apps/ArtQuiz/ArtQuizResults"
import { render, screen } from "@testing-library/react"

const translationFileMock = {
  artQuizPage: {
    results: {
      emailButton: "Email My Results",
      title: "Explore Your Quiz Results",
      subtitle:
        "Explore these collections and artists recommended for you based on your saved works. Follow them to see their latest works on your Artsy home.",
      tabs: {
        worksYouLiked: "Works You Liked",
        recommendedCollections: "Recommended Collections",
        recommendedArtists: "Recommended Artists",
      },
    },
  },
}

jest.mock("react-i18next", () => {
  return {
    useTranslation: () => ({
      t: (dotNotation: string) => {
        const [page, ...nestedKeys] = dotNotation.split(".")

        let temp: Record<string, any> = { ...translationFileMock[page] }

        nestedKeys.forEach(key => {
          temp = temp[key]
        })

        return (temp as unknown) as string
      },
    }),
  }
})

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
