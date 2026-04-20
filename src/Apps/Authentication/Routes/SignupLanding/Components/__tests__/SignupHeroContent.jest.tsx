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
      screen.getByText(
        "Find the art you love with 1.6M+ original artworks for sale",
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Get art recommendations that match your taste"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Build and manage your collection"),
    ).toBeInTheDocument()
    expect(screen.getByText("Collect with confidence")).toBeInTheDocument()
  })
})
