import { fireEvent, render, screen } from "@testing-library/react"
import { ArtAssistantComposer } from "Apps/ArtAssistant/Components/ArtAssistantComposer"
import { MockBoot } from "DevTools/MockBoot"

describe("Art Assistant composer", () => {
  it("sends on desktop Enter but preserves Shift+Enter and IME input", () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })
    const onSubmit = jest.fn(() => true)
    const onChange = jest.fn()
    render(
      <MockBoot>
        <ArtAssistantComposer
          value="Find art"
          isResponding={false}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </MockBoot>,
    )
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("rows", "1")
    expect(input).toHaveStyle({ minHeight: "44px", height: "44px" })
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true })
    fireEvent.keyDown(input, { key: "Enter", isComposing: true })
    expect(onSubmit).not.toHaveBeenCalled()
    fireEvent.keyDown(input, { key: "Enter" })
    expect(onSubmit).toHaveBeenCalledWith({ text: "Find art" })
    expect(onChange).toHaveBeenCalledWith("")
  })

  describe("image attachment", () => {
    const renderComposer = (
      props: Partial<React.ComponentProps<typeof ArtAssistantComposer>> = {},
    ) => {
      const onSubmit = jest.fn(() => true)
      const onRemoveImage = jest.fn()
      render(
        <MockBoot>
          <ArtAssistantComposer
            value=""
            isResponding={false}
            onChange={jest.fn()}
            onSubmit={onSubmit}
            onRemoveImage={onRemoveImage}
            {...props}
          />
        </MockBoot>,
      )
      return { onSubmit, onRemoveImage }
    }

    it("hides the camera button when image input is unavailable", () => {
      renderComposer()
      expect(
        screen.queryByRole("button", { name: "Add an image" }),
      ).not.toBeInTheDocument()
    })

    it("opens the image picker from the camera button", () => {
      const onAddImage = jest.fn()
      renderComposer({ onAddImage })
      fireEvent.click(screen.getByRole("button", { name: "Add an image" }))
      expect(onAddImage).toHaveBeenCalled()
    })

    it("disables Send while the image uploads", () => {
      renderComposer({
        value: "Like this",
        attachment: { status: "uploading", previewURL: "blob:preview" },
      })
      expect(screen.getByRole("button", { name: "Send" })).toBeDisabled()
      expect(screen.getByTestId("image-search-scan-line")).toBeInTheDocument()
    })

    it("sends an uploaded image without text and clears it", () => {
      const image = { s3Key: "key", s3Bucket: "bucket" }
      const { onSubmit, onRemoveImage } = renderComposer({
        attachment: { status: "ready", previewURL: "blob:preview", image },
      })
      fireEvent.click(screen.getByRole("button", { name: "Send" }))
      expect(onSubmit).toHaveBeenCalledWith({ text: "", image })
      expect(onRemoveImage).toHaveBeenCalled()
    })

    it("removes the image", () => {
      const { onRemoveImage } = renderComposer({
        attachment: {
          status: "ready",
          previewURL: "blob:preview",
          image: { s3Key: "key", s3Bucket: "bucket" },
        },
      })
      fireEvent.click(screen.getByRole("button", { name: "Remove image" }))
      expect(onRemoveImage).toHaveBeenCalled()
    })
  })
})
