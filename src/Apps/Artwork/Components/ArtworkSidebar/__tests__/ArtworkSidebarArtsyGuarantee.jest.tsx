import { render, screen } from "@testing-library/react"
import { ArtworkSidebarArtsyGuarantee } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtsyGuarantee"

describe("ArtworkSidebarArtsyGuarantee", () => {
  it("renders the Artsy Guarantee section", async () => {
    render(<ArtworkSidebarArtsyGuarantee />)

    expect(screen.queryByText("Secure Checkout")).toBeInTheDocument()
    expect(screen.queryByText("Money-Back Guarantee")).toBeInTheDocument()
    expect(screen.queryByText("Authenticity Guarantee")).toBeInTheDocument()

    expect(screen.queryByText("Learn more")).toBeInTheDocument()
  })
})
