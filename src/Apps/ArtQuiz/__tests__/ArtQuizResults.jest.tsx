import { ArtQuizResults } from "Apps/ArtQuiz/Routes/ArtQuizResults"
import { render, screen } from "@testing-library/react"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))

describe("ArtQuizResults", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it("displays the expected text", async () => {
    render(<ArtQuizResults />)

    expect(screen.getByText("Calculating Results…")).toBeInTheDocument()

    jest.advanceTimersByTime(2000)
    await flushPromiseQueue()

    expect(screen.getByText("Results Complete")).toBeInTheDocument()

    jest.advanceTimersByTime(1000)
    await flushPromiseQueue()

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
