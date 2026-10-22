import { fireEvent, render, screen } from "@testing-library/react"
import { ArtAssistantCloseButton } from "Apps/ArtAssistant/Components/ArtAssistantCloseButton"
import { MockBoot } from "DevTools/MockBoot"

describe("Closing Art Assistant", () => {
  it("goes back when a previous browser entry exists", () => {
    const length = jest
      .spyOn(window.history, "length", "get")
      .mockReturnValue(2)
    const back = jest.spyOn(window.history, "back").mockImplementation(() => {})
    try {
      render(
        <MockBoot>
          <ArtAssistantCloseButton />
        </MockBoot>,
      )
      fireEvent.click(screen.getByRole("link", { name: "Close Art Assistant" }))
      expect(back).toHaveBeenCalledTimes(1)
    } finally {
      length.mockRestore()
      back.mockRestore()
    }
  })

  it("leaves the home link available for a direct visit without history", () => {
    const length = jest
      .spyOn(window.history, "length", "get")
      .mockReturnValue(1)
    const back = jest.spyOn(window.history, "back").mockImplementation(() => {})
    try {
      render(
        <MockBoot>
          <ArtAssistantCloseButton />
        </MockBoot>,
      )
      const link = screen.getByRole("link", { name: "Close Art Assistant" })
      expect(link).toHaveAttribute("href", "/")
      fireEvent.click(link)
      expect(back).not.toHaveBeenCalled()
    } finally {
      length.mockRestore()
      back.mockRestore()
    }
  })
})
