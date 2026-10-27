import { fireEvent, render, screen } from "@testing-library/react"
import { ArtAssistantImageUploadModal } from "Apps/ArtAssistant/Components/ArtAssistantImageUploadModal"
import type { FileRejection } from "react-dropzone"

const mockSendToast = jest.fn()

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: () => ({ sendToast: mockSendToast }),
  ModalDialog: ({ title, children }) => {
    return <section aria-label={title}>{children}</section>
  },
}))
jest.mock("Components/FileUpload/FileDropzone", () => ({
  FileDropzone: ({ onDrop, onReject, allowedMimeTypes }) => {
    return (
      <div>
        <div>{allowedMimeTypes.join(",")}</div>
        <button
          type="button"
          onClick={() =>
            onDrop([new File(["image"], "cat.jpg", { type: "image/jpeg" })])
          }
        >
          Drop
        </button>
        <button
          type="button"
          onClick={() =>
            onReject([
              {
                file: new File(["doc"], "doc.pdf", {
                  type: "application/pdf",
                }),
                errors: [{ code: "file-invalid-type", message: "" }],
              } as FileRejection,
            ])
          }
        >
          Reject
        </button>
      </div>
    )
  },
}))

describe("ArtAssistantImageUploadModal", () => {
  beforeEach(() => jest.clearAllMocks())

  it("passes the dropped file on and closes", () => {
    const onSelect = jest.fn()
    const onClose = jest.fn()
    render(
      <ArtAssistantImageUploadModal onSelect={onSelect} onClose={onClose} />,
    )
    expect(
      screen.getByRole("region", { name: "Search with an image" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText("image/jpeg,image/png,image/webp,image/heic"),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Drop" }))
    expect(onSelect).toHaveBeenCalledWith(expect.any(File))
    expect(onClose).toHaveBeenCalled()
  })

  it("explains rejected files", () => {
    const onSelect = jest.fn()
    render(
      <ArtAssistantImageUploadModal onSelect={onSelect} onClose={jest.fn()} />,
    )
    fireEvent.click(screen.getByRole("button", { name: "Reject" }))
    expect(onSelect).not.toHaveBeenCalled()
    expect(mockSendToast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "error" }),
    )
  })
})
