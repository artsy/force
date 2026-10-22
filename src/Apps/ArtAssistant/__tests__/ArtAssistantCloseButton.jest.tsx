import { fireEvent, render, screen } from "@testing-library/react"
import { ArtAssistantCloseButton } from "Apps/ArtAssistant/Components/ArtAssistantCloseButton"
import { MockBoot } from "DevTools/MockBoot"

describe("Closing Art Assistant", () => {
  it("goes back when a previous in-app entry exists", () => {
    const state = jest
      .spyOn(window.history, "state", "get")
      .mockReturnValue({ index: 1 })
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
      state.mockRestore()
      back.mockRestore()
    }
  })

  it("returns home for a direct visit even when the browser counts its blank tab", () => {
    const length = jest
      .spyOn(window.history, "length", "get")
      .mockReturnValue(2)
    const state = jest
      .spyOn(window.history, "state", "get")
      .mockReturnValue({ index: 0 })
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
      state.mockRestore()
      back.mockRestore()
    }
  })
})
