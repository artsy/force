import { render, screen } from "@testing-library/react"

import { ImmersiveView } from "Components/ArtworkFilter/ImmersiveView"

describe("ImmersiveView", () => {
  it("renders correctly", () => {
    render(<ImmersiveView />)

    expect(screen.getByText("Immersive View TKTK")).toBeInTheDocument()
  })

  it("closes", () => {
    const mockClose = jest.fn()
    render(<ImmersiveView onClose={mockClose} />)

    const closeButton = screen.getByRole("button", { name: "Close" })
    expect(closeButton).toBeInTheDocument()
    closeButton.click()
    expect(mockClose).toHaveBeenCalled()
  })
})
