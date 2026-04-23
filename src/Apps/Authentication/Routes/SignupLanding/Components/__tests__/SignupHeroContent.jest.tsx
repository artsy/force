import { render, screen } from "@testing-library/react"
import { SignupHeroContent } from "../SignupHeroContent"

describe("SignupHeroContent", () => {
  it("renders headline and description", () => {
    render(<SignupHeroContent />)

    expect(
      screen.getByText(/Discover and Buy Art That Moves You/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Welcome to Artsy, the world's largest online art marketplace/i,
      ),
    ).toBeInTheDocument()
  })

  it("renders value proposition bullets", () => {
    render(<SignupHeroContent />)

    expect(
      screen.getByText("Discover and buy from 1.6M+ original artworks"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Get personalized recommendations"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Save artworks, create collections, and set alerts"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Collect original art with confidence"),
    ).toBeInTheDocument()
  })
})
